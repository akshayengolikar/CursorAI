# Android Application Automation

This repository provides a lightweight Android automation CLI built on top of
`adb` (Android Debug Bridge). It can run individual device actions or execute a
repeatable JSON flow for end-to-end app automation.

## Features

- Wait for device/emulator availability
- Install APKs
- Launch applications by package/activity
- Send tap/swipe/input/keyevent actions
- Tap UI elements by visible text/content description/resource-id
- Capture screenshots and UI XML dumps
- Execute automation flows from JSON files

## Prerequisites

- Python 3.10+ (works with standard library only)
- Android Platform Tools (`adb`) available on `PATH`
- USB-debug-enabled Android device or running emulator

Quick check:

```bash
python3 android_automation.py --help
adb devices
```

## CLI Usage

General form:

```bash
python3 android_automation.py [--device SERIAL] <command> [options]
```

Common commands:

```bash
# Wait for a connected device
python3 android_automation.py wait --timeout 120

# Install APK and replace existing app
python3 android_automation.py install --apk app/build/outputs/apk/debug/app-debug.apk

# Launch app
python3 android_automation.py launch --package com.example.myapp --activity .MainActivity

# Interact with UI
python3 android_automation.py tap --x 540 --y 1800
python3 android_automation.py input --text "hello world"
python3 android_automation.py keyevent --key ENTER
python3 android_automation.py swipe --x1 540 --y1 1800 --x2 540 --y2 600 --duration-ms 350

# Tap by UI text (or content-desc/resource-id)
python3 android_automation.py tap-text --text "Login"
python3 android_automation.py tap-text --text "Sign" --contains --occurrence 2

# Artifact capture
python3 android_automation.py screenshot --output artifacts/home.png
python3 android_automation.py dump-ui --output artifacts/home.xml
```

## Flow-Based Automation

Use `run-flow` to execute a sequence of actions from JSON:

```bash
python3 android_automation.py run-flow --flow flows/sample_flow.json
```

`flows/sample_flow.json` shows a template with variables and actions.
Update these values for your app:

- `apk_path`
- `package_name`
- `main_activity`
- any login or navigation steps

## Dice Game Application Automation (Phone)

A ready dice-app template is included at:

- `flows/dice_phone_flow.json`

It launches a dice app and performs repeated rolls, trying common button labels
(`Roll`, `ROLL`, `Roll Dice`, `Throw`, `Shake`) while saving screenshots for
each roll.

### 1) Find your dice app package on phone

```bash
adb shell pm list packages | rg -i dice
```

Optional (if you need launcher activity):

```bash
adb shell cmd package resolve-activity --brief com.your.dice.package
```

### 2) Update the flow file

Edit `flows/dice_phone_flow.json`:

- `package_name` -> your installed dice app package
- `main_activity` -> optional (leave empty to launch by package only)
- `roll_count` -> number of rolls to execute
- `delay_seconds` -> delay between rolls

### 3) Run automation

```bash
python3 android_automation.py run-flow --flow flows/dice_phone_flow.json
```

Artifacts are saved in `artifacts/`:

- `dice_roll_1.png`, `dice_roll_2.png`, ...
- `dice_last_ui.xml`

## DICE Job Application App Automation (Phone)

A dedicated template for the DICE job app is available:

- `flows/dice_job_application_flow.json`

This flow is preconfigured to:

- search for **Data Engineer**
- apply filters for **Easy Apply** and **Today / Past 24 hours**
- iterate through listings and apply where possible
- save screenshots for each apply attempt

### 1) Find the installed DICE job app package

```bash
adb shell pm list packages | rg -i "dice|job"
```

If you need to resolve launcher activity:

```bash
adb shell cmd package resolve-activity --brief com.your.dice.package
```

### 2) Edit flow variables

In `flows/dice_job_application_flow.json`, set:

- `package_name` (required)
- `main_activity` (optional; keep empty to launch by package)
- `job_keyword` (defaults to `Data Engineer`)
- `scan_cycles` (how many listings to scan for apply actions)
- `search_wait_seconds`
- `apply_wait_seconds`

### 3) Run the DICE job application flow

```bash
python3 android_automation.py run-flow --flow flows/dice_job_application_flow.json
```

Result artifacts are stored in `artifacts/`:

- `dice_job_apply_1.png`, `dice_job_apply_2.png`, ...
- `dice_job_last_ui.xml`

## Supported Flow Actions

- `wait`
- `install`
- `launch`
- `tap`
- `swipe`
- `input`
- `keyevent`
- `sleep`
- `shell`
- `screenshot`
- `dump_ui`
- `tap_text`
- `tap_text_any` (tries text candidates until one matches)
- `repeat` (executes nested `steps` N times; exposes `${index}`)
- `if_tap_text_any` (conditionally executes `then_steps` or `else_steps`)

`tap_text` and `tap_text_any` also support:

- `optional: true` (skip the step instead of failing if no match)

## Troubleshooting

- **`adb executable was not found`**  
  Install Android Platform Tools and make sure `adb` is in your shell `PATH`.

- **No devices found**  
  Run `adb devices`, verify USB debugging/emulator status, then retry.

- **`tap_text` does not find a node**  
  Run `dump-ui`, inspect XML node `text` / `content-desc` / `resource-id` values,
  and use `--contains` when exact matching is too strict.