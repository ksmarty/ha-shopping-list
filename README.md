# ha-shopping-list

> ⚠️ **WORK IN PROGRESS — JUST A SHOPPING LIST**

A custom Home Assistant card for the built-in
[Shopping List](https://www.home-assistant.io/integrations/shopping_list/) integration.

## Status

Early scaffolding. Not ready for use yet.

## Development

```bash
npm install
npm run dev    # builds, watches, and serves the dev harness
```

Then open <http://localhost:5173/dev/> in your browser.

Or run the pieces individually:

```bash
npm run watch  # rebuild on change → dist/ha-shopping-list-card.js
npm run serve  # static dev server (project root) on :5173
```

The dev harness (`dev/index.html`) loads the built card with a mock `hass`
object so you can iterate on the card without running Home Assistant.

### Built bundle is committed

While the project is in early development, the production bundle
`dist/ha-shopping-list-card.js` **is committed to git** so HACS can install
the card directly from the default branch (no GitHub Releases needed yet).

Workflow when you change source code:

```bash
# 1. Make your changes in src/
npm run build        # regenerate dist/ha-shopping-list-card.js
git add src/ dist/
git commit -m "..."
git push
```

The pre-push hook will rebuild and verify `dist/` matches `HEAD` — if you
forgot to commit the rebuilt bundle, the push is aborted with instructions.

### Git hooks

`npm install` automatically installs Git hooks (via
[`simple-git-hooks`](https://github.com/toplenboren/simple-git-hooks)):

| Hook | Runs | When |
| ---- | ---- | ---- |
| `pre-commit` | `tsc --noEmit` + `prettier --check` | every `git commit` |
| `pre-push` | `scripts/check-dist.sh` (rebuild + verify dist matches HEAD) | every `git push` |

Auto-fix formatting with `npm run format`. To bypass in an emergency:
`git commit --no-verify` / `git push --no-verify`.

## License

MIT
