const fs = require('fs');
const path = require('path');
const inquirerModule = require('inquirer');
const inquirer = inquirerModule.default || inquirerModule;
const chalkModule = require('chalk');
const chalk = chalkModule.default || chalkModule;
const { createWorkPackage } = require('./qaAgent');
const samples = require('../samples/sampleInputs.json');

function formatWorkPackageText(workPackage) {
  const lines = [];
  lines.push('=== Draft QA Work Package ===\n');
  lines.push('Summary:');
  lines.push(workPackage.summary);
  lines.push('\nAssumptions & Clarifications:');
  workPackage.assumptions.forEach((item, index) => {
    lines.push(`${index + 1}. ${item}`);
  });
  lines.push('\nBDD Scenarios:');
  workPackage.bddScenarios.forEach((scenario, index) => {
    lines.push(`\nScenario ${index + 1}: ${scenario.title}`);
    lines.push(scenario.text);
  });
  lines.push('\nTest Cases:');
  workPackage.testCases.forEach((tc) => {
    lines.push(`\n- ${tc.type}: ${tc.description}`);
  });
  lines.push('\nSynthetic Data Samples:');
  workPackage.syntheticData.forEach((record, index) => {
    lines.push(`\nRecord ${index + 1}:`);
    Object.entries(record).forEach(([key, value]) => {
      lines.push(`  ${key}: ${JSON.stringify(value)}`);
    });
  });
  lines.push('\nAutomation Triage:');
  workPackage.automationTriage.forEach((item) => {
    lines.push(`\n- ${item.scenario}: ${item.recommendation}`);
  });
  lines.push('\nDemo complete. AI output is draft and requires tester review.');
  return lines.join('\n');
}

function saveWorkPackage(workPackage) {
  const outputDir = path.join(__dirname, '..', 'output');
  fs.mkdirSync(outputDir, { recursive: true });
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const baseName = `qa-work-package-${timestamp}`;
  const textPath = path.join(outputDir, `${baseName}.txt`);
  const jsonPath = path.join(outputDir, `${baseName}.json`);

  const textContent = formatWorkPackageText(workPackage);
  fs.writeFileSync(textPath, textContent, 'utf8');
  fs.writeFileSync(jsonPath, JSON.stringify(workPackage, null, 2), 'utf8');

  return { textPath, jsonPath };
}

async function runDemo() {
  console.log(chalk.blue.bold('\nQA Co-Tester Agent PoC Demo'));
  console.log(chalk.gray('Begin with a sample user story or paste your own.'));

  const { useSample } = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'useSample',
      message: 'Use an included sample user story? (recommended)',
      default: true,
    },
  ]);

  let input;
  if (useSample) {
    const { selectedSample } = await inquirer.prompt([
      {
        type: 'list',
        name: 'selectedSample',
        message: 'Choose a sample user story:',
        choices: samples.map((item) => item.name),
      },
    ]);
    input = samples.find((item) => item.name === selectedSample);
  } else {
    const result = await inquirer.prompt([
      {
        type: 'editor',
        name: 'story',
        message: 'Paste the user story, acceptance criteria, and UI/API notes:',
      },
    ]);
    input = { story: result.story };
  }

  const workPackage = createWorkPackage(input);

  console.log(chalk.green('\n=== Draft Summary and Assumptions ===\n'));
  console.log(chalk.yellow('Summary:'));
  console.log(workPackage.summary);

  console.log(chalk.yellow('\nAssumptions & Clarifications:'));
  workPackage.assumptions.forEach((item, index) => {
    console.log(`${index + 1}. ${item}`);
  });

  const { assumptionsApproved } = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'assumptionsApproved',
      message: 'Do you approve these assumptions as correct for the draft output?',
      default: true,
    },
  ]);

  if (!assumptionsApproved) {
    const { editedAssumptions } = await inquirer.prompt([
      {
        type: 'editor',
        name: 'editedAssumptions',
        message: 'Edit the assumptions. Use one assumption per line:',
        default: workPackage.assumptions.join('\n'),
      },
    ]);
    workPackage.assumptions = editedAssumptions
      .split('\n')
      .map((line) => line.trim())
      .filter(Boolean);
    console.log(chalk.green('\nAssumptions updated and approved.\n'));
  }

  const { proceed } = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'proceed',
      message: 'Proceed to generate the final draft QA work package with the approved assumptions?',
      default: true,
    },
  ]);

  if (!proceed) {
    console.log(chalk.red('\nDemo stopped before final generation. No output file was created.'));
    process.exit(0);
  }

  console.log(chalk.yellow('\nBDD Scenarios:'));
  workPackage.bddScenarios.forEach((scenario, index) => {
    console.log(`\nScenario ${index + 1}: ${scenario.title}`);
    console.log(scenario.text);
  });

  console.log(chalk.yellow('\nTest Cases:'));
  workPackage.testCases.forEach((tc) => {
    console.log(`\n- ${tc.type}: ${tc.description}`);
  });

  console.log(chalk.yellow('\nCoverage Matrix:'));
  workPackage.coverageMatrix.forEach((row) => {
    console.log(`\n- Requirement: ${row.requirement}`);
    console.log(`  Test Case: ${row.testCase}`);
    console.log(`  Category: ${row.category}`);
    console.log(`  Coverage: ${row.coverage}`);
  });

  console.log(chalk.yellow('\nExploratory Charter:'));
  console.log(`Mission: ${workPackage.exploratoryCharter.mission}`);
  console.log('Focus Areas:');
  workPackage.exploratoryCharter.focusAreas.forEach((area) => {
    console.log(`  - ${area}`);
  });
  console.log('Success Criteria:');
  workPackage.exploratoryCharter.successCriteria.forEach((criteria) => {
    console.log(`  - ${criteria}`);
  });

  console.log(chalk.yellow('\nSynthetic Data Samples:'));
  workPackage.syntheticData.slice(0, 10).forEach((record, index) => {
    console.log(`\nRecord ${index + 1}:`);
    console.table(record);
  });

  console.log(chalk.yellow('\nAutomation Triage:'));
  workPackage.automationTriage.forEach((item) => {
    console.log(`\n- ${item.scenario}: ${item.recommendation}`);
  });

  const savedFiles = saveWorkPackage(workPackage);
  console.log(chalk.blue(`\nSaved output to:`));
  console.log(chalk.green(`  ${savedFiles.textPath}`));
  console.log(chalk.green(`  ${savedFiles.jsonPath}`));

  console.log(chalk.blue('\nDemo complete. AI output is draft and requires tester review.\n'));
}

runDemo().catch((error) => {
  console.error(chalk.red('Error running demo:'), error);
  process.exit(1);
});
