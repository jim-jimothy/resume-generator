import { Command } from 'commander';
import chalk from 'chalk';
import ora from 'ora';
import { generatePDFCommand } from './commands/generate.js';
import { validateCommand } from './commands/validate.js';
import { ErrorHandler } from '../utils/error-handler.js';

const program = new Command();

// Global options for debug and verbose mode
let globalOptions = {
  debug: false,
  verbose: false
};

program
  .name('resume-gen')
  .description('Generate ATS-compliant PDF resumes from JSON')
  .version('1.0.0')
  .option('--debug', 'enable debug mode with verbose output')
  .option('--verbose', 'enable verbose output')
  .hook('preAction', (thisCommand) => {
    const opts = thisCommand.opts();
    globalOptions.debug = opts.debug || false;
    globalOptions.verbose = opts.verbose || opts.debug || false;
    
    // Set up enhanced error handling
    ErrorHandler.handleUncaughtErrors({
      debug: globalOptions.debug,
      verbose: globalOptions.verbose,
      showSuggestions: true,
      exitOnError: true
    });
  });

// Default action: generate PDF (most common use case)
program
  .argument('[input]', 'JSON resume file path')
  .option('-f, --file <path>', 'JSON resume file path')
  .option('-o, --output <path>', 'output PDF file path')
  .option('-t, --template <name>', 'template name', 'ats-optimized')
  .option('--ats-mode', 'enable ATS-optimized mode')
  .option('--timestamp', 'add timestamp to filename')
  .option('--force', 'overwrite existing files')
  .option('-w, --watch', 'watch for file changes')
  .action((input, options) => {
    // Determine input file from argument or --file option
    const inputFile = input || options.file;
    
    if (!inputFile) {
      console.error(chalk.red('Error: Please specify a JSON resume file'));
      console.error(chalk.gray('Usage: resume-gen --file resume.json'));
      console.error(chalk.gray('   or: resume-gen resume.json'));
      process.exit(1);
    }

    // Pass global options to command
    generatePDFCommand(inputFile, { ...options, ...globalOptions });
  });

program
  .command('generate')
  .description('Generate PDF from JSON resume (explicit command)')
  .argument('<input>', 'JSON resume file path')
  .option('-o, --output <path>', 'output PDF file path')
  .option('-t, --template <name>', 'template name', 'ats-optimized')
  .option('--ats-mode', 'enable ATS-optimized mode')
  .option('--timestamp', 'add timestamp to filename')
  .option('--force', 'overwrite existing files')
  .option('-w, --watch', 'watch for file changes')
  .action((input, options) => {
    // Pass global options to command
    generatePDFCommand(input, { ...options, ...globalOptions });
  });

program
  .command('validate')
  .description('Validate JSON resume schema')
  .argument('<input>', 'JSON resume file to validate')
  .action((input, options) => {
    // Pass global options to command
    validateCommand(input, { ...options, ...globalOptions });
  });

// Add help command for better discoverability
program
  .command('help [command]')
  .description('Display help for command')
  .action((cmd) => {
    if (cmd) {
      program.commands.find(c => c.name() === cmd)?.help();
    } else {
      program.help();
    }
  });

// Show help if no arguments provided
if (process.argv.length === 2) {
  console.log(chalk.blue('📄 Resume Generator CLI'));
  console.log();
  console.log(chalk.green('Quick start:'));
  console.log(chalk.gray('  resume-gen --file my-resume.json'));
  console.log(chalk.gray('  resume-gen my-resume.json'));
  console.log();
  console.log(chalk.green('Common options:'));
  console.log(chalk.gray('  -o, --output     Specify output PDF path'));
  console.log(chalk.gray('  --ats-mode       Generate ATS-optimized version'));
  console.log(chalk.gray('  -w, --watch      Watch for file changes'));
  console.log();
  console.log(chalk.yellow('Run "resume-gen --help" for full options'));
  process.exit(0);
}

// Export global options for use in commands
export { globalOptions };

program.parse();