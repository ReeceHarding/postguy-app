import type { Metadata } from 'next';
import { SiteFooter, SiteFrame } from '@gitroom/frontend/components/postguy/site-frame';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'How data is handled by the Postguy self-hosted application.',
};

export default function PrivacyPage() {
  return (
    <SiteFrame active="privacy">
      <article className="postguy-legal">
        <p className="postguy-eyebrow">Postguy · Privacy</p>
        <h1>Privacy Policy</h1>
        <p className="postguy-legal-meta">Draft for this self-hosted software · October 19, 2026</p>
        <div className="postguy-callout">Postguy is open-source software intended to be run by its operator. No centrally operated Postguy publishing service or public signup is configured for this build. The operator of any deployed instance controls its hosting, database, storage, logs and optional integrations.</div>

        <h2>Information an instance may process</h2>
        <p>The application source includes account and organization details such as email addresses, names, profile references, time zones, membership and notification settings. Local-password accounts store a password hash. The user record can also store an IP address and user-agent value. It can store connected-channel identifiers and profile details; post drafts, scheduled content, per-channel settings, comments, approvals, tags and publishing status; uploaded media and related metadata; and settings for automations, API access and webhooks.</p>
        <p>When a channel is connected, the instance stores authorization tokens and related provider data. In the inspected source, token values are encrypted using a key derived from the instance’s <code>JWT_SECRET</code>. The instance operator must protect that secret and restrict access to its database, backups and environment configuration.</p>

        <h2>How information is used</h2>
        <p>The application uses this information to authenticate users, manage organizations and channels, prepare and schedule content, upload media, call platform APIs, display analytics supplied by platforms, run configured automations, and report publishing outcomes. Selected post content, media and account authorization are sent to the social platform chosen for a post.</p>

        <h2>Storage and other providers</h2>
        <p>The self-hosted application can store uploads on its local filesystem or in an object-storage service configured by the operator. The source also supports optional email, analytics and error-monitoring, AI text and media generation, search, video processing, media editing, short-link, and remote media services. When enabled, those services may receive data needed for their configured function under their own terms and privacy policies. Optional processing can incur separate provider charges.</p>
        <p>No AI, media-processing, object-storage, email-delivery or analytics credentials are configured by this project audit. The eventual deployment configuration must be checked before making any claim about whether a specific provider receives data.</p>

        <h2>Cookies, telemetry and logs</h2>
        <p>The app uses authentication and language preference cookies. Optional analytics and monitoring code is present and may transmit page, usage, diagnostic or attribution information if the instance operator configures the related integrations. The operator’s infrastructure may also create server, proxy and database logs. This source review does not establish a deployment’s log contents or retention period.</p>

        <h2>Retention, access and deletion</h2>
        <p>The software does not define one retention period for every self-hosted instance. The operator is responsible for configuring backups and logs, setting retention, restricting access, and handling access or deletion requests. Deleting local data does not itself revoke a social-platform authorization; disconnect or revoke access through the relevant platform as well.</p>

        <h2>Children and public service</h2>
        <p>This build is not configured as a public hosted service and does not provide a public registration program. No age-specific account controls have been verified in this source audit.</p>

        <h2>Operator and contact</h2>
        <p>A verified legal operator identity and monitored public contact address have not been provided for this build. Those details must be added before the site is used to represent a publicly operated service or submitted for platform review. For a self-hosted instance, contact its operator directly.</p>

        <h2>Policy changes</h2>
        <p>The operator of a deployed instance must publish a policy that matches that deployment’s actual configuration and update it when material data flows change.</p>
        <p>This page describes source behavior and configuration options as reviewed on the date above. It is not a statement that every optional service is enabled or a substitute for legal advice.</p>
      </article>
      <SiteFooter />
    </SiteFrame>
  );
}
