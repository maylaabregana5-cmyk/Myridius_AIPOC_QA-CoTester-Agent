# Video Script Highlights

## Purpose

Provide a short, punchy introduction for a recorded demo of the QA Co-Tester Agent PoC.

## Opening narration

- "Welcome to the QA Co-Tester Agent proof-of-concept demo."
- "This tool helps QA teams turn user stories into draft test assets with human review built in."
- "Today I’ll show a sample story, assumption approval, package generation, and a requirement revision that preserves prior rationale."

## Key messages

- "The output is draft-only and requires tester approval."
- "The tool generates summaries, assumptions, BDD scenarios, test cases, a coverage matrix, exploratory charter, synthetic data, and automation triage."
- "It saves local files for handoff and does not update production systems automatically."

## Recommended first 60 seconds

1. Show the project folder briefly.
2. Point out `src/index.js` and `src/qaAgent.js`.
3. Mention `samples/sampleInputs.json` for sample stories.
4. Run `npm.cmd start`.
5. Say: "Here’s the first human checkpoint: review and approve the assumptions."

## Closing summary

- "This PoC demonstrates a repeatable QA workflow with explicit human checkpoints."
- "It’s a prototype; production-ready versions would add an LLM backend, stronger guardrails, and a richer memory store."
