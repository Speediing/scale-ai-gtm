import {
  AgentStorySection,
  FleetOverview,
} from "@/components/AgentStorySection";
import { BrandLockup } from "@/components/BrandLockup";
import { HeroTelemetry } from "@/components/HeroTelemetry";
import { SiteNav } from "@/components/SiteNav";
import { ACCOUNT, AGENT_STORIES } from "@/data/scale";

export default function HomePage() {
  return (
    <main id="top">
      <div className="hero-shell">
        <HeroTelemetry />
        <div className="watercolor-field" aria-hidden>
          <i />
          <i />
          <i />
        </div>
        <SiteNav />
        <section className="hero">
          <div className="hero-copy">
            <p className="eyebrow">{ACCOUNT.title}</p>
            <h1>Give every Scale seller a fleet of agents with computers.</h1>
            <p className="hero-intro">
              Scale builds reliable AI systems for critical decisions. These
              agents bring the same discipline to the work around a customer
              call. They open the tools, finish the task, and hand the result
              back for review.
            </p>
            <div className="hero-actions">
              <a href="#stories">See the agents work</a>
              <span>Built as a working concept for {ACCOUNT.customer}</span>
            </div>
          </div>

          <div className="hero-agents" aria-label="SpaceXAI agent fleet">
            {AGENT_STORIES.map((story, index) => (
              <div className="hero-agent-card" key={story.id}>
                <span className="hero-agent-number">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="hero-agent-orb" aria-hidden>
                  S
                </span>
                <p>
                  <strong>{story.agent}</strong>
                  <small>{story.computer}</small>
                </p>
                <span className="hero-agent-state">
                  <i />
                  Ready
                </span>
              </div>
            ))}
          </div>
        </section>

        <div className="hero-paper-band">
          <span className="paper-pin paper-pin-left" aria-hidden />
          <BrandLockup size="md" />
          <p>
            Built for the work around a Scale customer call.
            <span>Every external action waits for approval.</span>
          </p>
          <span className="paper-pin paper-pin-right" aria-hidden />
        </div>
      </div>

      <div className="paper-page">
        <FleetOverview stories={AGENT_STORIES} />

        <div id="stories" className="stories">
          <header className="stories-intro">
            <p className="eyebrow">Scene by scene</p>
            <h2>See the work move from a trigger to a finished draft.</h2>
            <p>
              Each frame shows one moment in time. Chat stays on the left. The
              agent computer stays on the right. The last frame shows the
              artifact the seller gets back.
            </p>
          </header>
          {AGENT_STORIES.map((story) => (
            <AgentStorySection key={story.id} story={story} />
          ))}
        </div>

        <section id="contact" className="contact-band">
          <div>
            <p className="eyebrow">Start with one workflow</p>
            <h2>Bring the work your sellers repeat. We will map it together.</h2>
          </div>
          <a href="mailto:michael.mooney@cursor.com">
            Start with Mike
            <span aria-hidden>↗</span>
          </a>
        </section>
      </div>

      <footer className="site-footer">
        <BrandLockup size="sm" />
        <p>
          Prepared for {ACCOUNT.customer}
          <span>Private working concept</span>
        </p>
        <address>
          <strong>Mike Mooney</strong>
          <a href="mailto:michael.mooney@cursor.com">
            michael.mooney@cursor.com
          </a>
        </address>
      </footer>
    </main>
  );
}
