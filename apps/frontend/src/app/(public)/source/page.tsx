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
        <h2>Modified Postguy source</h2>
        <p><Link href="https://github.com/ReeceHarding/postguy-app" target="_blank" rel="noreferrer">Postguy application source on GitHub ↗</Link></p>
        <h2>Upstream project</h2>
        <p><Link href="https://github.com/gitroomhq/postiz-app" target="_blank" rel="noreferrer">Postiz upstream application source on GitHub ↗</Link></p>
        <h2>License</h2>
        <p>The application is distributed under GNU Affero General Public License v3 or later. This repository contains the modified source for Postguy. Network operators must make the corresponding source available to users under the license terms.</p>
        <div className="postguy-source">Pinned upstream commit<br />e454b8b5962c819a1a22b9e2cc3d378c29b19345</div>
      </article>
      <SiteFooter />
    </SiteFrame>
  );
}
