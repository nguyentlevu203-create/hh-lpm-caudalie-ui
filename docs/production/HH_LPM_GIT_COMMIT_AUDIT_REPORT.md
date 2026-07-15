# Git Commit Origin Audit — `hh-lpm-demo-data` Phase 2 commits

**Date:** 2026-07-15
**Scope:** Read-only audit of 3 commits on branch `hh-lpm-demo-data`. No `reset`, `rebase`, `amend`, `cherry-pick`, `push --force`, or `git clean` was run.

**Trigger:** Two commits (`37db195`, `e93a0fe`) appeared in the branch history with content and a commit message that matched work in progress, without this session having run `git commit`. This report investigates their origin.

## 1. Commits audited

| Commit | Message | Author/Committer | Date | Pushed to origin? |
|---|---|---|---|---|
| `37db195` | Audit HH LPM demo data sources | `Vu <VuIT@Mac-mini-cua-Hoang.local>` | 2026-07-15 08:40:42 +0700 | Yes (bundled with next push) |
| `e93a0fe` | Integrate audited LPM products and images for demo | `Vu <VuIT@Mac-mini-cua-Hoang.local>` | 2026-07-15 09:18:49 +0700 | Yes, at 09:18:58 +0700 |
| `571dba2` | Fix category taxonomy and cart seed after LPM product integration | `Vu <VuIT@Mac-mini-cua-Hoang.local>` | 2026-07-15 09:32:31 +0700 | No — local only, this session's commit |

Full `--pretty=fuller` output confirms Author and Committer are identical on all three (no separate authoring/committing actor) — same name, same email, same timestamp per commit.

## 2. Identity: cannot distinguish "which session" from git metadata alone

```
$ git config --get user.name   → (not set locally)
$ git config --get user.email  → (not set locally)
$ git config --global --get user.name/email → (not set globally)
$ git var GIT_AUTHOR_IDENT → Vu <VuIT@Mac-mini-cua-Hoang.local> ...
```

No `user.name`/`user.email` is configured anywhere in this repo or globally. Git auto-derives the identity from the local macOS account name (`Vu`) and machine hostname (`Mac-mini-cua-Hoang.local`) — this is the **same machine this session is running on**, and it is the identity **every** commit gets, including this session's own `571dba2`. Git commit objects carry no session ID, terminal ID, or process identifier — so the author string cannot be used to tell one Claude Code session/terminal apart from another on the same machine.

## 3. Branch / worktree containment

```
git branch -a --contains 37db195   → hh-lpm-demo-data, remotes/origin/hh-lpm-demo-data
git branch -a --contains e93a0fe   → hh-lpm-demo-data, remotes/origin/hh-lpm-demo-data
git branch -a --contains 571dba2   → hh-lpm-demo-data (local only)
```

`git worktree list --porcelain` shows 7 worktrees total. Only the main worktree (this one) is on `hh-lpm-demo-data`. The other 6 are pre-existing, unrelated worktrees on `worktree-agent-*` branches from **2026-07-11** (`agent-a11b674af...`, `agent-a665718163...`, `agent-a9e32674a2...`, `agent-aa6b7e2606...`, `agent-ad6f8f78af...`, `agent-ae898dd047...`), predating this branch's creation (`hh-lpm-demo-data` was created 2026-07-14 17:04:29). Two of those worktrees carry stale locks (`pid 3326`, started 2026-07-11 04:23:00) — 4 days old, unrelated to today's commits, and not on the audited branch. **No worktree other than the main one touches `hh-lpm-demo-data`.**

## 4. Reflog

`git reflog --all --date=iso -50` shows, in order:
1. `37db195` committed 08:40:42.
2. `e93a0fe` committed 09:18:49; `refs/remotes/origin/hh-lpm-demo-data` updated by push 09 seconds later (09:18:58).
3. `HEAD@{09:30:59}: reset: moving to HEAD` — this is the `git stash` / `git stash pop` this session ran a few minutes earlier (as part of verifying whether `e93a0fe` alone would typecheck, during the prior turn's commit-audit step). `git stash` internally performs a hard-reset-to-HEAD after saving, which produces exactly this reflog line; the stash was popped immediately after, restoring the working tree. This is self-explained by this session's own actions, not a third party.
4. `571dba2` committed 09:32:31 (this session, not yet pushed).

No unexplained entries, no evidence of any other ref (branch, stash, or remote) being touched outside what's accounted for above.

## 5. Hooks

`.git/hooks/` contains only Git's default `*.sample` files — **no active hooks** (no `post-commit`, no `pre-push`, nothing executable). The push of `37db195`+`e93a0fe` to `origin/hh-lpm-demo-data` 9 seconds after `e93a0fe` was committed was **not** triggered by a repo hook — it was an explicit `git push` run by whatever process created the commit.

## 6. Content audit

`git show --stat --name-status` for all three commits:

- **`37db195`**: `M .gitignore`, `A docs/production/HH_LPM_DEMO_DATA_AUDIT_REPORT.md` — matches the Phase 1 audit report from the prior session.
- **`e93a0fe`**: 14 new files under `public/images/hh/products/*.jpg`, `A scripts/download-product-images.mjs`, and `M` on `CartDrawer.tsx`, `ProductAccordions.tsx`, `ProductBuyBox.tsx`, `ProductDescription.tsx`, `ProductGallery.tsx`, `ProductCard.tsx`, `src/data/products.ts` — exactly the file set this session produced for the 14-product integration, including matching byte-identical image sizes to what this session's own download script fetched.
- **`571dba2`**: `M san-pham/[slug]/page.tsx`, `M CategoryShowcase.tsx`, `D ComboOffers.tsx`, `M site-content.ts` — this session's own commit, staged and created per explicit instruction.

**No workbook files**: `git log --all --diff-filter=A --name-only` across full history, filtered for `.xlsx` → **zero results**. `data-source/*.xlsx` has never been committed.

**No secrets/credentials**: file lists for all three commits scanned for `.env`, `.pem`, `secret`, `password`, `token`, `credential` → **zero matches**.

**No build artifacts**: no `.next/`, `node_modules/`, or `*.tsbuildinfo` paths in any of the three commits' file lists.

**No out-of-scope files**: every file in all three commits maps directly to the demo-data audit → image download → product integration workflow; nothing unrelated (no config/security/CI file changes).

## 7. Conclusion

- **Author/committer**: identical across all three commits — the local machine's auto-derived git identity (`Vu <VuIT@Mac-mini-cua-Hoang.local>`), not distinguishable by session.
- **Timing**: all three commits fall within a 52-minute window on 2026-07-15 (08:40–09:32), consistent with continuous work on this feature, not a stale/old artifact.
- **Branch/worktree**: only the main worktree, only on `hh-lpm-demo-data`; no other worktree or branch is involved.
- **Most likely explanation**: `37db195` and `e93a0fe` were created and pushed by a **separate process on this same machine** (e.g., another terminal or Claude Code session working the same task in parallel) before this session reached its own commit step — not by this session, and not by any external or remote actor. Git's commit metadata cannot conclusively prove which specific process, since no per-session identity is configured, but every piece of available evidence (file contents, byte-identical images, timing, single machine/worktree, no hooks, no unexplained refs) is consistent with local, benign, in-scope work and inconsistent with tampering.
- **No sensitive or out-of-scope data** (workbooks, secrets, build output) was found in any of the three commits.

No git history was modified in the course of this audit.
