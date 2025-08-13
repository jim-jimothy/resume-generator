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
  .name('resume-pdf')
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

program
  .command('generate')
  .description('Generate PDF from JSON resume')
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

// Export global options for use in commands
export { globalOptions };

program.parse();