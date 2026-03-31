# okslop-claude-skill

[![OKSLOP — Free AI-generated stock photos](https://okslop.com/og-default.jpg)](https://okslop.com)

Claude Code skill for [OKSLOP](https://okslop.com) — find or generate stock images directly from your coding workflow.

**OKSLOP** is a library of free, AI-generated stock images you can use in blogs, apps, docs, marketing, social media — anywhere you need a visual. No attribution required, no licensing fees. Search millions of existing images, or generate exactly what you need from a text prompt.

When installed, Claude Code automatically knows how to search and generate images whenever you need one. Ask Claude to "add a hero image" or "find a photo of mountains" and it handles the rest.

## Install

**Recommended:** Use the Claude Code plugin system (run these in Claude Code, not your terminal):

```
/plugin marketplace add OKSLOP/claude-plugins
/plugin install okslop@OKSLOP-claude-plugins
```

**Manual:** Clone and copy the skill directory into your project:

```bash
git clone https://github.com/OKSLOP/okslop-claude-skill.git
cp -r okslop-claude-skill/.claude/skills/okslop .claude/skills/
```

## What It Does

The skill triggers whenever Claude Code needs a stock image — blog posts, docs, READMEs, UI mockups, landing pages, etc. It teaches Claude to:

1. **Search** the OKSLOP library (millions of free, AI-generated photos)
2. **Generate** custom images from text prompts (deterministic URLs)
3. **Save** images locally via `curl`
4. **Insert** proper image markup (Markdown, HTML, JSX, frontmatter)

All operations use the `okslop` CLI (`npx okslop`), so there's nothing else to install.

## API Key

An API key is **optional for searching** but **required for generating** images (embed).

```bash
export OKSLOP_ACCESS_KEY=your_key_here
```

Get a free key at [okslop.com/developers/register](https://okslop.com/developers/register).

| Mode | Search | Generate | Rate Limit |
|------|--------|----------|------------|
| No key | Yes | No | 30/min, 500/day |
| Free key | Yes | Yes | 30/min, 1,000/day |
| Pro key | Yes | Yes | 100/min, 10,000/day |

## CLI Reference

The skill uses the `okslop` npm package under the hood:

```bash
# Search for images
npx okslop search "mountain sunset" -n 5 --json

# Generate from a prompt
npx okslop embed "cozy coffee shop" --contributor nova-chen --md

# Get random photos
npx okslop random "nature" --count 3

# Browse by contributor
npx okslop photos --contributor bento-knolling --json

# Full help
npx okslop --help
```

## How It Works

Claude Code skills are markdown files with YAML frontmatter that teach Claude new capabilities. When you ask for an image, Claude reads the skill instructions and uses the `okslop` CLI to search or generate what you need.

The skill file lives at `.claude/skills/okslop/SKILL.md` and is automatically discovered by Claude Code.

## Also Available

- **[okslop](https://www.npmjs.com/package/okslop)** — TypeScript SDK + CLI + React components
- **[okslop-mcp-server](https://www.npmjs.com/package/okslop-mcp-server)** — MCP server for tool-calling agents (Claude Desktop, Cursor)
- **[API Docs](https://okslop.com/developers/docs)** — Full REST API reference

## License

MIT
