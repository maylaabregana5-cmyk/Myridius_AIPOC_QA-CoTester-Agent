# QA Co-Tester Agent PoC

This is a beginner-friendly proof-of-concept project for an AI-powered QA co-tester agent. It demonstrates how an agent can assist with requirement analysis, BDD generation, synthetic data creation, and automation triage while keeping a human tester in control.

## What is included

- `src/index.js`: demo runner that loads sample requirements and prints a draft QA work package
- `src/qaAgent.js`: simple draft generator for summary, assumptions, BDD scenarios, test cases, synthetic data, and automation recommendations
- `samples/sampleInput.json`: realistic user story input for the demo
- `package.json`: project dependencies and scripts

## Quick start

1. Open a terminal in this folder.
2. Run `npm.cmd install`.
3. Run `npm.cmd start`.

## Deliverables

- `docs/demo.md` — working agent demo instructions
- `docs/architecture.md` — architecture and conceptual design
- `docs/prompt-log.md` — prompts, assumptions, and guardrail notes
- `docs/qa-output-package.md` — generated QA package contents
- `docs/impact-note.md` — effort savings, risks, and production requirements
- `docs/guardrails.md` — constraints and human-in-the-loop guardrails

## PoC focus areas

- Draft requirement summary and assumption detection
- BDD scenario generation
- Functional, negative, boundary, regression, accessibility, compatibility, exploratory test case ideas
- Synthetic data examples that avoid real PII
- Automation triage recommendations
- Clear labelling of AI output as draft and review-required

## Notes for next steps

- Replace the draft generator with an LLM-backed prompt layer
- Add memory/context storage for multiple requirement revisions
- Build a small UI or chat flow for clarifications and approval checkpoints
- Create demo documentation showing at least two human-in-the-loop decisions
