# Postguy

Postguy is a self-hosted social publishing app based on the [Postiz application](https://github.com/gitroomhq/postiz-app). It keeps the upstream application’s broad feature set and adds an original Postguy identity. The upstream baseline in this checkout is `e454b8b5962c819a1a22b9e2cc3d378c29b19345`.

Postguy is an early build. The app, privacy page and terms page are in this checkout, but no public service, provider apps or API credentials have been configured. A provider can appear in the app while still requiring its own developer app, scopes, review and authorized social account.

## What the source includes

- Organizations, team access, invitations and settings.
- A multi-channel composer with drafts, per-channel copy, previews, validation, media and platform settings.
- Calendar and list publishing workflows for drafts, scheduled posts, queues and publishing outcomes.
- Media library, channel groups, reusable sets, posting times, signatures and approvals.
- Analytics for metrics supported by each connected platform.
- RSS automation, repost/comment plugs, webhooks, public API, developer OAuth apps, CLI and MCP/agent integrations.
- Optional AI generation, image/video processing, clipping and media editing, each requiring its own provider setup and potentially incurring usage costs.
- 35 enabled social-provider implementations at the pinned upstream commit. Availability depends on each platform's rules and the keys configured on the instance.

The complete source and status inventory is in [`docs/postguy/BASELINE_AUDIT.md`](docs/postguy/BASELINE_AUDIT.md). Provider scopes, callback URLs, cost and review work are recorded in [`docs/postguy/PROVIDER_MATRIX.md`](docs/postguy/PROVIDER_MATRIX.md) as that research is completed.

## Self-host deployment

The source is a pnpm monorepo. The frontend is Next.js, the API is NestJS, and scheduled/background work uses Temporal. PostgreSQL and Redis are required. The Docker Compose stack also provides the Temporal database and visibility services and persistent local uploads. Object storage, email, analytics, AI, video processing and social-provider APIs are optional integrations.

Use the [upstream self-hosting documentation](https://docs.postiz.com/self-host) and inspect `docker-compose.yaml` and `.env.example` before deployment. The checked-in Compose file contains example credentials; do not use those values on a public server. Generate a private `JWT_SECRET`, configure real service URLs, persist and back up the database and uploads, and keep production credentials in the deployment secret store. Do not configure `postguy.ai`; that domain is not registered or confirmed.

No paid hosting or API service is included. External providers may have their own fees, quotas and reviews. X is excluded from the free provider setup until a current official no-cost route is verified.

## License and source provenance

The application remains under the [GNU Affero General Public License v3 or later](LICENSE). This is a modified version of [gitroomhq/postiz-app](https://github.com/gitroomhq/postiz-app), pinned above. If Postguy is made available over a network, users of that version must be given access to its corresponding modified source as required by the AGPL. The modified source is published at https://github.com/ReeceHarding/postguy-app; the application’s Source & License page links here and to the upstream provenance.
