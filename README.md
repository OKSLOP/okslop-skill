# OKSLOP — Stock Images for Claude Code

[![OKSLOP — Free AI-generated stock photos](https://okslop.com/og-default.jpg)](https://okslop.com)

**Add images to anything you're building — just by asking.**

Install this skill and Claude learns how to find, generate, and insert stock images into your projects. No API knowledge needed. No image editing. Just describe what you want.

> "Add a hero image to my landing page"

Claude searches millions of free AI-generated photos, picks the best match, downloads it, and inserts the right code. Done.

## Examples

Just talk to Claude like you normally would:

| What you say | What happens |
|---|---|
| "I need a cover photo for this blog post" | Claude searches for a matching image and adds it to your frontmatter |
| "Add some product photos to the pricing page" | Claude finds relevant images and inserts them as `<img>` tags |
| "Generate a flat-lay image of desk accessories" | Claude creates a custom image from your description |
| "Find me 5 options for a nature background" | Claude shows you choices and lets you pick |
| "This README needs a header image" | Claude finds something fitting and adds the markdown |
| "Replace the placeholder with a real photo" | Claude swaps in an actual stock image |

You don't need to learn any commands. Claude handles the technical details.

## Install

```bash
npx skill install OKSLOP/okslop-skill
```

That's it. Works with Claude Code and any agent that supports the skill protocol.

<details>
<summary>Other install methods</summary>

**Claude Code slash command:**

```
/install-skill https://github.com/OKSLOP/okslop-skill
```

**Plugin marketplace:**

```
/plugin marketplace add OKSLOP/claude-plugins
/plugin install okslop@OKSLOP-claude-plugins
```

**Manual:**

```bash
git clone https://github.com/OKSLOP/okslop-skill.git
cp -r okslop-skill/.claude/skills/okslop .claude/skills/
```

</details>

## What you get

- **Millions of free images** — AI-generated stock photos covering every topic. No attribution required, no licensing fees.
- **Custom image generation** — Describe exactly what you need and get a unique image created on the fly.
- **Automatic insertion** — Claude adds the right markup (Markdown, HTML, JSX) wherever it belongs in your code.
- **Multiple art styles** — Choose from contributor styles ranging from clean tech to retro nostalgia to warm cottage-core.

## Art styles

Every image comes from a contributor with a distinct aesthetic. You can ask Claude for a specific style or let it choose:

| Style | Ask for it like... |
|---|---|
| Clean, minimal, professional | "something clean and modern" |
| Overhead flat-lays, organized grids | "a flat-lay photo" or "bento style" |
| Urban, neon, street photography | "something urban and moody" |
| Warm, cozy, nature-focused | "warm and inviting" or "cottage-core" |
| 90s retro, CRT monitors | "retro tech vibes" |
| Artistic, botanical prints | "something artistic and organic" |

Browse all styles at [okslop.com/contributors](https://okslop.com/contributors)

## Do I need an API key?

**Not to get started.** Searching images works immediately with no key.

To generate *custom* images from text prompts, grab a free key at [okslop.com/developers/register](https://okslop.com/developers/register) and set it:

```bash
export OKSLOP_ACCESS_KEY=your_key_here
```

| | Search images | Generate custom images | Rate limit |
|---|---|---|---|
| **No key** | Yes | — | 30/min, 500/day |
| **Free key** | Yes | Yes | 30/min, 1,000/day |
| **Pro key** | Yes | Yes | 100/min, 10,000/day |

## How it works

When you ask for an image, Claude:

1. Reads the skill instructions (a markdown file in your project)
2. Decides whether to search existing images or generate a new one
3. Uses the `okslop` CLI under the hood (`npx okslop`) — you never need to run this yourself
4. Downloads the image and inserts the right code into your file

Skills are how Claude Code learns new capabilities. This one teaches it everything about stock images so you don't have to think about it.

<details>
<summary>CLI reference (advanced)</summary>

If you want to use the CLI directly:

```bash
# Search for images
npx okslop search "mountain sunset" -n 5

# Generate from a prompt
npx okslop embed "cozy coffee shop" --contributor nova-chen --md

# Get random photos
npx okslop random "nature" --count 3

# Full help
npx okslop --help
```

</details>

## Also available

Not using Claude Code? OKSLOP works everywhere:

- **[React component](https://www.npmjs.com/package/okslop)** — Drop-in image picker for React apps
- **[MCP server](https://www.npmjs.com/package/okslop-mcp-server)** — For Claude Desktop, Cursor, Windsurf, and other AI tools
- **[REST API](https://okslop.com/developers/docs)** — Build your own integration

## License

MIT — Free to use in any project. Images require no attribution.
