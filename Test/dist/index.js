"use strict";
const { Command } = require("commander");
const figlet = require("figlet");
const program = new Command();
console.log(figlet.textSync("2KIM & DOH"));
program
    .version("1.0.0")
    .description("2KIM & DOH CLI Project1")
    .option("./run install", "Install all the dependencies")
    .option("./run <sample-url-file.txt directory>", "Read URL txt file")
    .option("./run test", "Run Tests")
    .parse(process.argv);
const options = program.opts();
//# sourceMappingURL=index.js.map