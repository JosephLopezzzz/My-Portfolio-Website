# Portfolio improvement roadmap

The portfolio should help a client understand what Joseph can build, see evidence, and make contact quickly. Keep project claims tied to source code, public previews, or supplied credentials.

## Completed in this working copy

- Put a direct project inquiry and selected work in the hero.
- Place projects before services, process, and background details.
- Add a clear list of project types and a proposed collaboration process without implying prior client engagements.
- Clarify project scope and whether a public preview or only source is linked.
- Remove the unsupported 24-hour response promise and the personal Facebook link from the contact area.
- Reduce decorative motion in the page shell and hero.
- Keep Gemini credentials server-side and exclude common local secret files from Git.
- Add continuous checks for lint, the existing test suite, and the production build.

## Follow-up before publishing

1. **Resume privacy:** the public download includes a phone number. Decide whether you want that number visible to anyone who opens the portfolio; email is already available as the main contact route. The other tracked resume PDF has different content and should not replace it without an up-to-date source.
2. **Project proof:** capture short, real walkthroughs from the actual running projects. The existing repository images are static previews and do not demonstrate every workflow.
3. **Role confirmation:** confirm the exact individual/team contribution on the HR and microfinance capstone projects before adding more detailed case-study claims.
4. **Repository cleanup:** review the old `src1/`, root `profile/`, `certs/`, and `resume/` copies. They are tracked but not used by the current Vite site; removing them from the current tree would not erase them from Git history.
5. **Public repository curation:** add concise descriptions and focused READMEs to the selected project repositories, and verify any demo links before featuring them.
6. **Publish and recheck:** after reviewing the local diff, push the changes, wait for CI and deployment, then recheck the live site at mobile and desktop widths.

## Deferred

Do not add parallax, particle backgrounds, cursor effects, fake counters, or skill bars as a substitute for project evidence. Revisit motion only when it makes a real interaction easier to understand.
