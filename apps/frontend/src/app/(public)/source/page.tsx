import type { Metadata } from 'next';
import Link from 'next/link';
import { SiteFooter, SiteFrame } from '@gitroom/frontend/components/postguy/site-frame';

export const metadata: Metadata = {
  title: 'Source and license',
  description: 'Source provenance and license for the Postguy application.',
};

export default function SourcePage() {
  return (
    <SiteFrame>
      <article className="postguy-legal">
        <p className="postguy-eyebrow">Postguy · Source</p>
        <h1>Source &amp; license</h1>
        <p className="postguy-legal-meta">Upstream baseline: e454b8b5962c819a1a22b9e2cc3d378c29b19345</p>
        <div className="postguy-callout">Postguy is an original rebrand of the Postiz open-source project. The modified app source must be made available to users of any network-hosted version under AGPL-3.0-or-later.</div>
        <h2>Upstream project</h2>
        <p><Link href="https://github.com/gitroomhq/postiz-app" target="_blank" rel="noreferrer">Postiz upstream application source on GitHub ↗</Link></p>
        <h2>License</h2>
        <p>The upstream checkout includes the GNU Affero General Public License. The working Postguy source checkout is currently local; a public source URL for the modified build is a launch requirement and will be added before network hosting is enabled.</p>
        <div className="postguy-source">Pinned upstream commit<br />e454b8b5962c819a1a22b9e2cc3d378c29b19345</div>
      </article>
      <SiteFooter />
    </SiteFrame>
  );
}
