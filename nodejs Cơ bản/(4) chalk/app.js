const chalk = require('chalk');

// chalk
// console.log(chalk.blue('hello world'))
// console.log(chalk.blue('hello world') +' World ' + chalk.red('hello world'))
// console.log(chalk.blue.bgRed.bold('Hello world!'));
// console.log(chalk.blue('Hello', 'World!', 'Foo', 'bar', 'biz', 'baz'));
// console.log(chalk.red('Hello', chalk.underline.bgBlue('world') + '!'));
// console.log(chalk.keyword('orange')('Yay for orange colored text!'));
// console.log(`
// CPU: ${chalk.red('90%')}
// RAM: ${chalk.green('40%')}
// DISK: ${chalk.yellow('70%')}
// `);

// const ctx = new chalk.Instance({level: 0});
// ES2015 tagged template literal
// const cpu =new Number(9);
// const ram = 8;
// const disk = 7;
// console.log(chalk`
// CPU: {red ${cpu.totalPercent}%}
// RAM: {green ${ram.used / ram.total * 100}%}
// DISK: {rgb(255,131,0) ${disk.used / disk.total * 100}%}
// `);

// Use RGB colors in terminal emulators that support it.
// console.log(chalk.keyword('orange')('Yay for orange colored text!'));
// console.log(chalk.rgb(123, 45, 67).underline('Underlined reddish color'));
// console.log(chalk.hex('#DEADED').bold('Bold gray!'));

const error = chalk.inverse.blue;
const warning = chalk.keyword('orange');

console.log(error('Error!'));
console.log(warning('Warning!'));