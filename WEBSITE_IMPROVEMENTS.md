# Portfolio improvement roadmap

The portfolio should help a client understand what Joseph can build, see evidence, and make contact quickly. Keep project claims tied to source code, public previews, or supplied credentials.

## Completed in this working copy

- Restored the original glass navbar, motion background, portrait interaction, typewriter heading, and original content sections.
- Kept a direct project inquiry, availability line, client-oriented workflow copy, and selected-work path in the original hero composition.
- Preserved the original section order and inserted Services and Process after Projects.
- Restored the original project, skills marquee, certificate timeline, and interactive contact treatments.
- Add a clear list of project types and a proposed collaboration process without implying prior client engagements.
- Clarified project scope and whether a public preview or only source is linked.
- Restored the original contact-card styling with professional GitHub and LinkedIn links, replaced the unsupported reply promise, and kept clipboard feedback reliable.
- Kept Gemini credentials server-side and excluded common local secret files from Git.
- Added continuous checks for lint, the existing test suite, and the production build.

## Follow-up before publishing

1. **Resume privacy:** the public download includes a phone number. Decide whether you want that number visible to anyone who opens the portfolio; email is already available as the main contact route. The other tracked resume PDF has different content and should not replace it without an up-to-date source.
2. **Project proof:** capture short, real walkthroughs from the actual running projects. The existing repository images are static previews and do not demonstrate every workflow.
3. **Role confirmation:** confirm the exact individual/team contribution on the HR and microfinance school projects before adding more detailed case-study claims.
4. **Repository cleanup:** review the ignored legacy `src1/`, root `profile/`, `certs/`, and `resume/` copies. They remain in local history/files but are excluded from the current Git tree; the public site assets live under `public/`.
5. **Public repository curation:** add concise descriptions and focused READMEs to the selected project repositories, and verify any demo links before featuring them.
6. **Publish and recheck:** after reviewing the local diff, push the changes, wait for CI and deployment, then recheck the live site at mobile and desktop widths.

## Deferred

Keep the established motion system and tune it only when browser checks identify an accessibility or performance issue. Prioritize real project walkthroughs over adding more effects.
