Goal: Recreate ythebrokers.com structure and UX with improvements.
Do:
1) Pages: /, /projects (filters: Residential/Commercial/Coastal), /projects/[slug], /about, /careers, /contact, /login.
2) Components: header with EN/AR toggle (RTL for AR), hero with search, featured grids, project cards, inquiry form.
3) i18n: next-i18next with en/ar namespaces; persist language; flip dir for ar.
4) Backend (Manifest): entities Project, Inquiry, Agent; pagination and category filters; seed 6 demo projects.
5) Wire frontend with SWR; handle loading and error states.
6) SEO and a11y basics; responsive Tailwind.
7) Commit, push, deploy backend, then frontend to Vercel; return live URLs.
Constraints: TypeScript, App Router, no SSR/client mismatch.
