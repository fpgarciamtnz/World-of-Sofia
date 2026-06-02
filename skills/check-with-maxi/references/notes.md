# Maxi Context Dependency

Use these exact local paths:

- Maxi context root: `C:\Users\garqu\OneDrive\COdex\Maxi-context`
- First file to read: `C:\Users\garqu\OneDrive\COdex\Maxi-context\SOFIA-HANDOFF.md`

Recommended exploration commands on Windows:

```powershell
Test-Path -LiteralPath 'C:\Users\garqu\OneDrive\COdex\Maxi-context\SOFIA-HANDOFF.md'
rg --files 'C:\Users\garqu\OneDrive\COdex\Maxi-context'
rg -n '<term>' 'C:\Users\garqu\OneDrive\COdex\Maxi-context'
```

Do not mutate this folder during a Maxi check unless the user explicitly asks to update Maxi context.
