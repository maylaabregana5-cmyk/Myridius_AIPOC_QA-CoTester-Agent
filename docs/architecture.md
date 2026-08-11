# Deliverable 2: Architecture

## Current PoC architecture

The implementation is a lightweight local prototype with these components:

- `src/index.js`
  - demo runner and user input flow
  - prompts the tester for the user story or sample input
  - prints output to terminal and saves files
- `src/qaAgent.js`
  - rule-based draft generator for QA artifacts
  - contains summary, assumptions, BDD, test cases, synthetic data, coverage matrix, exploratory charter, and automation triage
- `samples/sampleInput.json`
  - realistic user story input for the demo
- `output/`
  - saved output text and JSON files

## Conceptual architecture

1. **User story input**
   - paste or use the provided sample.
2. **Prompt layer**
   - `src/index.js` handles user questions and approval decisions.
3. **QA logic / draft generator**
   - `src/qaAgent.js` produces the QA package.
4. **Memory/context store**
   - not implemented yet in this prototype.
5. **Human approval points**
   - sample/story selection
   - review of assumptions and draft QA output
6. **Output artifacts**
   - terminal output
   - saved text and JSON files

## Future architecture for production

Add these components:
- LLM prompt layer for requirement understanding
- memory/context store for requirement revisions and history
- guardrail log for hallucination and assumptions
- approval checkpoints with audit trail
- optional UI/chat interface
