# Git hooks (BrushPast)

This repo only allows commits and pushes when local git identity is:

- **Email:** `angel4o2003@abv.bg`

Hooks are enabled via `core.hooksPath = .githooks` (set in local git config after clone).

If hooks do not run after clone:

```bash
git config --local core.hooksPath .githooks
git config --local user.email angel4o2003@abv.bg
git config --local user.name "Your Name"
```
