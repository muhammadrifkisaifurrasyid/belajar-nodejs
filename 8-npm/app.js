const validator = require('validator');
// import chalk from 'chalk';
const chalk = require('chalk');
// console.log(validator.isEmail('rifki@gmail.com'));
// console.log(validator.isMobilePhone('085654757', 'id-ID'));
console.log(chalk.black.bgBlue.italic('hello world'));
const pesan = chalk`rifki {bgRed rajib} fauzy maulana`;
console.log((pesan));