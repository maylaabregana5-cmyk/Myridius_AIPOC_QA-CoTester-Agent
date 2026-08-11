# Deliverable 3: Prompt and Guardrail Log

## Prompts used

- `Use the included sample user story? (recommended)`
- `Paste the user story, acceptance criteria, and UI/API notes:`

## Assumptions detected

The current PoC detects draft assumptions from the story text:
- Acceptance criteria are not explicitly labeled.
- Registration scenarios may lack field definitions, password rules, or validation details.
- No UI or API details are present, so interface expectations should be confirmed.

## Clarifying questions

The prototype simulates a clarification loop by:
- asking whether to use the sample story or provide custom requirements
- showing assumptions that the tester should verify
- requiring explicit tester approval of assumptions before final output generation

## Hallucination checks

Actual LLM guardrails are not yet implemented in this prototype.
The model currently uses rule-based checks in `src/qaAgent.js`.

## Future guardrail ideas

- Verify generated requirements against explicit acceptance criteria.
- Ask the tester to confirm ambiguous items before generating output.
- Label all generated content as draft and require manual approval.
