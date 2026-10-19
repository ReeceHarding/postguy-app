# Postguy baseline audit

**Audit date:** 2026-10-19
**Upstream:** `https://github.com/gitroomhq/postiz-app`
**Pinned baseline:** `e454b8b5962c819a1a22b9e2cc3d378c29b19345`
**License:** AGPL-3.0-or-later, retained in the root `LICENSE` file.

This is a source audit of the pinned checkout, not a claim that the app has been launched or every workflow has been exercised. All rows marked “implemented in source” still need real UI verification after a self-hosted instance is available. No provider credentials have been added.

## Product and deployment shape

- Frontend: Next.js application under `apps/frontend/`.
- API: NestJS under `apps/backend/`.
- Scheduled/background jobs: Temporal workers under `apps/orchestrator/`.
- Shared data and provider logic: `libraries/nestjs-libraries/`, Prisma/PostgreSQL schema at `libraries/nestjs-libraries/src/database/prisma/schema.prisma`.
- Local development uses `pnpm` workspaces; deployment supports Docker images/Compose. Compose includes the Postiz app, PostgreSQL 17, Redis 7.2, Temporal, Temporal PostgreSQL, Elasticsearch for Temporal visibility, and optional Sentry Spotlight.
- Core deployment configuration includes PostgreSQL, Redis, `JWT_SECRET`, public frontend/backend URLs, internal backend URL, Temporal address/namespace, and persistent upload/config volumes. Local storage can be used. Cloudflare R2 is optional for persistent object storage and media flows that require it.
- Email is optional; the source supports Resend and Nodemailer. OAuth account activation depends on email configuration.
- Optional integrations include platform OAuth apps, AI providers, media normalization/clipping providers, short-link providers, analytics/monitoring, payment, and media editor credentials. Costs are provider-specific and may be usage-based. No paid services are configured by this audit.
- Required callback URLs cannot be made production-ready until a public staging hostname is assigned. `postguy.ai` is intentionally not configured.

## Data inventory for legal drafting

Observed in source and schema:

- Account data: email, name, provider identity, profile image reference, timezone, activation and notification preferences; organization/workspace membership and roles; invitation and usage metadata.
- Connected-channel records: provider identifier, provider account IDs/names, profile image references, settings, access/refresh credentials and expiry-related state. Credential fields are encrypted/decrypted by `AuthService.fixedEncryption` using a key derived from `JWT_SECRET`; this is legacy AES-256-CBC encryption, so the operator must protect and back up `JWT_SECRET`.
- Publishing content: draft/scheduled post text, per-channel settings, tags, status, provider post IDs/URLs/errors, comments/approval records, media references, thread/comment content, and schedule timestamps.
- Media: uploaded files, thumbnails and related metadata. Storage can be local filesystem or configured object storage. The app also supports configured remote-media sources, provider-side uploads, and optional media processing/clipping.
- Organization configuration: channels, custom groups/sets, signatures, posting time slots, RSS/autopost rules, plugs, webhooks, developer OAuth apps, API keys and analytics data.
- Authentication uses JWT-backed cookies; language and some feature state use cookies. The app may set analytics/attribution cookies when corresponding optional tracking integrations are configured.
- Server and request logs are produced by the app and infrastructure. Optional Sentry, PostHog, Plausible, Datafast, Google Tag Manager, Facebook Pixel and Spotlight integrations can send telemetry when configured. These are unset in the reviewed sample configuration; deployment state must be checked before claiming that telemetry is disabled.
- Publishing necessarily sends selected content, media and account authorization to the chosen social platform. Optional features can additionally send prompts/content/media or derived data to configured AI, search, voice, video, image, email, storage, short-link or monitoring providers.

This inventory describes code paths/configurable integrations, not runtime traffic or retention on a future deployment. Operators control the instance, its database, logs, storage and retention. The project does not specify one universal deletion/retention schedule.

## Feature inventory

| Capability | Source locations / UI | Dependencies and credentials | Cost / restriction status | Evidence at baseline |
| --- | --- | --- | --- | --- |
| Signup, login, activation, password reset, OAuth login | `apps/frontend/src/app/(app)/auth/`; `apps/backend/src/api/routes/auth.controller.ts`; auth providers under `apps/backend/src/services/auth/providers/` | PostgreSQL, JWT secret; optional Google/GitHub/Apple/Farcaster or generic OIDC credentials; optional email provider | Infrastructure and email-provider costs depend on deployment; social sign-in credentials optional | Implemented in source; not yet exercised in a running instance |
| Organizations, users, team roles, invitations, settings | `libraries/nestjs-libraries/src/database/prisma/schema.prisma`; `apps/frontend/src/app/(app)/(site)/settings/`; settings/user routes | PostgreSQL; email for invitations/notifications | No upstream hosted plan is needed for the self-hosted source; email delivery may cost | Implemented in source; not yet exercised |
| Social channel connections, multiple accounts, reconnect/disconnect/delete, credential refresh | `apps/frontend/src/components/launches/add.provider.component.tsx`; `apps/backend/src/api/routes/integrations.controller.ts`; `no.auth.integrations.controller.ts`; `libraries/nestjs-libraries/src/integrations/` | Platform-specific developer apps where required; user authorization/account credentials; instance URL for self-hosted endpoints | Platform terms, review and quota restrictions vary; see provider matrix | 35 enabled provider implementations at baseline; no credentials configured |
| Channel settings, groups/clients, reusable sets, posting-time slots, signatures | `apps/frontend/src/components/launches/`; `components/sets/`; `components/signature.tsx`; settings routes; Prisma `Integration`, `Customer`, `Sets`, `Signatures` | PostgreSQL; connected channel for platform-specific options | No separate upstream hosted service is required | Implemented in source; not yet exercised |
| Drafts, composer, global and per-channel copy, previews, validation, limits, mentions and hashtags | `apps/frontend/src/components/new-launch/editor.tsx`; `components/preview/`; `libraries/nestjs-libraries/src/dtos/posts/`; provider rules | PostgreSQL, Redis, provider metadata/credentials | Provider format and API rules apply | Implemented in source; not yet exercised |
| Images/videos, multiple media, thumbnails, alt text, polls, carousels and platform-specific formats | `apps/frontend/src/components/new-launch/`; `libraries/nestjs-libraries/src/database/prisma/media/`; provider DTOs | Upload storage; optional R2/processing services; platform-specific size/format rules | Storage, processing and platform limits vary; optional processing may be metered | Source paths and UI present; actual upload flow not yet exercised |
| Media library, imports, design editor, media processing, video clipping | `apps/frontend/src/app/(app)/(site)/media/`; `components/third-parties/`; `components/videos/`; `apps/backend/src/api/routes/{media,clipping}.controller.ts` | Storage; optional Polotno, RunPod, Deepgram, OpenAI, Transloadit, third-party media accounts | Several optional providers are paid or usage-based; disabled until configured | Implemented/configurable in source; not yet exercised |
| AI text/image/video generation, assistant/agent and research tools | `libraries/nestjs-libraries/src/openai/`; `apps/frontend/src/components/{new-launch/generator,agents,videos}/`; `.env.example` AI settings | OpenAI, fal.ai, ElevenLabs, Tavily, KieAI, EvoLink, Transloadit and/or RunPod as specific feature requires | User supplies keys; no free quota assumed; API and compute may incur charges | Source present; provider keys not configured; feature calls unverified |
| Publish now, scheduled posts, queue, recurring/autopost, delay and workflow retries | `apps/orchestrator/src/workflows/`; `apps/orchestrator/src/activities/`; `apps/backend/src/api/routes/posts.controller.ts`; `autopost.controller.ts` | Temporal, PostgreSQL, Redis; channel credentials | Requires continuous worker/Temporal service; provider rate limits apply | Implemented in source; not yet exercised |
| Calendar/list views, drag reschedule, queue management, post state/history, retry/edit/delete/duplicate | UI `/launches`; `apps/frontend/src/components/launches/`; post API/repositories/workflows | PostgreSQL, Temporal, Redis | Status finality varies by provider; implementation distinguishes pending workflows from completed responses | Implemented in source; not yet exercised |
| Threads and scheduled comments | composer/provider methods; `ISocialMediaIntegration.comment`; post workflows | Provider support and credentials | Only providers implementing the relevant operation support it | Implemented where provider supports; provider-by-provider verification pending |
| Approvals, comments, previews | `apps/frontend/src/components/preview/`; `Comments`, submitted posts and org schema; post routes | PostgreSQL; team/workspace configuration | No separate external approval service required | Implemented in source; not yet exercised |
| Channel/post analytics | `/analytics`; `apps/frontend/src/components/analytics/`; provider `analytics`/`postAnalytics` methods | Provider app scopes, channel credentials and platform APIs | Metrics/range depend on platform; some developer access may require approval | Implemented for provider-specific metrics; no account scopes configured |
| RSS autopost, internal/global plugs, webhooks, remote media, third-party links | `/plugs`, `/third-party`; `apps/frontend/src/components/autopost/`, `webhooks/`, `third-parties/`; backend routes | PostgreSQL; reachable RSS/remote URLs; optional third-party APIs | RSS support has no separately configured provider fee in this source; linked services may charge or impose restrictions. SSRF protection is enabled by default | Implemented in source; not yet exercised |
| Public API, API keys, SDK, CLI, MCP/agent support, webhooks | `apps/backend/src/public-api/`; `libraries/nestjs-libraries/src/chat/`; `/agents`, `/settings`, developer UI; `apps/commands/`, `apps/sdk/` | Organization API key; externally accessible instance URL for clients; agent keys for some runtime features | No paid aggregator; API quotas and provider limits apply. HubSpot, ChatGPT and other app connections may need separate registration | Source/docs present; not yet exercised |
| Email notifications | `apps/orchestrator/src/workflows/digest.email.workflow.ts`; email service/provider | Optional Resend or SMTP configuration | Delivery provider may charge; unset provider means no configured delivery | Implemented/configurable; not verified |

## Enabled social provider inventory

These are the 35 entries in `socialIntegrationList` at the pinned commit. “Not started” means no Postguy developer app/credential/review evidence has been recorded yet. Provider keys are environment-only; no values are present in this audit.

| Provider | Implementation | Provider credential/config names in repo/docs | Review / current state | Cost / restrictions |
| --- | --- | --- | --- | --- |
| X | `x.provider.ts` | `X_API_KEY`, `X_API_SECRET`, `X_URL` | Not started | Excluded from free configuration unless official pricing confirms no-cost API access |
| LinkedIn profile | `linkedin.provider.ts` | `LINKEDIN_CLIENT_ID`, `LINKEDIN_CLIENT_SECRET` | Not started | OAuth product access/review required for applicable scopes |
| LinkedIn Page | `linkedin.page.provider.ts` | shared LinkedIn app | Not started | Page permissions/review and account/page roles apply |
| Reddit | `reddit.provider.ts` | `REDDIT_CLIENT_ID`, `REDDIT_CLIENT_SECRET` | Not started | Reddit app/API terms, quotas and approval apply |
| Instagram | `instagram.provider.ts` | `FACEBOOK_APP_ID`, `FACEBOOK_APP_SECRET` | Not started | Meta app review/business verification and account eligibility may apply |
| Instagram standalone | `instagram.standalone.provider.ts` | See official Postiz provider docs | Not started | Eligibility and API limitations apply |
| Facebook | `facebook.provider.ts` | `FACEBOOK_APP_ID`, `FACEBOOK_APP_SECRET` | Not started | Meta app review/business verification and page roles may apply |
| Threads | `threads.provider.ts` | `THREADS_APP_ID`, `THREADS_APP_SECRET` | Not started | Meta/Threads app review and account eligibility may apply |
| YouTube | `youtube.provider.ts` | `YOUTUBE_CLIENT_ID`, `YOUTUBE_CLIENT_SECRET` | Not started | Google OAuth verification; quota/publishing restrictions apply |
| Google Business Profile | `gmb.provider.ts` | Shared Google OAuth configuration (verify exact current variables before registration) | Not started | Google project/API enablement and OAuth verification; eligible business profiles required |
| TikTok | `tiktok.provider.ts` | `TIKTOK_CLIENT_ID`, `TIKTOK_CLIENT_SECRET` | Not started | App review and Direct Post audit restrictions may apply |
| TikTok Business | `tiktok.business.provider.ts` | `TIKTOK_BUSINESS_CLIENT_ID`, `TIKTOK_BUSINESS_CLIENT_SECRET` | Not started | Business API access/review required |
| Pinterest | `pinterest.provider.ts` | `PINTEREST_CLIENT_ID`, `PINTEREST_CLIENT_SECRET` | Not started | App review/access tier may limit publishing |
| Dribbble | `dribbble.provider.ts` | `DRIBBBLE_CLIENT_ID`, `DRIBBBLE_CLIENT_SECRET` | Not started | Current API access requirements to verify |
| Discord | `discord.provider.ts` | `DISCORD_CLIENT_ID`, `DISCORD_CLIENT_SECRET`, `DISCORD_BOT_TOKEN_ID` | Not started | Bot installation/server permissions required |
| Slack | `slack.provider.ts` | `SLACK_ID`, `SLACK_SECRET` | Not started | OAuth app, workspace install and scopes required |
| Kick | `kick.provider.ts` | Verify provider docs/source | Not started | Current publishing API eligibility to verify |
| Twitch | `twitch.provider.ts` | Verify provider docs/source | Not started | OAuth scopes and content/API rules apply |
| Mastodon | `mastodon.provider.ts` | `MASTODON_URL`, `MASTODON_CLIENT_ID`, `MASTODON_CLIENT_SECRET` | Not started | Per-instance OAuth app; hosting instance rules apply |
| Bluesky | `bluesky.provider.ts` | User-entered credentials/server details | Not started | User-authenticated; app-password/security rules apply |
| Lemmy | `lemmy.provider.ts` | User-entered instance/account credentials | Not started | Per-instance API and instance rules apply |
| Farcaster | `farcaster.provider.ts` | Neynar variables where configured | Not started | Account/wallet signing; third-party service terms/quotas apply |
| Telegram | `telegram.provider.ts` | Bot token supplied by user | Not started | Bot setup and channel/admin permissions required |
| Nostr | `nostr.provider.ts` | User-supplied signing credentials | Not started | User-managed keys/relays; no central app review known at baseline |
| VK | `vk.provider.ts` | Verify provider docs/source | Not started | API scopes and regional account/access rules apply |
| Medium | `medium.provider.ts` | User-entered integration token | Not started | Availability and current API status to verify |
| Dev.to | `dev.to.provider.ts` | User-entered API key | Not started | User-supplied credential; API terms apply |
| Hashnode | `hashnode.provider.ts` | User-entered API key | Not started | User-supplied credential; API terms apply |
| WordPress | `wordpress.provider.ts` | Site URL and user-supplied credential | Not started | Self-hosted endpoint; instance-specific API/auth required |
| Listmonk | `listmonk.provider.ts` | `LISTMONK_DOMAIN`, `LISTMONK_USER`, `LISTMONK_API_KEY`, `LISTMONK_LIST_ID` | Not started | Self-hosted endpoint and instance-specific auth required |
| Moltbook | `moltbook.provider.ts` | Provider/source flow to verify | Not started | Current API/access terms to verify |
| Whop | `whop.provider.ts` | Provider/source flow to verify | Not started | OAuth/permissions and account eligibility to verify |
| Skool | `skool.provider.ts` | Chrome extension `EXTENSION_ID` and user connection flow | Not started | Browser extension/cookie flow; provider terms and technical limitations apply |
| MeWe | `mewe.provider.ts` | Provider/source flow to verify | Not started | API availability/terms to verify |
| Tumblr | `tumblr.provider.ts` | `TUMBLR_CLIENT_ID`, `TUMBLR_CLIENT_SECRET` | Not started | App registration and OAuth restrictions apply |

Two source files are present but not part of the enabled `socialIntegrationList`: `mastodon.custom.provider.ts` and an alternate/custom Mastodon subclass; they are not counted as available channels.

## Provider access and secret baseline

- Developer apps, platform OAuth clients, API keys, approval requests and channel connections: **not started**.
- Secret-store configuration: **none**. No provider values were put in source, this document, or an environment file.
- Exact signup URLs, required scopes/callbacks, fees, app-review states, and individual-account connection states are tracked in `PROVIDER_MATRIX.md`; source evidence alone does not establish approval or free access.
- The default `docker-compose.yaml` includes placeholder secrets and example database passwords. It is for reference/development, not a safe production configuration; generate unique secrets and provision private databases before any public deployment.

## Upstream evidence

- Source at the pinned commit: [Postiz application repository](https://github.com/gitroomhq/postiz-app/tree/e454b8b5962c819a1a22b9e2cc3d378c29b19345).
- Product workflow and channel connection behavior: [Postiz Quickstart](https://docs.postiz.com/general/quickstart).
- Self-hosted settings, storage, Temporal, provider credentials and configuration: [Postiz Configuration Reference](https://docs.postiz.com/self-host/configuration/reference).
- Feature categories and route mapping above were checked against the listed source paths and the documentation index available at `https://docs.postiz.com/llms.txt` on the audit date.
