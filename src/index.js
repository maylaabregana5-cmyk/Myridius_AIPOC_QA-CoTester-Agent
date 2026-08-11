const fs = require('fs');
const path = require('path');
const inquirerModule = require('inquirer');
const inquirer = inquirerModule.default || inquirerModule;
const chalkModule = require('chalk');
const chalk = chalkModule.default || chalkModule;
const { createWorkPackage } = require('./qaAgent');
const sample = require('../samples/sampleInput.json');

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
      message: 'Use the included sample user story? (recommended)',
      default: true,
    },
  ]);

  const input = useSample ? sample : await inquirer.prompt([
    {
      type: 'editor',
      name: 'story',
      message: 'Paste the user story, acceptance criteria, and UI/API notes:',
    },
  ]);

  const workPackage = createWorkPackage(input);

  console.log(chalk.green('\n=== Draft QA Work Package ===\n'));
  console.log(chalk.yellow('Summary:'));
  console.log(workPackage.summary);

  console.log(chalk.yellow('\nAssumptions & Clarifications:'));
  workPackage.assumptions.forEach((item, index) => {
    console.log(`${index + 1}. ${item}`);
  });

  console.log(chalk.yellow('\nBDD Scenarios:'));
  workPackage.bddScenarios.forEach((scenario, index) => {
    console.log(`\nScenario ${index + 1}: ${scenario.title}`);
    console.log(scenario.text);
  });

  console.log(chalk.yellow('\nTest Cases:'));
  workPackage.testCases.forEach((tc) => {
    console.log(`\n- ${tc.type}: ${tc.description}`);
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
