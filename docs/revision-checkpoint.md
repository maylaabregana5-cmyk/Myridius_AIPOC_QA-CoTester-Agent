# Requirement Revision Checkpoint

## Purpose

Document the new requirement revision flow and how previous rationale is preserved.

## Revision flow in the PoC

1. The demo generates a draft summary and assumptions from the initial user story.
2. The tester is asked to approve or edit the assumptions.
3. The tester confirms whether to proceed with final QA package generation.
4. After the package is saved, the demo asks whether the tester wants to revise the requirement.
5. If the tester chooses to revise, the updated story is entered and a new package is generated.

## Context handling

- The revised package preserves prior rationale in the `previousRationale` section.
- This includes:
  - the original story name or custom input label
  - the original summary
  - the original approved assumptions

## Output artifacts

- The initial package is saved to `output/qa-work-package-<timestamp>.txt` and `.json`.
- The revised package is also saved as a separate timestamped file.
- Context is stored in `output/context.json`.

## Why this matters

- Supports success criterion 3 by demonstrating context handling across requirement changes.
- Provides a clear human checkpoint for requirement revision.
- Keeps prior rationale visible instead of overwriting it.
