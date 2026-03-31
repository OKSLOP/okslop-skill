---
name: okslop
description: Find or generate stock images using OKSLOP — search the library, generate from prompts, and save images locally via the CLI
allowed-tools: Bash(npx okslop *), Bash(curl *), Read, Write
---

## When to Use

Use this skill whenever you need a stock image or want to generate one. Common triggers:
- Writing blog posts, docs, or READMEs that need images
- Building UI that requires placeholder or production images
- Creating marketing content, landing pages, or social assets
- Any task where the user asks for "a photo of...", "an image for...", or "stock image"

## Step 0: Check Environment

Verify the CLI is available:

```bash
npx okslop --help
```

**API key** (optional): Set `OKSLOP_ACCESS_KEY` for higher rate limits and required for generative tasks (embed). Without a key, search still works (30 req/min, 500/day anonymous).

```bash
# Check if key is set
echo ${OKSLOP_ACCESS_KEY:+"API key is configured"}
```

If the user needs a key, direct them to: https://okslop.com/developers/register

## Step 1: Decide — Search or Generate

**Search** when you need a general-purpose image and can accept what's in the library:
- Fast, no API key required
- Millions of pre-generated photos available
- Best for common subjects (nature, business, food, tech, people, etc.)

**Generate (embed)** when you need a specific image that may not exist:
- Requires `OKSLOP_ACCESS_KEY`
- Deterministic: same prompt + contributor + seed = same image URL forever
- Best for precise creative direction, branded content, or niche subjects
- URL works immediately (placeholder while generating, final image when ready)

## Step 2: Search for Images

```bash
# Basic search — returns formatted text
npx okslop search "mountain sunset" -n 5

# JSON output — best for parsing in scripts or code
npx okslop search "home office workspace" -n 5 --json

# Markdown output — ready to paste into docs
npx okslop search "abstract gradient background" -n 3 --md

# Filter by orientation
npx okslop search "team meeting" -n 5 -o landscape --json

# Browse by contributor style
npx okslop photos --contributor nova-chen -n 10 --json
```

### Parsing JSON Results

The `--json` flag returns an object with `results[]`. Key fields per photo:
- `id` — unique photo ID
- `description` / `alt_description` — use as alt text
- `urls.small` (800px), `urls.thumb` (400px), `urls.full` (2000px)
- `user.name`, `user.username` — contributor credit
- `tags[].title` — searchable keywords
- `links.html` — link to photo page on okslop.com

### Image URL Patterns

Once you have a photo `id`, construct URLs directly:
- Preview (800px): `https://okslop.com/img/{id}/preview`
- Full (2000px): `https://okslop.com/img/{id}/full`
- Thumb (400px): `https://okslop.com/img/{id}/thumb`

## Step 3: Generate Custom Images (Embed)

Generate a deterministic image from a text prompt. Requires an API key.

```bash
# Generate and get the image URL
npx okslop embed "cozy coffee shop with morning light" --contributor nova-chen

# With orientation and seed
npx okslop embed "aerial view of autumn forest" -a nova-chen -o landscape -s 2

# Markdown output (ready for docs/blog)
npx okslop embed "minimalist desk setup with plant" -a bento-knolling --md
# → ![minimalist desk setup with plant](https://api.okslop.com/api/v1/embed/emb_.../img?variant=preview)

# JSON output (for programmatic use)
npx okslop embed "sunset over ocean" -a happy-salad --json
```

### Contributor Styles

Pick a contributor whose aesthetic matches your needs:

| Slug | Style |
|------|-------|
| `nova-chen` | Clean tech, minimal, professional |
| `bento-knolling` | Overhead flat-lays, organized grids |
| `street-portrait-tokyo` | Urban candid, neon, Tokyo nights |
| `happy-salad` | Warm wellness, cottage-core, nature |
| `crt-cathedral` | 90s nostalgia, CRT monitors, retro tech |
| `lifeprint-cyanotype-body` | Artistic cyanotypes, botanical prints |

Browse all contributors at: https://okslop.com/contributors

### Embed Options

| Flag | Short | Description |
|------|-------|-------------|
| `--contributor` | `-a` | Contributor slug (required) |
| `--orientation` | `-o` | `landscape`, `portrait`, or `square` |
| `--seed` | `-s` | Seed for variation (default: 1) |
| `--variant` | `-v` | `thumb`, `preview`, `full`, or `original` |
| `--json` | | Output raw JSON |
| `--md` | | Output markdown image syntax |

## Step 4: Save Images Locally

To download an image to the local filesystem, use `curl` with the image URL:

```bash
# Save a search result locally
npx okslop search "mountain" -n 1 --json | node -e "
  const d = JSON.parse(require('fs').readFileSync(0,'utf8'));
  const url = d.results[0]?.urls.full;
  if (url) console.log(url);
" | xargs -I {} curl -sL -o ./mountain.webp "{}"

# Or more simply — get the URL first, then download:
# 1. Search and pick an image
npx okslop search "sunset beach" -n 3 --json
# 2. Download using the URL from results
curl -sL -o ./images/sunset.webp "https://okslop.com/img/PHOTO_ID/full"

# Save a generated embed image locally
npx okslop embed "cozy reading nook" -a nova-chen --json | node -e "
  const d = JSON.parse(require('fs').readFileSync(0,'utf8'));
  console.log(d.url);
" | xargs -I {} curl -sL -o ./reading-nook.webp "{}"
```

### Download Patterns

For projects that need images committed to the repo or bundled locally:

1. **Single image**: `curl -sL -o ./path/to/image.webp "URL"`
2. **Batch download**: Loop over JSON results and download each
3. **Deterministic naming**: Use the photo `id` as filename: `curl -sL -o ./{id}.webp "URL"`

Images are served as WebP. All variants are available:
- `thumb` — 400px, smallest, good for thumbnails
- `preview` / `small` — 800px, good for content
- `full` — 2000px, good for hero images and print
- `original` — full resolution

## Step 5: Insert into Content

### Blog Post Frontmatter
```yaml
coverPhotoId: {id}
coverCredit:
  name: {user.name}
  slug: {user.username}
```

### Markdown
```markdown
![Description](https://okslop.com/img/{id}/preview)
```

### HTML
```html
<img src="https://okslop.com/img/{id}/preview" alt="Description" />
```

### React / JSX
```tsx
<img src={`https://okslop.com/img/${id}/preview`} alt="Description" />
```

## Reference

Full CLI help:
```bash
npx okslop --help
npx okslop search --help
npx okslop embed --help
```

- **SDK docs**: https://okslop.com/developers/docs
- **API key**: https://okslop.com/developers/register
- **All contributors**: https://okslop.com/contributors
- **MCP server** (for tool-calling agents): `npx okslop-mcp-server`
- **License**: No attribution required. See https://okslop.com/license

Image: $ARGUMENTS
