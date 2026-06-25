---
name: resume-gen
description: Generate or validate ATS-compliant PDF resumes from JSON using the resume-gen CLI. Use when the user wants to create, build, update, render, or validate a resume PDF from a JSON file (JSONResume format).
---

# resume-gen

`resume-gen` is a Bun CLI that turns a [JSONResume](https://jsonresume.org/)-format
`.json` file into a clean, ATS-friendly PDF. Use this skill whenever the user wants
to build, regenerate, or validate a resume PDF from JSON data.

## Prerequisites

The CLI and its PDF renderer must be installed once. If `resume-gen` is missing or
PDF generation fails with a "browser not found" error, run:

```bash
bun install -g github:jim-jimothy/resume-generator   # installs the resume-gen command
bunx playwright install chromium                      # one-time, ~150 MB renderer
```

Verify availability with `resume-gen --version`. If `command not found`, Bun's global
bin directory isn't on PATH — `bun pm bin -g` prints it.

## Core workflow

1. **Validate first.** Always validate before generating so schema errors surface
   cleanly instead of producing a broken PDF:
   ```bash
   resume-gen validate resume.json
   ```
2. **Generate.** The output PDF lands next to the JSON unless `-o` is given:
   ```bash
   resume-gen resume.json                 # auto-named output
   resume-gen resume.json -o my-resume.pdf
   ```
3. **Report** the output path to the user.

## Commands and options

| Invocation | Purpose |
|------------|---------|
| `resume-gen <file.json>` | Generate a PDF (the default `generate` command) |
| `resume-gen validate <file.json>` | Check JSON against the schema, no PDF |
| `resume-gen <file.json> -o out.pdf` | Choose the output path |
| `resume-gen <file.json> --ats-mode` | Plainer styling that parses more reliably in ATS |
| `resume-gen <file.json> --timestamp` | Add a timestamp to the output filename |
| `resume-gen <file.json> --force` | Overwrite an existing output file |
| `resume-gen <file.json> --watch` | Regenerate on every save (long-running; only when asked) |
| `resume-gen <file.json> --debug` | Verbose error output for diagnosing failures |

> **Watch mode is long-running** — don't start `--watch` unless the user explicitly
> asks to watch; it won't return on its own.

## JSON schema

Resume data follows the JSONResume standard. **Required:** `basics.name`,
`basics.email`, and a `work[]` array where each entry has `name`, `position`, and
`startDate` (ISO `YYYY-MM-DD`).

```json
{
  "basics": {
    "name": "Jane Doe",
    "label": "Software Engineer",
    "email": "jane@example.com",
    "phone": "+1-555-0123",
    "summary": "One or two sentences about you.",
    "location": { "city": "San Francisco", "region": "CA", "countryCode": "US" },
    "profiles": [
      { "network": "LinkedIn", "username": "janedoe", "url": "https://linkedin.com/in/janedoe" }
    ]
  },
  "work": [
    {
      "name": "Acme Corp",
      "position": "Senior Software Engineer",
      "startDate": "2021-03-01",
      "summary": "Lead development of microservices.",
      "highlights": ["Designed scalable architecture", "Led a team of 5"],
      "location": "San Francisco, CA"
    }
  ]
}
```

Optional sections: `education`, `skills`, `projects`, `awards`, `certifications`,
`publications`, `languages`, `interests`, `references`.

## When editing resume JSON

- Keep dates as ISO `YYYY-MM-DD` strings.
- Omit `endDate` on a current role rather than inventing one.
- Phrase `work[].highlights` as concise, achievement-oriented bullets.
- After any edit, re-run `resume-gen validate <file>` before generating.

## Troubleshooting

- **`command not found: resume-gen`** — not installed or not on PATH (see Prerequisites).
- **"browser not found" / Chromium error** — run `bunx playwright install chromium`.
- **Generation fails or output looks wrong** — run `resume-gen validate <file>`, then
  retry with `--debug` and read the detailed error.
