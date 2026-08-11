# Submission Overview

## Project summary

This proof-of-concept project demonstrates a QA Co-Tester Agent that assists QA teams with requirement analysis, assumption detection, BDD generation, test case design, synthetic data creation, automation triage, and requirement revision.

The current implementation is a local Node.js console application that generates draft QA artifacts while preserving human oversight and approval.

## What was built

- `src/index.js`: demo runner and user interaction flow
- `src/qaAgent.js`: rule-based QA asset generator
- `samples/sampleInputs.json`: multiple realistic user stories for the demo
- `output/`: saved draft QA packages and revision context
- `docs/`: complete PoC documentation covering deliverables, guardrails, demo flow, and handoff

## Key capabilities

- Requirement ingestion from sample or custom stories
- Draft summary and ambiguity/assumption detection
- Explicit human approval checkpoint for assumptions
- BDD scenario generation
- Test case generation across multiple categories
- Coverage matrix mapping acceptance criteria to tests
- Exploratory charter creation
- Synthetic data generation with positive, negative, edge, and boundary patterns
- Automation triage recommendations
- Requirement revision flow with preserved prior rationale
- Draft output saved as text and JSON

## Success criteria addressed

1. **Acceptance criteria coverage**
   - The PoC generates a draft summary and explicitly identifies ambiguous or missing requirements.
   - It supports reviewer correction of assumptions.

2. **Artifact counts**
   - At least 12 test cases
   - At least 6 BDD scenarios
   - At least 20 synthetic records

3. **Context handling**
   - The demo supports requirement revisions and preserves the previous rationale in the updated package.

4. **AI vs tester approval**
   - Output is labeled draft.
   - The tester must approve or edit assumptions before final package generation.

5. **Demo and handoff**
   - Repeatable demo via `npm.cmd start`
   - Clean documentation in `docs/`
   - QA-friendly handoff package with saved output files and summary notes

## Documentation included

- `docs/demo.md` — demo instructions
- `docs/demo-script.md` — video-ready demo script
- `docs/video-script-highlights.md` — short recorded demo introduction and summary
- `docs/architecture.md` — PoC architecture and conceptual design
- `docs/prompt-log.md` — prompt and guardrail log details
- `docs/qa-output-package.md` — QA output package contents
- `docs/guardrails.md` — safety and human-in-the-loop guardrails
- `docs/revision-checkpoint.md` — requirement revision flow
- `docs/qa-handoff.md` — QA handoff summary and review checklist
- `docs/executive-summary.md` — concise stakeholder summary
- `docs/impact-note.md` — effort savings, risks, and production requirements

## How to run

1. Open the project folder in a terminal.
2. Install dependencies:
   - `npm.cmd install`
3. Run the demo:
   - `npm.cmd start`
4. Choose a sample story or paste custom requirements.
5. Review and approve assumptions.
6. Generate the draft QA package.
7. Optionally revise the requirement and generate an updated package.

## Notes

- This is a prototype, not a production system.
- The current implementation is rule-based rather than LLM-driven.
- The next step for production readiness is to integrate a secure LLM backend, stronger guardrails, and a formal memory/context store.
