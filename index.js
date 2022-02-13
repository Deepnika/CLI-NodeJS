#!/usr/bin/env/ node

import chalk from "chalk";
import chalkAnimation from "chalk-animation";
import gradient from "gradient-string";
import inquirer from "inquirer";
import figlet from "figlet";
import { createSpinner } from "nanospinner";

console.log(chalk.bgBlue("Hi Mom"));

let playerName;

const sleep = ( ms = 2000 ) => new Promise( (r) => setTimeout(r, ms));

async function welcome() {
    const title = chalkAnimation.pulse(
        "Who wants to be a mil? \n"
    );

    await sleep();
    title.stop();

    console.log(`
        ${chalk.bgGreen("HOW TO PLAY")}

        "First Rule"
        "Second rule"
    `);
}

async function askName(){
    const answer = await inquirer.prompt({
        name: 'player_name',
        type: 'input',
        message: 'What is your name?',
        default() {
            return 'Player';
        }
    });
}

async function question1(){
    const answers = await inquirer.prompt({
        name: 'question_1',
        type: 'list',
        message: 'Your favourite shoe polish?',
        choices: [
            'A',
            'B',
            'C',
            'D'
        ]
    });

    return handleAnswer(answers.question_1 == 'A');
}

async function handleAnswer(isCorrect) {
    const spinner = createSpinner('Checking Answer...').start();
    await sleep();

    if (isCorrect) {
        spinner.success({ text: `Nice work ${playerName}. That's correct` });
    }
    else {
        spinner.error({ text: `You lost.` });
        process.exit(1);
    }
}

function winner() {
    console.clear();
    const message = `Congrats, ${playerName} !\n Here's a million dollars.`;

    figlet(message, (err, data) => {
        console.log(gradient.pastel.multiline(data));
    })
}

// await welcome();
// await askName();
// await question1();
await winner();