const chalk = require('chalk');

const error = chalk.bold.red;
const warning = chalk.keyword('orange').bold;

console.log(error('Error!'));
console.log(warning('Warning!'));

