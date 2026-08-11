# Deliverable 1: Working Agent Demo

## Purpose

Show a repeatable PoC run of the QA Co-Tester Agent using a realistic user story.

## How to run

1. Open the project folder in a terminal:
   - `C:\AI POC_QA Co Tester Agent\Myridius_AIPOC_QA-CoTester-Agent`
2. Install dependencies:
   - `npm.cmd install`
3. Run the demo:
   - `npm.cmd start`

## What happens

- The app prompts for sample input.
- It uses `samples/sampleInputs.json` by default.
- The agent generates a draft summary and assumptions.
- The tester must approve or edit assumptions before final generation.
- After the first package is saved, the tester can choose to revise the requirement.
- The revised package preserves previous rationale and saves a second output file.
- It saves the package(s) to `output/qa-work-package-<timestamp>.txt` and `.json`.

## Notes

- The demo is a local Node.js console application.
- The output is labeled draft and requires tester review.
- This document serves as the live/recorded-run deliverable.

## Demo checklist

- [ ] Open the project folder in a terminal.
- [ ] Run `npm.cmd install`.
- [ ] Run `npm.cmd start`.
- [ ] Choose a sample story or paste custom requirements.
- [ ] Review and approve or edit assumptions.
- [ ] Confirm final generation and save output.
- [ ] Optionally revise the requirement and generate an updated package.
- [ ] Share saved output files from `output/`.
