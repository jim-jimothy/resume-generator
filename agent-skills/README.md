# Agent skills

Drop-in skill files that teach agentic coding tools how to drive `resume-gen`.

Once installed, your coding agent knows how to validate JSON, generate the PDF,
use the right flags, and follow the resume schema — without you re-explaining it
each session.

## Claude Code

Copy the skill into your project (or `~/.claude/skills/` to make it available
everywhere):

```bash
# Project-scoped
mkdir -p .claude/skills/resume-gen
cp agent-skills/claude/SKILL.md .claude/skills/resume-gen/

# Or user-scoped (available in every project)
mkdir -p ~/.claude/skills/resume-gen
cp agent-skills/claude/SKILL.md ~/.claude/skills/resume-gen/
```

Claude Code discovers the skill automatically and invokes it when you ask to
build, update, or validate a resume.

> Not using this repo as a clone? Grab the raw file:
> ```bash
> mkdir -p ~/.claude/skills/resume-gen
> curl -fsSL https://raw.githubusercontent.com/jim-jimothy/resume-generator/main/agent-skills/claude/SKILL.md \
>   -o ~/.claude/skills/resume-gen/SKILL.md
> ```
