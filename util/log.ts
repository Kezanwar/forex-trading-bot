import chalk from "chalk";

export const log = (...args: any[]) => console.log(...args, "\n");

export const logRed = (msg: any) => {
  log(chalk.red(msg));
};

export const logGreen = (msg: any) => {
  log(chalk.green(msg));
};

export const logBlue = (msg: any) => {
  log(chalk.blueBright(msg));
};
