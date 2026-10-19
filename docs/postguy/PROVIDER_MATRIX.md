# Postguy provider and credential matrix

**Checked:** 2026-10-19 against source commit `e454b8b5962c819a1a22b9e2cc3d378c29b19345`.

This inventory distinguishes code support from app approval and from a user's own account authorization. No provider developer apps were created, no applications were submitted, and no provider secrets are configured. The local Privacy, Terms, and Source routes are not publicly reachable; several providers require a public site, verified domain, or accessible legal URLs for review. Provider statuses therefore remain **not started**. No provider should be presented as ready.

Callback paths below are relative to `FRONTEND_URL`; provider registrations must use the exact HTTPS origin and path for the eventual public instance. OAuth must use that origin directly. Postguy removed upstream's optional `redirectmeto.com` redirect behavior; there are no third-party OAuth callback relays.

## Social providers in the pinned source

| Provider / source identifier | Auth flow and source scopes | App credentials / callback | Official developer starting point | Fee, review and current state |
| --- | --- | --- | --- | --- |
| X / `x` | OAuth 1.0a; no OAuth scopes declared | `X_API_KEY`, `X_API_SECRET`, optional `X_URL`; `/integrations/social/x` | [X Developer Platform](https://developer.x.com/) | Pay-per-use model; excluded from free setup unless a no-cost route is confirmed. Not started. |
| LinkedIn profile / `linkedin` | OAuth; `openid profile w_member_social r_basicprofile rw_organization_admin w_organization_social r_organization_social` | `LINKEDIN_CLIENT_ID/SECRET`; `/integrations/social/linkedin` | [LinkedIn Developer Portal](https://www.linkedin.com/developers/) | Products/permissions and review are LinkedIn-controlled; no app created. Not started. |
| LinkedIn Page / `linkedin-page` | OAuth; same broad source scope list as profile | Shared LinkedIn app; `/integrations/social/linkedin-page` | [LinkedIn Developer Portal](https://www.linkedin.com/developers/) | Organization/page roles and product access apply. Not started. |
| Reddit / `reddit` | OAuth; `read identity submit flair` | `REDDIT_CLIENT_ID/SECRET`; `/integrations/social/reddit` | [Reddit Developer Apps](https://www.reddit.com/prefs/apps) | Review, API terms and rate limits to verify before production. Not started. |
| Instagram Graph / `instagram` | OAuth; `instagram_basic pages_show_list pages_read_engagement business_management instagram_content_publish instagram_manage_comments instagram_manage_insights` | `FACEBOOK_APP_ID/SECRET`; `/integrations/social/instagram` | [Meta for Developers](https://developers.facebook.com/) | Meta app review and account/page eligibility; not started. |
| Instagram API with Instagram Login / `instagram-standalone` | OAuth; `instagram_business_basic instagram_business_content_publish instagram_business_manage_comments instagram_business_manage_insights` | `INSTAGRAM_APP_ID/SECRET`; `/integrations/social/instagram-standalone` | [Instagram Platform](https://developers.facebook.com/docs/instagram-platform/) | Meta review, app settings, and account eligibility; not started. |
| Facebook Pages / `facebook` | OAuth; `pages_show_list business_management pages_manage_posts pages_manage_engagement pages_read_engagement read_insights` | `FACEBOOK_APP_ID/SECRET`; `/integrations/social/facebook` | [Meta for Developers](https://developers.facebook.com/) | Meta app review and Page role requirements; not started. |
| Threads / `threads` | OAuth; `threads_basic threads_content_publish threads_manage_replies threads_manage_insights threads_profile_discovery` | `THREADS_APP_ID/SECRET`; `/integrations/social/threads` | [Threads API](https://developers.facebook.com/docs/threads/) | Meta app review; not started. |
| YouTube / `youtube` | Google OAuth; profile/email plus YouTube, upload, partner and analytics scopes declared in source | `YOUTUBE_CLIENT_ID/SECRET`; `/integrations/social/youtube` | [YouTube Data API](https://developers.google.com/youtube/v3) | No API purchase identified; quota and OAuth verification/restrictions apply. Not started. |
| Google Business Profile / `gmb` | Google OAuth; `userinfo.profile userinfo.email business.manage` | `GOOGLE_GMB_CLIENT_ID/SECRET` (falls back to YouTube OAuth vars); `/integrations/social/gmb` | [Business Profile APIs](https://developers.google.com/my-business) | Google API enablement, account eligibility, OAuth verification; not started. |
| TikTok / `tiktok` | OAuth; `video.list user.info.basic video.publish video.upload user.info.profile user.info.stats` | `TIKTOK_CLIENT_ID/SECRET`; `/integrations/social/tiktok` | [TikTok for Developers](https://developers.tiktok.com/) | App review and Content Posting audit; unaudited Direct Post is private-only. Not started. |
| TikTok Business / `tiktok-business` | OAuth; `user.info.basic user.info.username user.info.stats video.list video.upload video.publish` | `TIKTOK_BUSINESS_CLIENT_ID/SECRET`; `/integrations/social/tiktok-business/` (trailing slash) | [TikTok Business API](https://business-api.tiktok.com/portal/) | Business API access/review; verified media domain needed for URL pulls. Not started. |
| Pinterest / `pinterest` | OAuth; `boards:read boards:write pins:read pins:write user_accounts:read` | `PINTEREST_CLIENT_ID/SECRET`; `/integrations/social/pinterest` | [Pinterest Developers](https://developers.pinterest.com/) | Access tier/review to confirm; not started. |
| Dribbble / `dribbble` | OAuth; `public upload` | `DRIBBBLE_CLIENT_ID/SECRET`; `/integrations/social/dribbble` | [Dribbble API](https://developer.dribbble.com/) | API availability/terms to confirm; not started. |
| Discord / `discord` | OAuth + bot; `identify guilds`, bot scope and fixed permissions in code | `DISCORD_CLIENT_ID/SECRET`, `DISCORD_BOT_TOKEN_ID`; `/integrations/social/discord` | [Discord Developer Portal](https://discord.com/developers/applications) | No API fee identified; bot install/server permissions apply. Not started. |
| Slack / `slack` | OAuth bot scopes: `channels:read chat:write users:read groups:read channels:join chat:write.customize` | `SLACK_ID`, `SLACK_SECRET`; `/integrations/social/slack` | [Slack API Apps](https://api.slack.com/apps) | Workspace installation/approval; no app created. Not started. |
| Kick / `kick` | OAuth; `chat:write user:read channel:read` | `KICK_CLIENT_ID`, `KICK_SECRET`; `/integrations/social/kick` | [Kick Developers](https://dev.kick.com/) | API access/terms to confirm. Not started. |
| Twitch / `twitch` | OAuth; `user:write:chat user:read:chat moderator:manage:announcements` | `TWITCH_CLIENT_ID/SECRET`; `/integrations/social/twitch` | [Twitch Developer Console](https://dev.twitch.tv/console) | No API fee identified; scopes and broadcaster authorization apply. Not started. |
| Mastodon / `mastodon` | Per-instance OAuth; `write:statuses profile write:media` | `MASTODON_URL`, client ID/secret registered at the chosen instance; `/integrations/social/mastodon` | [Mastodon API docs](https://docs.joinmastodon.org/) | No central developer app; instance policies and user authorization apply. Not started. |
| Bluesky / `bluesky` | User credential/app-password flow; no OAuth scopes; source uses status/media permissions | User supplies account handle and app password in channel flow | [AT Protocol docs](https://atproto.com/guides/app-passwords) | No central app registration; user must create an app password. Not started. |
| Lemmy / `lemmy` | Instance login; no OAuth scopes | User supplies instance and account credentials in channel flow | [Lemmy API docs](https://join-lemmy.org/api/) | Instance policies apply; no central app registration. Not started. |
| Farcaster / `farcaster` | Neynar-backed API; no OAuth scopes | `NEYNAR_SECRET_KEY` and Neynar app/FID/signer configuration; per-user authorization as source supports | [Neynar docs](https://docs.neynar.com/) | Third-party API quotas/pricing must be checked; no key. Not started. |
| Telegram / `telegram` | Bot token; no OAuth scopes | User supplies bot token; `TELEGRAM_TOKEN` is also used by global bot paths | [Telegram Bot API](https://core.telegram.org/bots/api) | No API fee identified; a bot must be created by the account owner. Not started. |
| Nostr / `nostr` | Nostr key/signing flow; no OAuth scopes | User-provided signer/account flow | [Nostr protocol](https://github.com/nostr-protocol/nostr) | Relays have independent terms/costs; no central app approval. Not started. |
| VK / `vk` | OAuth; `vkid.personal_info email wall status docs photos video` | `VK_ID`; `/integrations/social/vk` | [VK ID Developers](https://id.vk.com/about/business/go/docs/en/vkid/latest/vk-id/connection/tokens/access-token) | App registration/access requirements to confirm. Not started. |
| Medium / `medium` | User API token; no scopes | User supplies API token in channel flow | [Medium API](https://github.com/Medium/medium-api-docs) | Medium API availability is restricted/deprecated in upstream docs; verify account access. Not started. |
| DEV Community / `devto` | User API key; no scopes | User supplies API key in channel flow | [DEV API docs](https://developers.forem.com/api) | No separate Postguy app registration identified; user key required. Not started. |
| Hashnode / `hashnode` | User API token; no OAuth scopes | User supplies token in channel flow | [Hashnode API docs](https://apidocs.hashnode.com/) | No separate Postguy app registration identified; user key required. Not started. |
| WordPress / `wordpress` | Site URL + user credentials/application password; no OAuth scopes | User supplies site and credential in channel flow | [WordPress REST API](https://developer.wordpress.org/rest-api/) | Self-hosted site policies apply; credential is user-provided. Not started. |
| Listmonk / `listmonk` | Instance URL + API credentials; no OAuth scopes | User supplies instance, user/API key, list ID | [Listmonk API](https://listmonk.app/docs/apis/) | Self-hosted/open-source software; infrastructure cost belongs to operator. Not started. |
| Moltbook / `moltbook` | API key flow; no OAuth scopes | User supplies API key in channel flow | [Moltbook](https://www.moltbook.com/) | API terms/access and service status require verification; not started. |
| Whop / `whop` | OAuth; `openid profile email forum:post:create forum:read company:basic:read` | `WHOP_CLIENT_ID` (inspect secret requirements before registration); `/integrations/social/whop` | [Whop Developers](https://dev.whop.com/) | App access/terms to confirm; not started. |
| Skool / `skool` | User credential flow; no OAuth scopes | User-supplied channel credential | [Skool](https://www.skool.com/) | Official public API/developer access not verified; not started. |
| MeWe / `mewe` | API-key integration | `MEWE_API_KEY`, `MEWE_APP_ID`, `MEWE_HOST` | [MeWe](https://mewe.com/) | Official developer access and fee status not verified; not started. |
| Tumblr / `tumblr` | OAuth; `write offline_access` | `TUMBLR_CLIENT_ID/SECRET`; `/integrations/social/tumblr` | [Tumblr API](https://www.tumblr.com/docs/en/api/v2) | App registration/terms apply; not started. |

## Non-social integrations and self-host dependencies

The source also has optional Google/GitHub/Apple/Farcaster login, generic OIDC, email delivery, AI text/image/video/voice/search tools, media editing/clipping, remote-media connections, analytics/telemetry, S3-compatible storage, short-link services, webhooks, RSS, MCP/agent connections, and optional payments. These are feature dependencies, not social providers.

- Core self-host requirements: PostgreSQL, Redis, Temporal and persistent upload storage. Docker Compose adds the Temporal visibility Elasticsearch service.
- Optional metered APIs: OpenAI, fal.ai, ElevenLabs, Tavily, KieAI/EvoLink, RunPod, Deepgram, Transloadit and third-party clipping/editing services. No free quota is assumed and no credentials are configured.
- Optional storage: local volume is available; Cloudflare R2/S3-compatible storage requires account credentials and may have usage charges.
- Optional email: Resend or SMTP. Account activation/invitations/email notifications require a configured mail service; no provider or sender identity is configured.
- Optional analytics/monitoring includes Plausible, Datafast, PostHog, GTM, Facebook Pixel, Sentry and Spotlight. Do not enable until a truthful privacy disclosure and purpose are configured.
- Optional payments: Stripe and RevenueCat. Disabled; do not configure paid plans or payment flows under the current no-budget instruction.

## User-only steps and blockers

1. A public, verified Postguy host is needed for provider website/legal URLs and HTTPS callback registration. `postguy.ai` is not purchased, verified or configured.
2. A truthful public operator/support contact is unavailable in the checked sources. Do not invent one in developer forms or public legal pages.
3. Provider applications commonly require the owner to accept platform terms, use owner-only MFA/CAPTCHA, or authorize a real social account. These must be completed by Reece if the provider prompts for them.
4. A provider may require business identity or product-policy declarations. Submit only after the facts are verified; do not submit an unverifiable legal/business claim.
5. No X credentials will be configured unless the official no-cost route is confirmed. The official X platform page currently describes consumption-based paid access.

## Evidence and official sources checked

- [Postiz Quickstart](https://docs.postiz.com/general/quickstart) and [self-host configuration reference](https://docs.postiz.com/self-host/configuration/reference) for upstream self-host conventions and core settings.
- [X Developer Platform](https://developer.x.com/) describes credit-based, consumption-based API billing; no free path has been established for Postguy.
- [YouTube Data API overview](https://developers.google.com/youtube/v3/getting-started) describes project registration, OAuth and default quota. [Quota and compliance audits](https://developers.google.com/youtube/v3/guides/quota_and_compliance_audits) explains audit requirements for quota extensions.
- [TikTok Content Posting API setup](https://developers.tiktok.com/docs/en/content-posting-api-get-started), [Direct Post reference](https://developers.tiktok.com/docs/en/content-posting-api-reference-direct-post), [sharing guidelines](https://developers.tiktok.com/docs/en/content-sharing-guidelines), and [app registration/review](https://developers.tiktok.com/docs/en/getting-started-create-an-app) explain URL verification, scope review, direct-post audit, and unaudited posting restrictions.

Scopes in this matrix are the values requested by the checked Postguy source, not evidence that a platform has granted them. Callback URLs are source-derived and must be confirmed against the provider's current portal before app registration. Cost/review cells marked unverified remain unknown, not free or approved.
