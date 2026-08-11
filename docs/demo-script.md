# PoC Demo Script

## Objective

Provide a video-ready demo script for the QA Co-Tester Agent PoC.
The script is designed for a recorded presentation, with clear narration and visible terminal steps.

## Setup

1. Open the project folder in a terminal:
   - `C:\AI POC_QA Co Tester Agent\Myridius_AIPOC_QA-CoTester-Agent`
2. Install dependencies if needed:
   - `npm.cmd install`
3. Confirm the key files are in place:
   - `README.md`, `src/index.js`, `src/qaAgent.js`, `samples/sampleInputs.json`, `docs/`
4. Optional: open the terminal and code editor side-by-side for the video.

## Video script

### 1. Opening statement

- "Welcome to the QA Co-Tester Agent proof-of-concept demo.
- This agent helps QA teams turn user stories into draft test assets with human review built in."
- "The demo is intentionally draft-only and designed to keep the tester in control."

### 2. Show the project structure

- Briefly show the folder and key files.
- Point to `src/index.js` as the demo runner and `src/qaAgent.js` as the draft generator.
- Mention `samples/sampleInputs.json` for sample stories and `output/` for saved results.

### 3. Start the demo

- Run:
  - `npm.cmd start`
- Narrate: "We start the PoC by launching the demo runner."

### 4. Choose a story

- When prompted, explain: "The app can use a sample user story or accept a custom requirement."
- Select a sample story.
- Show the sample list and say: "I’m choosing a realistic scenario for this demo."

### 5. Review and approve assumptions

- As the draft summary and assumptions display, say:
  - "This is the first human checkpoint."
  - "The system has identified assumptions and ambiguous areas."
- Read one or two assumptions aloud.
- Confirm approval or demonstrate an edit if you want to show correction.

### 6. Generate the first QA package

- Confirm the prompt to proceed.
- Show the output sections as they appear:
  - summary
  - assumptions
  - BDD scenarios
  - test cases
  - coverage matrix
  - exploratory charter
  - synthetic data examples
  - automation triage
- Narrate: "The output is saved locally and labeled draft for review."

### 7. Show saved output

- Point to the `output/` folder.
- Mention the generated files:
  - `qa-work-package-<timestamp>.txt`
  - `qa-work-package-<timestamp>.json`
- Mention `output/context.json` if the revision checkpoint is used.

### 8. Requirement revision

- When the app prompts, say: "Now we will show how the agent handles a requirement change."
- Choose to revise and paste an updated story or acceptance criteria.
- Narrate: "The app preserves the previous rationale and generates an updated package."
- Show the revised output file names.

### 9. Key takeaway

- "This PoC demonstrates a repeatable QA workflow with explicit human checkpoints."
- "It generates draft test assets, preserves prior rationale after a change, and saves everything for handoff."
- "The current version is a prototype; production-ready work would add an LLM backend, stronger guardrails, and a richer memory store."

## Presentation tips

- Keep the terminal visible so viewers can see prompts and output.
- Pause briefly after each checkpoint to explain why it matters.
- Mention that the tool does not automatically update production systems.
- Highlight that all generated content is draft-only and needs tester approval.

## Video highlights

- sample story ingestion
- assumption approval checkpoint
- draft QA package generation
- requirement revision with preserved rationale
- saved handoff artifacts
- documentation links for a complete proof-of-concept package
