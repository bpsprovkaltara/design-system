<!--
Source copy: ~/Projects/.github/pull_request_template.md (TESTING.md §8).
Repos copy this file to their own .github/. Fill every section. Write
"n/a" with a reason instead of deleting a section.
-->

## Summary

<!-- What changed and why, in two or three sentences. -->

## Linked issue

<!-- "Refs #N" for partial work, "Closes #N" only when the owner agreed. -->

## Ladder tier

<!-- quick | standard | complex | high-risk (TESTING.md §6), and why. -->

## Commands run

<!-- Each command with its result: pass/fail counts, coverage numbers. -->

| Command | Result |
|---|---|
| <!-- e.g. `bun run check` or `uv run pytest` --> | <!-- e.g. 212 passed --> |

## Negative or red proof

<!--
Red proof (bug fix): the test failing without the fix, with log or CI link.
Negative proof (new or changed gate): the gate failing on purpose, with
log or CI link (TESTING.md §0).
-->

## Verify evidence

<!-- Path under test-results/verify/<feature-id>/ and the features driven
(TESTING.md §5d). Required for complex and high-risk tiers. -->

## Screenshots (UI)

<!-- Before and after, for any visible UI change. -->

## Risk and rollback

<!-- What could break, who is affected, and how to undo it. -->

## Not verified

<!-- Everything you did not check, and why. "Nothing" needs a reason too. -->
