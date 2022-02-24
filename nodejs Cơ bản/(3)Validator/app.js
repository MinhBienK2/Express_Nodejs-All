const validator = require('validator');
const chalk = require('chalk');

// validator
const a = 'hello';
console.log(validator.isEmail('phamminhbine@gmail.com'))
console.log(validator.isURL('http://helelo.com'))
console.log(validator.equals(a,'hello'))
console.log(validator.isAfter('2015-05-22','2015-05-22'))
console.log(validator.isAlpha('hefjei'))

// chalk
console.log(chalk.blue('hello world'))
console.log(chalk.blue('hello world') +' World ' + chalk.red('hello world'))
console.log(chalk.blue.bgRed.bold('Hello world!'));
console.log(chalk.blue('Hello', 'World!', 'Foo', 'bar', 'biz', 'baz'));
console.log(chalk.red('Hello', chalk.underline.bgBlue('world') + '!'));
console.log(chalk.keyword('orange')('Yay for orange colored text!'));
console.log(`
CPU: ${chalk.red('90%')}
RAM: ${chalk.green('40%')}
DISK: ${chalk.yellow('70%')}
`);

// ES2015 tagged template literal
const cpu =new Number(9);
const ram = 8;
const disk = 7;
console.log(chalk`
CPU: {red ${cpu.totalPercent}%}
RAM: {green ${ram.used / ram.total * 100}%}
DISK: {rgb(255,131,0) ${disk.used / disk.total * 100}%}
`);

// Use RGB colors in terminal emulators that support it.
console.log(chalk.keyword('orange')('Yay for orange colored text!'));
console.log(chalk.rgb(123, 45, 67).underline('Underlined reddish color'));
console.log(chalk.hex('#DEADED').bold('Bold gray!'));