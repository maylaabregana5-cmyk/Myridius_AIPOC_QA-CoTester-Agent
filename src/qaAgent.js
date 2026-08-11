function createWorkPackage(input) {
  const storyText = typeof input === 'string' ? input : input.story || '';

  const testCases = generateTestCases();

  return {
    summary: summarizeStory(storyText),
    assumptions: detectAssumptions(storyText),
    bddScenarios: generateBdd(),
    testCases,
    coverageMatrix: generateCoverageMatrix(),
    exploratoryCharter: generateExploratoryCharter(),
    syntheticData: generateSyntheticData(),
    automationTriage: recommendAutomation(testCases),
  };
}

function summarizeStory(storyText) {
  const lines = storyText.trim().split('\n');
  return `Draft summary: ${lines[0] || 'User story description is missing.'}`;
}

function detectAssumptions(storyText) {
  const assumptions = [];
  if (!/acceptance criteria/i.test(storyText)) {
    assumptions.push('Acceptance criteria are not explicitly labeled; confirm expected outcomes.');
  }
  if (/register|registration/i.test(storyText) && !/email|password|form/i.test(storyText)) {
    assumptions.push('The user story mentions registration but lacks field and validation details.');
  }
  if (!/ui|api|backend|frontend/i.test(storyText)) {
    assumptions.push('No UI or API details are present; capture interface expectations.');
  }
  if (assumptions.length === 0) {
    assumptions.push('No major ambiguity detected in draft input; verify all acceptance criteria are complete.');
  }
  return assumptions;
}

function generateBdd() {
  return [
    {
      title: 'Create account with valid data',
      text: 'Given a new user with valid registration details\nWhen the user submits the registration form\nThen the account is created and a confirmation message appears.',
    },
    {
      title: 'Attempt registration with invalid email',
      text: 'Given a new user with an improperly formatted email address\nWhen the user submits the registration form\nThen validation rejects the email and shows an error message.',
    },
    {
      title: 'Register with missing required fields',
      text: 'Given a new user with missing required fields\nWhen the user submits the registration form\nThen the submission is blocked and required field errors are displayed.',
    },
    {
      title: 'Duplicate account prevention',
      text: 'Given an email address already registered\nWhen the user attempts to register again\nThen the system prevents duplicate accounts and prompts the user appropriately.',
    },
    {
      title: 'Password boundary validation',
      text: 'Given a password shorter than the minimum length\nWhen the user enters the password\nThen the system shows a password length validation message.',
    },
    {
      title: 'User sees success notification',
      text: 'Given a successful registration submission\nWhen the account is created\nThen the user sees a success notification and next steps guidance.',
    },
  ];
}

function generateTestCases() {
  return [
    { type: 'Functional', description: 'Register with valid data and verify account creation.' },
    { type: 'Functional', description: 'Verify error messages for invalid email format.' },
    { type: 'Negative', description: 'Ensure missing required fields prevent registration.' },
    { type: 'Boundary', description: 'Check password minimum length and maximum length validation.' },
    { type: 'Regression', description: 'Confirm previously fixed duplicate registration bug remains resolved.' },
    { type: 'Compatibility', description: 'Validate registration form behavior on desktop and mobile browsers.' },
    { type: 'Exploratory', description: 'Explore edge cases around optional fields and UI error handling.' },
    { type: 'Accessibility', description: 'Verify screen reader labels and keyboard navigation on registration form.' },
    { type: 'API', description: 'Validate backend registration API response codes for valid and invalid payloads.' },
    { type: 'Security', description: 'Check that password fields are masked and not returned in API responses.' },
    { type: 'Data', description: 'Ensure unique email constraint is enforced by the system.' },
    { type: 'Usability', description: 'Confirm success guidance is clear after account creation.' },
  ];
}

function generateSyntheticData() {
  return [
    { email: 'test.user+valid@example.com', password: 'Passw0rd!', firstName: 'Test', lastName: 'User', age: 30 },
    { email: 'test.user+invalidemail.com', password: 'Passw0rd!', firstName: 'Test', lastName: 'User', age: 30 },
    { email: 'test.user+missing@example.com', password: '', firstName: 'Test', lastName: 'User', age: 30 },
    { email: 'test.user+shortpass@example.com', password: 'P@1', firstName: 'Test', lastName: 'User', age: 30 },
    { email: 'test.user+longname@example.com', password: 'Passw0rd!', firstName: 'ThisNameIsWayTooLongToBeValidInSomeForms', lastName: 'User', age: 30 },
    { email: 'test.user+edge@example.com', password: 'Passw0rd!', firstName: 'Test', lastName: 'User', age: 120 },
    { email: 'test.user+boundary@example.com', password: 'Passw0rd!', firstName: 'T', lastName: 'U', age: 0 },
    { email: 'test.user+special@example.com', password: 'P@$$w0rd!', firstName: 'Test', lastName: 'User', age: 25 },
    { email: 'test.user+spaces@example.com', password: 'Passw0rd!', firstName: 'Test User', lastName: 'Example', age: 35 },
    { email: 'test.user+unicode@example.com', password: 'Passw0rd!', firstName: 'Tést', lastName: 'Üser', age: 28 },
    { email: 'test.user+invalid@.com', password: 'Passw0rd!', firstName: 'Test', lastName: 'User', age: 30 },
    { email: 'test.user+toolong@example.com', password: 'Passw0rd!', firstName: 'Test', lastName: 'User', age: 30 },
    { email: 'test.user+missingat.com', password: 'Passw0rd!', firstName: 'Test', lastName: 'User', age: 30 },
    { email: 'test.user+null@example.com', password: null, firstName: 'Test', lastName: 'User', age: 30 },
    { email: 'test.user+boundary2@example.com', password: 'A1b2C3d4', firstName: '', lastName: 'User', age: 30 },
    { email: 'test.user+capital@example.com', password: 'Passw0rd!', firstName: 'TEST', lastName: 'USER', age: 30 },
    { email: 'test.user+repeat@example.com', password: 'Passw0rd!', firstName: 'Test', lastName: 'User', age: -1 },
    { email: 'test.user+spaces2@example.com', password: 'Pass w0rd!', firstName: 'Test', lastName: 'User', age: 30 },
    { email: 'test.user+json@example.com', password: 'Passw0rd!', firstName: 'Test', lastName: 'User', age: 30, note: '<script>alert(1)</script>' },
    { email: 'test.user+maxlen@example.com', password: 'Passw0rd!', firstName: 'Test', lastName: 'User', age: 30, extraField: 'Extra' },
  ];
}

function generateCoverageMatrix() {
  return [
    { requirement: 'Email must be unique and valid', testCase: 'Verify error messages for invalid email format.', category: 'Functional', coverage: 'High' },
    { requirement: 'Password must be at least 8 characters and contain letters and numbers', testCase: 'Check password minimum length and maximum length validation.', category: 'Boundary', coverage: 'High' },
    { requirement: 'Required fields must display validation errors', testCase: 'Ensure missing required fields prevent registration.', category: 'Negative', coverage: 'High' },
    { requirement: 'Form shows confirmation and next step guidance', testCase: 'Register with valid data and verify account creation.', category: 'Functional', coverage: 'High' },
    { requirement: 'Accessible labels and keyboard navigation', testCase: 'Verify screen reader labels and keyboard navigation on registration form.', category: 'Accessibility', coverage: 'Medium' },
    { requirement: 'Backend returns 201 on success and 400 on invalid payload', testCase: 'Validate backend registration API response codes for valid and invalid payloads.', category: 'API', coverage: 'Medium' },
  ];
}

function generateExploratoryCharter() {
  return {
    mission: 'Explore edge cases, UI behavior, and validation flows for the registration process.',
    focusAreas: [
      'Optional newsletter opt-in flows',
      'Error message handling and display across desktop/mobile',
      'Duplicate email and account creation edge cases',
      'Accessibility keyboard navigation and screen reader behavior',
    ],
    successCriteria: [
      'Identify any missing acceptance criteria or ambiguous requirements',
      'Capture unexpected validation or UX behavior',
      'Document areas that are better suited for exploratory testing than automation',
    ],
  };
}

function recommendAutomation(testCases) {
  return testCases.map((tc) => {
    let recommendation = 'Manual or exploratory review';
    if (/Functional|Regression|API|Security/i.test(tc.type)) {
      recommendation = 'Suitable for automation if stable and repeatable.';
    }
    if (/Exploratory|Usability|Accessibility/i.test(tc.type)) {
      recommendation = 'Best as manual exploratory testing, supported by automation checks where possible.';
    }
    return { scenario: tc.description, recommendation };
  });
}

module.exports = { createWorkPackage };
