var readline = require('readline');
var chalk = require('chalk');
var program = require('commander');

program
    .arguments('<regexppattern>', 'Regexp pattern')
    .option('-f, --flags <flags>', 'Regexp flags', "")
    .action(function(pattern, cmd) {
        var regexp = new RegExp(pattern, cmd.flags);
        cmd.summarize = true;
        var matchedLines = [];
        var rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
            terminal: false
        });

        rl.on('line', function(line){
            if (regexp.test(line)) {
                matchedLines.push(line);
                console.log(chalk.red(line));
            } else {
                console.log(line);
            }
        });
        rl.on('close', function() {
            if (matchedLines.length > 0) {
                if (cmd.summarize) {
                    console.log(chalk.bold.red("Matches " + regexp.toString() + ":"));
                    for (var i = 0; i < matchedLines.length; i++) {
                        var line = matchedLines[i];
                        console.log(chalk.red(line));
                    }
                }
                process.exit(1)
            } else {
                console.log(chalk.green("No line matching " + regexp.toString() + " was found"));
                process.exit(0);
            }
        })

    }).parse(process.argv)
;
