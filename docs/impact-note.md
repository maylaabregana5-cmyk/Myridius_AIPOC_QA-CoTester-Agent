# Deliverable 5: Impact Note

## Expected effort saving

- Reduces manual story analysis time by generating draft summaries and test ideas automatically.
- Speeds BDD and scenario generation for QA teams.
- Helps identify automation candidates earlier in the workflow.
- Provides reusable synthetic test data examples.

## Risks and limitations

- Current PoC is rule-based, not a true LLM solution.
- Assumptions and scenarios are draft-only and require human validation.
- No context store exists yet, so requirement changes are not tracked.
- No formal hallucination or safety guardrails are implemented.

## What is needed for production-grade use

- Integrate a secure LLM backend with prompt management.
- Add memory/context storage for requirement revisions and coverage updates.
- Build a UI or workflow for explicit human approvals and sign-off.
- Implement guardrails for hallucination, PII filtering, and acceptance criteria validation.
- Add audit logging and safe integration with test management tools.
