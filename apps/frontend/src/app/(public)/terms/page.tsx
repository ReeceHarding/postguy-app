import type { Metadata } from 'next';
import { SiteFooter, SiteFrame } from '@gitroom/frontend/components/postguy/site-frame';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Terms describing the Postguy self-hosted software build.',
};

export default function TermsPage() {
  return (
    <SiteFrame active="terms">
      <article className="postguy-legal">
        <p className="postguy-eyebrow">Postguy · Terms</p>
        <h1>Terms of Service</h1>
        <p className="postguy-legal-meta">Draft for this self-hosted software · October 19, 2026</p>
        <div className="postguy-callout">Postguy is an early, self-hosted software build. It is not currently offered through a configured public hosted service, and no uptime, support or service-level commitment is made here.</div>

        <h2>Software and license</h2>
        <p>Postguy is an original branded modification of the Postiz application. The application code remains available under the GNU Affero General Public License, version 3 or later, as stated in the accompanying license. These terms do not replace or restrict rights granted by that license. The modified source must remain available to users of any network-hosted version under the license terms.</p>

        <h2>Self-hosting and operator responsibilities</h2>
        <p>The person or organization that installs an instance operates it and is responsible for its hosting, accounts, access controls, environment secrets, database, backups, logs, storage, retention and notices to its users. Protect the instance’s `JWT_SECRET`; the application uses it for sessions and for encryption of stored provider credentials.</p>

        <h2>Social accounts and publishing</h2>
        <p>You must use accounts and channels that you are authorized to manage. You are responsible for the content you submit, the permissions you grant, and compliance with each platform’s terms, API policies, community rules, laws and publishing limits. Platform access may require developer registration, scopes, review or account eligibility and can be restricted or withdrawn by the platform.</p>
        <p>Scheduling is not a guarantee that a post will be published. A platform may reject, delay or remove content, tokens may expire, and connections or services may be unavailable. Review the per-channel status and verify publication on the destination platform when that matters.</p>

        <h2>Third-party services and costs</h2>
        <p>The software can connect to social platforms and optional storage, email, AI, media-processing, analytics, monitoring and short-link services. Those services are controlled by their own providers and terms. You are responsible for choosing which integrations to enable, reviewing their current terms and fees, and paying any charges incurred through accounts or services you configure.</p>

        <h2>Availability and changes</h2>
        <p>Self-hosted software depends on the operator’s infrastructure and third-party APIs. No uptime, backup, support response, data-retention period or compatibility commitment is promised. The operator may change or stop operating an instance subject to applicable law and the software license.</p>

        <h2>Operator identity and contact</h2>
        <p>A verified legal operator identity and monitored public contact address have not been provided for this build. This page must be updated before the software is offered as a public hosted service or submitted as a provider-facing service with operator details.</p>

        <h2>Current status</h2>
        <p>These terms describe the current self-hosted software scope only. A production service requires a verified operator, contact channel, deployment configuration and review of applicable legal requirements.</p>
      </article>
      <SiteFooter />
    </SiteFrame>
  );
}
