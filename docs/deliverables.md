# Deliverables

This document maps the PoC to the required deliverables.

## 1. Working agent demo

- `npm.cmd start` runs the local Node.js demo in `src/index.js`.
- The demo uses a realistic user story from `samples/sampleInput.json`.
- Output is shown in the terminal and saved to `output/qa-work-package-<timestamp>.txt` and `.json`.

## 2. Architecture diagram

The current PoC is a simple local implementation; the architecture is:

- LLM: not yet integrated, currently a rule-based draft generator in `src/qaAgent.js`
- Prompt layer: represented by `src/index.js` user input flow and `samples/sampleInput.json`
- Memory/context store: not implemented yet; could be added as a JSON file or database in future.
- Tools: local file save + prompt input.
- Human approval points:
  - sample/story selection
  - review of assumptions and draft output
- Output artifacts:
  - draft QA package in terminal
  - saved `output/*.txt` and `output/*.json`

## 3. Prompt and guardrail log

- Inputs are captured via `src/index.js`.
- Assumptions are detected in `src/qaAgent.js`.
- Clarifying questions are simulated by the sample prompt flow.
- Hallucination checks are not implemented as an LLM guardrail yet.

## 4. QA output package

The generated work package now includes:
- Summary
- Assumptions & clarifications
- BDD scenarios
- Test cases
- Coverage matrix
- Exploratory charter
- Synthetic data set
- Automation triage

## 5. Impact note

A future production-grade version should add:
- LLM integration for flexible requirement parsing
- memory/context store for requirement revisions and history
- explicit guardrails and hallucination detection
- human approval flow with sign-off checkpoints
- audit trail and safer data handling
