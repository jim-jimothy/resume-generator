# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a CLI tool for generating ATS-compliant PDF resumes from JSON data. The application uses TypeScript with ESM modules, Playwright for PDF generation, and esbuild for bundling. It provides schema validation, multiple output formats, file watching, and template-based PDF generation.

## Common Commands

### Development Commands
```bash
# Run in development mode (uses experimental TypeScript support)
npm run dev

# Build the application for production
npm run build

# Run tests
npm test

# Run tests with coverage
npm run test:ci

# Run specific test file
npx vitest run tests/generators/pdf-generator.test.ts

# Watch mode for tests
npx vitest --watch

# Lint the codebase
npm run lint

# Format code
npm run format
```

### CLI Usage Examples
```bash
# Simple generation (most common usage)
resume-gen --file examples/sample-resume.json
resume-gen examples/sample-resume.json

# Generate with custom output
resume-gen --file examples/sample-resume.json -o my-resume.pdf

# Enable ATS-optimized mode
resume-gen --file examples/sample-resume.json --ats-mode

# Watch for file changes
resume-gen --file examples/sample-resume.json --watch

# Using explicit generate command
resume-gen generate examples/sample-resume.json

# Validate JSON schema
resume-gen validate examples/sample-resume.json

# Debug mode with verbose output
resume-gen --file examples/sample-resume.json --debug
```

## Architecture Overview

### Core Components

**CLI Layer (`src/cli/`)**
- `index.ts`: Main CLI entry point using Commander.js with global error handling
- `commands/generate.ts`: PDF generation command with watch mode support
- `commands/validate.ts`: JSON schema validation command

**Generation Pipeline (`src/generators/`)**
- `pdf-generator.ts`: Main PDF generation using Playwright browser automation
- `html-generator.ts`: Template-based HTML generation using Handlebars
- `multi-format-generator.ts`: Support for HTML, PDF, and TXT output formats

**Schema & Validation (`src/schemas/`, `src/validators/`)**
- `resume-schema.ts`: JSON Schema definition following JSONResume standard
- `resume-validator.ts`: AJV-based validation with detailed error reporting

**Utilities (`src/utils/`)**
- `browser-pool.ts`: Playwright browser instance pooling for performance
- `deterministic-pdf.ts`: Ensures reproducible PDF output
- `file-watcher.ts`: Debounced file watching for live reload
- `output-path.ts`: Smart output path generation with collision detection
- `error-handler.ts`: Global error handling with user-friendly messages

### Data Flow

1. **Input**: JSON resume data validated against JSONResume schema
2. **Template Processing**: Handlebars templates generate HTML with styling
3. **PDF Generation**: Playwright converts HTML to PDF with ATS-compliant formatting
4. **Output**: Generated PDF with optional watch mode for development

### Key Design Patterns

**Browser Pool Pattern**: Reuses Playwright browser instances across PDF generations for performance optimization.

**Template System**: Modular Handlebars templates support different resume styles while maintaining ATS compliance.

**Error Handling Strategy**: Custom error types (`ValidationError`, `FileSystemError`, `PDFGenerationError`) provide specific error context and recovery suggestions.

**Watch Mode Architecture**: Debounced file watching prevents rapid regeneration while providing immediate feedback during development.

## Testing Strategy

- **Unit Tests**: Individual utility functions and validation logic
- **Integration Tests**: Full pipeline from JSON to PDF generation
- **Performance Tests**: Memory usage and generation speed benchmarks
- **Offline Tests**: Network isolation and asset bundling verification

Test files follow the pattern `tests/[component]/[feature].test.ts` and use Vitest with global test utilities.

## Template System

Templates are located in `templates/` directory and use Handlebars for dynamic content generation. The system supports:

- **ATS-Optimized Mode**: Simplified formatting for applicant tracking systems
- **Professional Mode**: Enhanced styling while maintaining ATS compatibility
- **Custom Templates**: Extensible template system for different resume formats

## JSON Schema Requirements

Resume data must follow JSONResume standard with required fields:
- `basics.name` and `basics.email` (required)
- `work[]` array with position details (required)
- Optional sections: education, skills, projects, certifications, awards

See `examples/sample-resume.json` for complete structure reference.