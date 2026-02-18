import json
import tempfile
import unittest
from pathlib import Path

from android_automation import (
    ADBError,
    AndroidAutomator,
    as_bool,
    interpolate_variables,
    parse_bounds,
    run_flow,
)


SAMPLE_XML = """<?xml version="1.0" encoding="UTF-8"?>
<hierarchy rotation="0">
  <node
    index="0"
    text="Login"
    resource-id="com.example:id/login_button"
    class="android.widget.Button"
    package="com.example"
    content-desc=""
    checkable="false"
    checked="false"
    clickable="true"
    enabled="true"
    focusable="true"
    focused="false"
    scrollable="false"
    long-clickable="false"
    password="false"
    selected="false"
    bounds="[100,600][500,700]"
  />
  <node
    index="1"
    text="Sign in with email"
    resource-id="com.example:id/signin"
    class="android.widget.TextView"
    package="com.example"
    content-desc="Sign in"
    checkable="false"
    checked="false"
    clickable="true"
    enabled="true"
    focusable="true"
    focused="false"
    scrollable="false"
    long-clickable="false"
    password="false"
    selected="false"
    bounds="[50,300][650,380]"
  />
</hierarchy>
"""


class FakeAutomator(AndroidAutomator):
    def __init__(self):
        super().__init__(dry_run=True)
        self.taps = []

    def _fetch_ui_xml(self) -> str:
        return SAMPLE_XML

    def tap(self, x: int, y: int) -> None:
        self.taps.append((x, y))


class ParseBoundsTests(unittest.TestCase):
    def test_parse_bounds_success(self) -> None:
        bounds = parse_bounds("[10,20][110,220]")
        self.assertEqual(bounds.left, 10)
        self.assertEqual(bounds.top, 20)
        self.assertEqual(bounds.right, 110)
        self.assertEqual(bounds.bottom, 220)
        self.assertEqual(bounds.center, (60, 120))

    def test_parse_bounds_invalid_raises(self) -> None:
        with self.assertRaises(ValueError):
            parse_bounds("10,20,110,220")


class InterpolationTests(unittest.TestCase):
    def test_interpolate_nested_structure(self) -> None:
        raw = {
            "apk": "${apk}",
            "steps": [{"action": "launch", "package": "${package}"}],
            "timeout": 120,
        }
        result = interpolate_variables(raw, {"apk": "app.apk", "package": "com.example"})
        self.assertEqual(result["apk"], "app.apk")
        self.assertEqual(result["steps"][0]["package"], "com.example")
        self.assertEqual(result["timeout"], 120)


class TapTextTests(unittest.TestCase):
    def test_tap_text_exact_match(self) -> None:
        automator = FakeAutomator()
        x, y = automator.tap_text("Login")
        self.assertEqual((x, y), (300, 650))
        self.assertEqual(automator.taps, [(300, 650)])

    def test_tap_text_contains_match(self) -> None:
        automator = FakeAutomator()
        x, y = automator.tap_text("Sign", contains=True)
        self.assertEqual((x, y), (350, 340))

    def test_tap_text_missing_raises(self) -> None:
        automator = FakeAutomator()
        with self.assertRaises(ADBError):
            automator.tap_text("Not Present")


class BoolParsingTests(unittest.TestCase):
    def test_as_bool_handles_string_values(self) -> None:
        self.assertTrue(as_bool("true"))
        self.assertTrue(as_bool("YES"))
        self.assertFalse(as_bool("false"))
        self.assertFalse(as_bool("0"))


class FlowExecutionTests(unittest.TestCase):
    class FlowAutomator(FakeAutomator):
        def __init__(self):
            super().__init__()
            self.screenshots = []

        def screenshot(self, output_path: str) -> None:
            self.screenshots.append(output_path)

    def test_run_flow_repeat_and_tap_text_any(self) -> None:
        payload = {
            "steps": [
                {
                    "action": "repeat",
                    "times": 2,
                    "steps": [
                        {"action": "tap_text_any", "texts": ["Missing", "Login"]},
                        {"action": "screenshot", "output": "artifacts/dice_roll_${index}.png"},
                    ],
                }
            ]
        }
        automator = self.FlowAutomator()

        with tempfile.TemporaryDirectory() as tmp_dir:
            flow_path = Path(tmp_dir) / "dice_flow.json"
            flow_path.write_text(json.dumps(payload), encoding="utf-8")
            run_flow(flow_path, automator)

        self.assertEqual(automator.taps, [(300, 650), (300, 650)])
        self.assertEqual(
            automator.screenshots,
            ["artifacts/dice_roll_1.png", "artifacts/dice_roll_2.png"],
        )

    def test_run_flow_tap_text_any_raises_when_no_match(self) -> None:
        payload = {"steps": [{"action": "tap_text_any", "texts": ["Missing"]}]}
        automator = self.FlowAutomator()

        with tempfile.TemporaryDirectory() as tmp_dir:
            flow_path = Path(tmp_dir) / "dice_flow.json"
            flow_path.write_text(json.dumps(payload), encoding="utf-8")
            with self.assertRaises(ADBError):
                run_flow(flow_path, automator)

    def test_run_flow_tap_text_any_optional_skips_when_no_match(self) -> None:
        payload = {"steps": [{"action": "tap_text_any", "texts": ["Missing"], "optional": True}]}
        automator = self.FlowAutomator()

        with tempfile.TemporaryDirectory() as tmp_dir:
            flow_path = Path(tmp_dir) / "dice_flow.json"
            flow_path.write_text(json.dumps(payload), encoding="utf-8")
            run_flow(flow_path, automator)

        self.assertEqual(automator.taps, [])

    def test_run_flow_tap_text_optional_skips_when_no_match(self) -> None:
        payload = {"steps": [{"action": "tap_text", "text": "Missing", "optional": True}]}
        automator = self.FlowAutomator()

        with tempfile.TemporaryDirectory() as tmp_dir:
            flow_path = Path(tmp_dir) / "dice_flow.json"
            flow_path.write_text(json.dumps(payload), encoding="utf-8")
            run_flow(flow_path, automator)

        self.assertEqual(automator.taps, [])


if __name__ == "__main__":
    unittest.main()
