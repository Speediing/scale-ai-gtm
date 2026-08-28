# Scale AI x SpaceXAI

Passworded customer leave-behind for Scale AI. The site follows three SpaceXAI agents as they prepare for a meeting, support a live call, and draft the follow-up.

## Stack

- Next.js 15.5 App Router
- React 19
- Geist
- vGPU and WGSL
- TypeScript
- Tailwind CSS 4

Application code lives under `src/`.

## Local development

Set `SITE_PASSWORD` in your shell, then run:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Brand assets

The Scale wordmark is official Scale artwork. Scale publishes logo usage and co-brand guidance at [brand.scale.com/logo](https://brand.scale.com/logo). The compact `× SpaceXAI` treatment stays between 15 and 18 pixels tall.

## Deployment

Deploy to the `jasonwiker` Vercel scope with `SITE_PASSWORD` set in the project environment. The production alias is `scale-ai-grokbot.vercel.app`.
