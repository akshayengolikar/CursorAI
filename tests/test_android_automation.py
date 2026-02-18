import unittest

from android_automation import ADBError, AndroidAutomator, interpolate_variables, parse_bounds


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


if __name__ == "__main__":
    unittest.main()
