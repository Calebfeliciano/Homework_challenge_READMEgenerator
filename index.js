// TODO: Include packages needed for this application
import inquirer from 'inquirer';
import fs from 'fs';
import generateReadme from './utils/generateMarkdown.js';

// TODO: Create an array of questions for user input
const questions = [
  {
    type: 'input',
    name: 'title',
    message: 'Welcome to the README Generator! What is the title of your project?',
  },
  {
    type: 'input',
    name: 'description',
    message: 'Provide a description of your project:',
  },
  {
    type: 'input',
    name: 'installation',
    message: 'What are the installation instructions?',
  },
  {
    type: 'input',
    name: 'usage',
    message: 'What is the usage information?',
  },
  {
    type: 'input',
    name: 'contributing',
    message: 'What are the contribution guidelines?',
  },
  {
    type: 'input',
    name: 'tests',
    message: 'What are the test instructions?',
  },
  {type: 'input',
    name: 'Credits', 
    message: 'Who are the contributors?',
  },
  {
    type: 'list',
    name: 'license',
    message: 'What license are you using?',
    choices: ['MIT', 'GPLv3', 'Apache 2.0', 'BSD 3-Clause', 'None'],
  },
  {
    type: 'input',
    name: 'github',
    message: 'Enter your GitHub username:',
  },
  {
    type: 'input',
    name: 'email',
    message: 'Enter your email address:',
  },
];

// TODO: Create a function to write README file
function writeToFile(fileName, data) {
  fs.writeFile(fileName, data, (err) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log(`README file ${fileName} has been generated`);
  });
}

// TODO: Create a function to initialize app
function init() {
  inquirer.prompt(questions).then((answers) => {
    const readmeContent = generateReadme(answers);
    const timestamp = new Date().toISOString().replace(/[-:.]/g, '');
    const fileName = `README_${timestamp}.md`;
    writeToFile(fileName, readmeContent);

    // Ask if the user wants to submit another
    inquirer.prompt([
      {
        type: 'confirm',
        name: 'submitAnother',
        message: 'Would you like to create another README.md file?',
      },
    ]).then((response) => {
      if (response.submitAnother) {
        init();
      } else {
        console.log('Thank you for using the README generator!');
      }
    });
  });
}

// Function call to initialize app
init();