#!/usr/bin/env python3
"""Android application automation utilities powered by adb."""

from __future__ import annotations

import argparse
import json
import re
import shlex
import subprocess
import sys
import time
import xml.etree.ElementTree as ET
from dataclasses import dataclass
from pathlib import Path
from typing import Any, Sequence


BOUNDS_PATTERN = re.compile(r"^\[(\d+),(\d+)\]\[(\d+),(\d+)\]$")
VARIABLE_PATTERN = re.compile(r"\$\{([A-Za-z_][A-Za-z0-9_]*)\}")


class ADBError(RuntimeError):
    """Raised when adb command execution fails."""


@dataclass(frozen=True)
class Bounds:
    left: int
    top: int
    right: int
    bottom: int

    @property
    def center(self) -> tuple[int, int]:
        return ((self.left + self.right) // 2, (self.top + self.bottom) // 2)


def parse_bounds(value: str) -> Bounds:
    """Parse Android UIAutomator bounds: [x1,y1][x2,y2]."""
    match = BOUNDS_PATTERN.match(value.strip())
    if not match:
        msg = f"Invalid bounds format: {value!r}"
        raise ValueError(msg)
    left, top, right, bottom = map(int, match.groups())
    return Bounds(left, top, right, bottom)


def interpolate_variables(value: Any, variables: dict[str, Any]) -> Any:
    """Replace ${name} placeholders in strings recursively."""
    if isinstance(value, dict):
        return {key: interpolate_variables(item, variables) for key, item in value.items()}
    if isinstance(value, list):
        return [interpolate_variables(item, variables) for item in value]
    if isinstance(value, str):
        return VARIABLE_PATTERN.sub(lambda m: str(variables.get(m.group(1), m.group(0))), value)
    return value


def ensure_parent_directory(path: Path) -> None:
    """Create the parent directory for a file path if needed."""
    path.parent.mkdir(parents=True, exist_ok=True)


class AndroidAutomator:
    """Executes adb commands and higher-level automation actions."""

    def __init__(self, device: str | None = None, dry_run: bool = False, verbose: bool = False):
        self.device = device
        self.dry_run = dry_run
        self.verbose = verbose

    def _build_adb_command(self, args: Sequence[str]) -> list[str]:
        command = ["adb"]
        if self.device:
            command.extend(["-s", self.device])
        command.extend(args)
        return command

    def _run_adb(
        self,
        args: Sequence[str],
        *,
        capture_output: bool = False,
        text: bool = True,
        check: bool = True,
    ) -> subprocess.CompletedProcess[Any]:
        command = self._build_adb_command(args)
        if self.verbose or self.dry_run:
            print("$", shlex.join(command))
        if self.dry_run:
            stdout: str | bytes = b"" if not text else ""
            stderr: str | bytes = b"" if not text else ""
            return subprocess.CompletedProcess(command, 0, stdout=stdout, stderr=stderr)
        try:
            return subprocess.run(
                command,
                check=check,
                capture_output=capture_output,
                text=text,
            )
        except FileNotFoundError as exc:
            msg = (
                "adb executable was not found. Install Android Platform Tools and "
                "ensure 'adb' is available on your PATH."
            )
            raise ADBError(msg) from exc
        except subprocess.CalledProcessError as exc:
            stderr = ""
            if isinstance(exc.stderr, str):
                stderr = exc.stderr.strip()
            elif isinstance(exc.stderr, bytes):
                stderr = exc.stderr.decode(errors="replace").strip()
            msg = f"adb command failed ({exc.returncode}): {shlex.join(command)}"
            if stderr:
                msg = f"{msg}\n{stderr}"
            raise ADBError(msg) from exc

    def wait_for_device(self, timeout: float = 120.0, poll_interval: float = 1.0) -> None:
        """Wait until adb reports an attached device."""
        start = time.monotonic()
        while True:
            try:
                state = self._run_adb(["get-state"], capture_output=True).stdout.strip()
                if state == "device":
                    return
            except ADBError:
                pass
            if time.monotonic() - start > timeout:
                msg = f"Device did not become available within {timeout:.1f} seconds."
                raise ADBError(msg)
            time.sleep(poll_interval)

    def install(self, apk_path: str, replace: bool = True) -> None:
        """Install an APK on the connected device."""
        path = Path(apk_path)
        if not path.exists() and not self.dry_run:
            msg = f"APK file not found: {apk_path}"
            raise FileNotFoundError(msg)
        args = ["install"]
        if replace:
            args.append("-r")
        args.append(apk_path)
        self._run_adb(args)

    def launch(self, package: str, activity: str | None = None) -> None:
        """Launch an app by package and optional activity."""
        if activity:
            component = f"{package}/{activity}"
            self._run_adb(["shell", "am", "start", "-n", component])
            return
        self._run_adb(["shell", "monkey", "-p", package, "-c", "android.intent.category.LAUNCHER", "1"])

    def tap(self, x: int, y: int) -> None:
        """Send a tap event."""
        self._run_adb(["shell", "input", "tap", str(x), str(y)])

    def swipe(self, x1: int, y1: int, x2: int, y2: int, duration_ms: int = 300) -> None:
        """Send a swipe event."""
        self._run_adb(
            ["shell", "input", "swipe", str(x1), str(y1), str(x2), str(y2), str(duration_ms)]
        )

    def input_text(self, text: str) -> None:
        """Input text on the currently focused element."""
        escaped = text.replace(" ", "%s")
        self._run_adb(["shell", "input", "text", escaped])

    def keyevent(self, key: str) -> None:
        """Send a key event by keycode or symbolic name."""
        self._run_adb(["shell", "input", "keyevent", key])

    def shell(self, command: str) -> None:
        """Run a custom adb shell command."""
        self._run_adb(["shell", *shlex.split(command)])

    def screenshot(self, output_path: str) -> None:
        """Capture a PNG screenshot from the connected device."""
        destination = Path(output_path)
        ensure_parent_directory(destination)
        result = self._run_adb(["exec-out", "screencap", "-p"], capture_output=True, text=False)
        payload = result.stdout if isinstance(result.stdout, bytes) else result.stdout.encode()
        destination.write_bytes(payload)

    def dump_ui(self, output_path: str) -> None:
        """Dump the current UI hierarchy to a local XML file."""
        destination = Path(output_path)
        ensure_parent_directory(destination)
        remote_path = "/sdcard/window_dump.xml"
        self._run_adb(["shell", "uiautomator", "dump", remote_path], capture_output=True)
        self._run_adb(["pull", remote_path, str(destination)])

    def _fetch_ui_xml(self) -> str:
        remote_path = "/sdcard/window_dump.xml"
        self._run_adb(["shell", "uiautomator", "dump", remote_path], capture_output=True)
        result = self._run_adb(["shell", "cat", remote_path], capture_output=True)
        return result.stdout

    def tap_text(self, text: str, contains: bool = False, occurrence: int = 1) -> tuple[int, int]:
        """Find a node by text/description/resource-id and tap its center."""
        if occurrence < 1:
            msg = "--occurrence must be >= 1"
            raise ValueError(msg)

        xml_payload = self._fetch_ui_xml()
        try:
            root = ET.fromstring(xml_payload)
        except ET.ParseError as exc:
            msg = "Failed to parse UI XML from device."
            raise ADBError(msg) from exc

        candidates: list[Bounds] = []
        for node in root.iter("node"):
            attributes = node.attrib
            values = (
                attributes.get("text", ""),
                attributes.get("content-desc", ""),
                attributes.get("resource-id", ""),
            )
            if contains:
                matched = any(text in value for value in values)
            else:
                matched = any(text == value for value in values)
            if not matched:
                continue
            bounds_value = attributes.get("bounds")
            if not bounds_value:
                continue
            try:
                candidates.append(parse_bounds(bounds_value))
            except ValueError:
                continue

        if len(candidates) < occurrence:
            mode = "contains" if contains else "equals"
            msg = f"No UI node found where text {mode} {text!r} (occurrence {occurrence})."
            raise ADBError(msg)

        x, y = candidates[occurrence - 1].center
        self.tap(x, y)
        return x, y


def run_flow(flow_path: Path, automator: AndroidAutomator) -> None:
    """Execute the action steps in a JSON flow file."""
    if not flow_path.exists():
        msg = f"Flow file not found: {flow_path}"
        raise FileNotFoundError(msg)

    flow_data = json.loads(flow_path.read_text(encoding="utf-8"))
    variables: dict[str, Any] = flow_data.get("variables", {})

    if flow_data.get("device") and automator.device is None:
        automator.device = str(flow_data["device"])

    steps = flow_data.get("steps")
    if not isinstance(steps, list) or not steps:
        msg = "Flow file must include a non-empty 'steps' list."
        raise ValueError(msg)

    for index, raw_step in enumerate(steps, start=1):
        if not isinstance(raw_step, dict):
            msg = f"Step #{index} must be an object."
            raise ValueError(msg)
        step = interpolate_variables(raw_step, variables)
        action = step.get("action")
        if not isinstance(action, str):
            msg = f"Step #{index} is missing a valid string 'action'."
            raise ValueError(msg)
        print(f"[flow] Step {index}/{len(steps)}: {action}")

        if action == "wait":
            automator.wait_for_device(timeout=float(step.get("timeout", 120.0)))
        elif action == "install":
            automator.install(apk_path=str(step["apk"]), replace=bool(step.get("replace", True)))
        elif action == "launch":
            automator.launch(package=str(step["package"]), activity=step.get("activity"))
        elif action == "tap":
            automator.tap(int(step["x"]), int(step["y"]))
        elif action == "swipe":
            automator.swipe(
                int(step["x1"]),
                int(step["y1"]),
                int(step["x2"]),
                int(step["y2"]),
                duration_ms=int(step.get("duration_ms", 300)),
            )
        elif action == "input":
            automator.input_text(str(step["text"]))
        elif action == "keyevent":
            automator.keyevent(str(step["key"]))
        elif action == "sleep":
            time.sleep(float(step.get("seconds", 1.0)))
        elif action == "shell":
            command = step.get("command")
            if not isinstance(command, str):
                msg = f"Step #{index} action=shell requires string field 'command'."
                raise ValueError(msg)
            automator.shell(command)
        elif action == "screenshot":
            automator.screenshot(str(step["output"]))
        elif action == "dump_ui":
            automator.dump_ui(str(step["output"]))
        elif action == "tap_text":
            x, y = automator.tap_text(
                text=str(step["text"]),
                contains=bool(step.get("contains", False)),
                occurrence=int(step.get("occurrence", 1)),
            )
            print(f"[flow] tapped {x},{y}")
        else:
            msg = f"Unsupported action {action!r} in step #{index}."
            raise ValueError(msg)


def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(description="Automate Android apps with adb.")
    parser.add_argument("--device", help="adb device serial (optional)")
    parser.add_argument("--dry-run", action="store_true", help="Print commands without executing them")
    parser.add_argument("--verbose", action="store_true", help="Print adb commands as they execute")

    subparsers = parser.add_subparsers(dest="command", required=True)

    wait_parser = subparsers.add_parser("wait", help="Wait for a device to become available")
    wait_parser.add_argument("--timeout", type=float, default=120.0, help="Timeout in seconds")

    install_parser = subparsers.add_parser("install", help="Install APK")
    install_parser.add_argument("--apk", required=True, help="Path to APK file")
    install_parser.add_argument(
        "--no-replace",
        action="store_true",
        help="Do not replace app if already installed",
    )

    launch_parser = subparsers.add_parser("launch", help="Launch app")
    launch_parser.add_argument("--package", required=True, help="Application package name")
    launch_parser.add_argument("--activity", help="Activity name (optional)")

    tap_parser = subparsers.add_parser("tap", help="Tap screen by coordinates")
    tap_parser.add_argument("--x", type=int, required=True, help="X coordinate")
    tap_parser.add_argument("--y", type=int, required=True, help="Y coordinate")

    swipe_parser = subparsers.add_parser("swipe", help="Swipe from one point to another")
    swipe_parser.add_argument("--x1", type=int, required=True)
    swipe_parser.add_argument("--y1", type=int, required=True)
    swipe_parser.add_argument("--x2", type=int, required=True)
    swipe_parser.add_argument("--y2", type=int, required=True)
    swipe_parser.add_argument("--duration-ms", type=int, default=300)

    input_parser = subparsers.add_parser("input", help="Input text")
    input_parser.add_argument("--text", required=True, help="Text to input")

    keyevent_parser = subparsers.add_parser("keyevent", help="Send Android key event")
    keyevent_parser.add_argument("--key", required=True, help="e.g. ENTER, KEYCODE_BACK, 66")

    screenshot_parser = subparsers.add_parser("screenshot", help="Take screenshot")
    screenshot_parser.add_argument("--output", required=True, help="Local output PNG path")

    dump_ui_parser = subparsers.add_parser("dump-ui", help="Dump current UI XML")
    dump_ui_parser.add_argument("--output", required=True, help="Local output XML path")

    tap_text_parser = subparsers.add_parser("tap-text", help="Tap first UI node that matches text")
    tap_text_parser.add_argument("--text", required=True, help="Text/resource-id/content-desc to match")
    tap_text_parser.add_argument(
        "--contains",
        action="store_true",
        help="Use substring matching instead of exact match",
    )
    tap_text_parser.add_argument(
        "--occurrence",
        type=int,
        default=1,
        help="Tap Nth matching result (1-indexed)",
    )

    shell_parser = subparsers.add_parser("shell", help="Run raw adb shell command")
    shell_parser.add_argument(
        "--shell-command",
        required=True,
        help='Example: "pm list packages"',
    )

    flow_parser = subparsers.add_parser("run-flow", help="Execute JSON automation flow")
    flow_parser.add_argument("--flow", required=True, help="Path to flow JSON file")

    return parser


def main(argv: Sequence[str] | None = None) -> int:
    parser = build_parser()
    args = parser.parse_args(argv)
    automator = AndroidAutomator(device=args.device, dry_run=args.dry_run, verbose=args.verbose)

    try:
        if args.command == "wait":
            automator.wait_for_device(timeout=args.timeout)
        elif args.command == "install":
            automator.install(apk_path=args.apk, replace=not args.no_replace)
        elif args.command == "launch":
            automator.launch(package=args.package, activity=args.activity)
        elif args.command == "tap":
            automator.tap(args.x, args.y)
        elif args.command == "swipe":
            automator.swipe(args.x1, args.y1, args.x2, args.y2, duration_ms=args.duration_ms)
        elif args.command == "input":
            automator.input_text(args.text)
        elif args.command == "keyevent":
            automator.keyevent(args.key)
        elif args.command == "screenshot":
            automator.screenshot(args.output)
        elif args.command == "dump-ui":
            automator.dump_ui(args.output)
        elif args.command == "tap-text":
            x, y = automator.tap_text(args.text, contains=args.contains, occurrence=args.occurrence)
            print(f"Tapped {x},{y}")
        elif args.command == "shell":
            automator.shell(args.shell_command)
        elif args.command == "run-flow":
            run_flow(Path(args.flow), automator)
        else:
            parser.error(f"Unsupported command: {args.command}")
        return 0
    except (ADBError, FileNotFoundError, ValueError, KeyError, json.JSONDecodeError) as exc:
        print(f"Error: {exc}", file=sys.stderr)
        return 1


if __name__ == "__main__":
    raise SystemExit(main())
