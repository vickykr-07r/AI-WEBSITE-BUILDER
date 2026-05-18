# Fix Incomplete Website Generation

**Previous (Auth Fixed):**
- [x] .env.example, openRouter.js logging ✓

**New Issue: Incomplete/Bad Generation**
## Plan Steps:
- [ ] Step 1: Fix Server/Utils/extractjson.js (parsing bugs)
- [ ] Step 2: Improve website.controller.js (more retries, log raw, prompt fix)
- [ ] Step 3: Update openRouter.js model to better JSON model (Claude 3.5 Sonnet)
- [ ] Step 4: Restart server `cd Server && npm run dev`
- [ ] Step 5: Test Generate → check console raw/log

Progress: 
- [x] Step 1: Fixed Server/Utils/extractjson.js ✓ (robust brace-balanced parsing + fallbacks + logs raw on fail)

Remaining:
- [ ] Step 2: Improve website.controller.js (retries, log raw, prompt)
- [ ] Step 3: Better AI model
- [ ] Step 4: Restart + test

