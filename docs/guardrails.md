# Guardrails and Constraints

## Purpose

Document the safety and human-in-the-loop guardrails for the QA Co-Tester PoC.

## Current implemented guardrails

- **Draft-only output**
  - All generated artifacts are labelled as draft in the terminal output.
  - The demo explicitly states that the output requires tester review.
- **No production updates**
  - The app writes only local output files under `output/`.
  - It does not integrate with production test management, source control, automation pipelines, or external systems.
- **Sensitive data avoidance**
  - Sample stories and synthetic data are fictional.
  - No real customer identifiers, credentials, private logs, or PII are used.
- **Human-in-the-loop checkpoints**
  - Checkpoint 1: approve or edit detected assumptions before generating the final QA package.
  - Checkpoint 2: confirm whether to proceed with final draft generation and file saving.
- **Assumption correction flow**
  - If the tester does not approve the assumptions, they can edit them directly in the demo.
- **Revision checkpoint**
  - After the first draft is generated, the tester can choose to revise the requirement.
  - The updated package preserves the previous rationale and approved assumptions.

## Remaining limitations

- **Team size constraint**
  - The demo cannot enforce how many learners use it; this remains a project-level constraint.
- **Hallucination detection**
  - The current prototype is rule-based and does not include a true LLM hallucination-checking layer.
  - Future production versions should add explicit model guardrails, validation prompts, and a verification loop.

## Recommended next steps for stronger guardrails

- add a real LLM prompt/response guardrail layer
- store a revision history of assumptions and outputs
- require explicit tester sign-off before any external action
- keep a separate audit log for generated changes and approvals
