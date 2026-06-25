# Resume Generator

> 📄 Generate ATS-compliant PDF resumes from a simple JSON file.

A command-line tool that turns your resume data (written as JSON) into a clean, ATS-friendly PDF. Maintain your resume as code, regenerate it in seconds.

[![Bun](https://img.shields.io/badge/bun-v1.0.0+-blue.svg)](https://bun.sh)

## ✨ Features

- **📝 Resume as JSON** — follows the [JSONResume](https://jsonresume.org/) standard
- **📱 ATS-friendly** — PDFs are optimized to parse cleanly in Applicant Tracking Systems
- **🔍 Schema validation** — catches missing/invalid fields before generating
- **👀 Watch mode** — auto-regenerates the PDF as you edit your JSON

## 🚀 Quick Start

You need **[Bun](https://bun.sh)** installed:

```bash
# macOS / Linux
curl -fsSL https://bun.sh/install | bash
```

```powershell
# Windows (PowerShell)
powershell -c "irm bun.sh/install.ps1 | iex"
```

Then (same commands on every OS):

```bash
# 1. Install the tool straight from GitHub (no clone needed)
bun install -g github:jim-jimothy/resume-generator

# 2. Install the Chromium browser used to render PDFs (one time, ~150 MB)
bunx playwright install chromium
```

That's it — the `resume-gen` command is now available everywhere.

> **Updating later?** Re-run the install command in step 1 to pull the latest version.

### Generate your first resume

Create a file called `resume.json`:

```json
{
  "basics": {
    "name": "Your Name",
    "label": "Software Engineer",
    "email": "you@example.com",
    "phone": "+1-555-0123",
    "summary": "One or two sentences about you."
  },
  "work": [
    {
      "name": "Acme Corp",
      "position": "Software Engineer",
      "startDate": "2021-03-01",
      "highlights": [
        "Built the thing that did the stuff",
        "Led a team of 4 engineers"
      ]
    }
  ]
}
```

Then generate the PDF:

```bash
resume-gen resume.json
```

Your PDF appears next to the JSON file. See [Resume Format](#-resume-format) for every available field.

## 📋 Usage

```bash
resume-gen [options] [input-file]
resume-gen [command] [options] [input-file]
```

### Common examples

```bash
# Generate a PDF (output name is auto-generated)
resume-gen resume.json

# Choose the output file
resume-gen resume.json --output my-resume.pdf

# Maximize ATS compatibility (plainer styling that parses more reliably)
resume-gen resume.json --ats-mode

# Re-generate automatically every time you save the JSON
resume-gen resume.json --watch

# Check your JSON without generating a PDF
resume-gen validate resume.json
```

### Commands

| Command | Description |
|---------|-------------|
| `generate` | Generate a PDF from JSON (this is the default — you can omit it) |
| `validate` | Validate your JSON against the schema |
| `help` | Show help |

### Options

| Option | Alias | Description | Default |
|--------|-------|-------------|---------|
| `--file <path>` | `-f` | JSON resume file path | — |
| `--output <path>` | `-o` | Output PDF path | Auto-generated |
| `--ats-mode` | | Maximize ATS compatibility | `false` |
| `--timestamp` | | Add a timestamp to the filename | `false` |
| `--force` | | Overwrite an existing file | `false` |
| `--watch` | `-w` | Regenerate on file changes | `false` |
| `--debug` | | Verbose error output | `false` |
| `--version` | `-V` | Print version | |
| `--help` | `-h` | Show help | |

## 📝 Resume Format

Resume data follows the [JSONResume](https://jsonresume.org/) standard.

### Required fields

```json
{
  "basics": {
    "name": "Your Name",
    "email": "you@example.com"
  },
  "work": [
    {
      "name": "Company Name",
      "position": "Job Title",
      "startDate": "2020-01-01"
    }
  ]
}
```

### Full example

```json
{
  "basics": {
    "name": "John Doe",
    "label": "Software Engineer",
    "email": "john.doe@email.com",
    "phone": "+1-555-0123",
    "url": "https://johndoe.dev",
    "summary": "Experienced software engineer...",
    "location": {
      "city": "San Francisco",
      "region": "CA",
      "countryCode": "US"
    },
    "profiles": [
      {
        "network": "LinkedIn",
        "username": "johndoe",
        "url": "https://linkedin.com/in/johndoe"
      }
    ]
  },
  "work": [
    {
      "name": "Tech Corp",
      "position": "Senior Software Engineer",
      "url": "https://techcorp.com",
      "startDate": "2021-03-01",
      "summary": "Lead development of microservices...",
      "highlights": [
        "Designed scalable microservices architecture",
        "Led cross-functional team of 5 engineers"
      ],
      "location": "San Francisco, CA"
    }
  ],
  "education": [
    {
      "institution": "State University",
      "area": "Computer Science",
      "studyType": "Bachelor of Science",
      "startDate": "2015-09-01",
      "endDate": "2019-05-15"
    }
  ],
  "skills": [
    {
      "name": "Programming Languages",
      "level": "Advanced",
      "keywords": ["JavaScript", "TypeScript", "Python"]
    }
  ]
}
```

### Optional sections

`education`, `skills`, `projects`, `awards`, `certifications`, `publications`, `languages`, `interests`, `references`.

A complete working sample lives in [`examples/sample-resume.json`](examples/sample-resume.json).

## 🤖 Use it from a coding agent

Prefer to drive this from Claude Code instead of the terminal? Install the bundled
skill and your agent will know how to validate, generate, and edit resumes for you:

```bash
mkdir -p ~/.claude/skills/resume-gen
cp agent-skills/claude/SKILL.md ~/.claude/skills/resume-gen/
```

Then just ask: *"generate my resume from resume.json"*. See
[`agent-skills/`](agent-skills/) for project-scoped install and the no-clone
`curl` one-liner.

## 🔧 Troubleshooting

**`command not found: resume-gen`**
The global install bin isn't on your PATH. Make sure Bun's global bin directory is on your PATH (`bun pm bin -g` prints it), then restart your terminal.

**PDF generation fails with a "browser not found" / Chromium error**
The Playwright browser isn't installed. Run:
```bash
bunx playwright install chromium
```

**PDF generation fails or output looks wrong**
Validate your JSON and re-run with `--debug` for a detailed error:
```bash
resume-gen validate resume.json
resume-gen resume.json --debug
```

## 🔗 Links

- [JSONResume Standard](https://jsonresume.org/)
- [Report an issue](https://github.com/jim-jimothy/resume-generator/issues)
