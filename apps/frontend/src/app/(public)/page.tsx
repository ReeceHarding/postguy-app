import type { Metadata } from 'next';
import Link from 'next/link';
import { SiteFooter, SiteFrame } from '@gitroom/frontend/components/postguy/site-frame';

export const metadata: Metadata = {
  title: 'Postguy · Self-hosted social publishing',
  description: 'Plan, review and schedule social posts from an instance you run.',
  applicationName: 'Postguy',
};

function SchedulePreview() {
  const days = [
    ['MON', '9:30', '11:00', ''],
    ['TUE', '', '10:15', '14:30'],
    ['WED', '9:00', '', '12:45'],
    ['THU', '', '10:30', ''],
    ['FRI', '8:45', '11:15', '15:00'],
  ];
  return (
    <div className="postguy-demo" aria-label="Illustrative weekly publishing calendar">
      <div className="postguy-demo-top" aria-hidden="true"><i /><i /><i /></div>
      <div className="postguy-demo-head"><span>Publishing calendar</span><small>EXAMPLE VIEW</small></div>
      {days.map(([day, one, two, three]) => (
        <div className="postguy-day-row" key={day}>
          <span>{day}</span>
          {[one, two, three].map((time, index) => (
            <div className="postguy-slot" key={`${day}-${index}`}>
              {time && <><span aria-hidden="true" />{time}</>}
            </div>
          ))}
        </div>
      ))}
      <div className="postguy-demo-foot"><span>Draft → review → schedule</span><span>Local instance</span></div>
    </div>
  );
}

export default function HomePage() {
  return (
    <SiteFrame>
      <section className="postguy-hero">
        <div>
          <p className="postguy-eyebrow">Social publishing on your own stack</p>
          <h1>Make room<br />for the <em>work.</em></h1>
          <p className="postguy-lede">Plan posts across channels, shape each version, and keep a clear view of what is drafted, scheduled, or published. Run Postguy on infrastructure you control.</p>
          <div className="postguy-hero-actions">
            <Link href="/source" className="postguy-button postguy-button-primary">Explore the source <span aria-hidden="true">↗</span></Link>
            <Link href="#workflow" className="postguy-button postguy-button-quiet">See the workflow <span aria-hidden="true">↓</span></Link>
          </div>
          <div className="postguy-proof"><span /> SELF-HOSTED SOFTWARE <b>·</b> PROVIDER ACCESS IS CONFIGURED PER INSTANCE</div>
        </div>
        <SchedulePreview />
      </section>

      <section className="postguy-section" id="capabilities">
        <div className="postguy-section-heading">
          <h2 className="postguy-section-title">The whole publishing<br /><em>loop, in one place.</em></h2>
          <p className="postguy-section-caption">Postguy is an original rebrand of the Postiz open-source application. Its upstream feature set stays intact; provider access depends on credentials, scopes and review for each platform.</p>
        </div>
        <div className="postguy-feature-grid">
          <article className="postguy-feature">
            <span className="postguy-feature-label">01 / PLAN</span>
            <h3>One calendar, many channels</h3>
            <p>Draft, tailor and preview posts per destination. Organize channel sets, posting times and approvals around the work.</p>
          </article>
          <article className="postguy-feature">
            <span className="postguy-feature-label">02 / PUBLISH</span>
            <h3>Schedules with a visible state</h3>
            <p>Queue or publish posts, track per-channel outcomes and see when a platform is still processing or needs attention.</p>
          </article>
          <article className="postguy-feature">
            <span className="postguy-feature-label">03 / OPERATE</span>
            <h3>Your instance, your connections</h3>
            <p>Postguy connects directly to platform APIs using your instance’s configured apps and the accounts you authorize.</p>
          </article>
          <article className="postguy-feature">
            <span className="postguy-feature-label">04 / EXTEND</span>
            <h3>Automation and developer tools</h3>
            <p>Use the source’s API, webhooks, RSS workflows and agent interfaces where you have configured the required services.</p>
          </article>
        </div>
        <div className="postguy-provider-lines" aria-label="Examples of implemented providers">
          {['Instagram', 'LinkedIn', 'Reddit', 'TikTok', 'YouTube', 'Bluesky', 'Mastodon', 'Threads'].map((name) => <span key={name}>{name}</span>)}
          <span>+ more in source</span>
        </div>
      </section>

      <section className="postguy-section" id="workflow">
        <div className="postguy-flow">
          <div>
            <p className="postguy-eyebrow">From idea to outcome</p>
            <h2 className="postguy-section-title">A practical path<br />from draft to <em>live.</em></h2>
            <p className="postguy-lede">The interface keeps content and platform status together. Each network still applies its own access rules, formats and publishing limits.</p>
          </div>
          <div className="postguy-flow-list">
            <div className="postguy-flow-step"><b>01</b><div><h3>Connect your channels</h3><p>Authorize an existing account or enter credentials in supported flows.</p></div></div>
            <div className="postguy-flow-step"><b>02</b><div><h3>Write once, refine per channel</h3><p>Choose destinations, add media and review platform previews and validation.</p></div></div>
            <div className="postguy-flow-step"><b>03</b><div><h3>Schedule and review outcomes</h3><p>Track drafts, queued work, platform processing, success and errors.</p></div></div>
          </div>
        </div>
        <div className="postguy-flow-visual" aria-label="Post lifecycle">
          <div className="postguy-flow-node"><span>Draft</span><small>EDITABLE</small></div>
          <div className="postguy-flow-connector" />
          <div className="postguy-flow-node"><span>Scheduled</span><small>TEMPORAL WORKFLOW</small></div>
          <div className="postguy-flow-connector" />
          <div className="postguy-flow-node"><span>Submitted to platform</span><small>OUTCOME PENDING</small></div>
          <div className="postguy-flow-connector" />
          <div className="postguy-flow-node"><span>Published or needs attention</span><small>PER CHANNEL</small></div>
        </div>
      </section>

      <section className="postguy-cta">
        <div>
          <h2>Open source.<br />Self-hosted by design.</h2>
          <p>The public service, support contact and provider apps are not yet configured. Use the repository to inspect the current implementation and deployment requirements.</p>
        </div>
        <Link href="/source" className="postguy-button postguy-button-primary">Source &amp; license <span aria-hidden="true">↗</span></Link>
      </section>
      <SiteFooter />
    </SiteFrame>
  );
}
