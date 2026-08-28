import type {
  AgentStory,
  Artifact,
  ChatLine,
  Workspace,
} from "@/data/scale";

function ComputerGlyph() {
  return (
    <svg viewBox="0 0 40 32" aria-hidden>
      <rect x="5" y="3" width="30" height="21" rx="2.5" />
      <path d="M2 27h36l-2 3H4z" />
      <circle cx="20" cy="13.5" r="3.5" />
      <path d="M14 20c1.2-3 3.2-4.5 6-4.5s4.8 1.5 6 4.5" />
    </svg>
  );
}

function Chat({ lines, agent }: { lines: readonly ChatLine[]; agent: string }) {
  return (
    <div className="frame-chat">
      <div className="frame-pane-heading">
        <span className="agent-orb" aria-hidden>
          S
        </span>
        <div>
          <strong>{agent}</strong>
          <small>Agent chat</small>
        </div>
      </div>
      <div className="chat-lines">
        {lines.map((line, index) => (
          <div
            key={`${line.from}-${index}`}
            className={`chat-line chat-line-${line.from}`}
          >
            <span>{line.from === "agent" ? agent : "You"}</span>
            <p>{line.text}</p>
          </div>
        ))}
      </div>
      <div className="chat-input" aria-hidden>
        Message {agent}
        <span>↑</span>
      </div>
    </div>
  );
}

function ComputerChrome({
  title,
  status,
  children,
}: {
  title: string;
  status: string;
  children: React.ReactNode;
}) {
  return (
    <div className="frame-computer">
      <div className="computer-topbar">
        <span className="computer-dots" aria-hidden>
          <i />
          <i />
          <i />
        </span>
        <strong>Computer</strong>
        <span className="computer-status">
          <i />
          {status}
        </span>
      </div>
      <div className="browser-bar">
        <span aria-hidden>‹</span>
        <span aria-hidden>›</span>
        <p>{title}</p>
      </div>
      {children}
    </div>
  );
}

function WorkspaceView({ workspace }: { workspace: Workspace }) {
  return (
    <ComputerChrome title={workspace.title} status={workspace.status}>
      <div className="workspace">
        <header>
          <p>{workspace.app}</p>
          <strong>{workspace.title}</strong>
        </header>
        <dl>
          {workspace.rows.map((row) => (
            <div key={row.label}>
              <dt>{row.label}</dt>
              <dd>{row.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </ComputerChrome>
  );
}

function ArtifactView({ artifact }: { artifact: Artifact }) {
  return (
    <ComputerChrome title={artifact.title} status={artifact.status}>
      <article className="artifact-sheet">
        <header>
          <span>Final artifact</span>
          <p>{artifact.status}</p>
        </header>
        <h4>{artifact.title}</h4>
        <dl>
          {artifact.fields.map((field) => (
            <div key={field.label}>
              <dt>{field.label}</dt>
              <dd>{field.value}</dd>
            </div>
          ))}
        </dl>
      </article>
    </ComputerChrome>
  );
}

export function AgentStorySection({ story }: { story: AgentStory }) {
  return (
    <section id={story.id} className="agent-story">
      <header className="story-heading">
        <p className="story-number">{story.number}</p>
        <div>
          <div className="agent-chip">
            <ComputerGlyph />
            <p>
              <strong>{story.agent}</strong>
              <span>{story.computer}</span>
            </p>
          </div>
          <h2>{story.title}</h2>
          <p className="story-summary">{story.summary}</p>
          <p className="story-trigger">{story.trigger}</p>
        </div>
      </header>

      <ol className="scene-list">
        {story.frames.map((frame, index) => (
          <li
            key={frame.id}
            className={`scene-frame scene-frame-${frame.kind}`}
          >
            <header className="scene-heading">
              <p>Frame {String(index + 1).padStart(2, "0")}</p>
              <span>{frame.moment}</span>
              <h3>{frame.label}</h3>
            </header>
            <div className="scene-workbench">
              <Chat lines={frame.chat} agent={story.agent} />
              {frame.kind === "artifact" ? (
                <ArtifactView artifact={frame.artifact} />
              ) : (
                <WorkspaceView workspace={frame.workspace} />
              )}
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}

export function FleetOverview({ stories }: { stories: readonly AgentStory[] }) {
  return (
    <section id="fleet" className="fleet">
      <div className="section-heading">
        <p className="eyebrow">A fleet, not another tab</p>
        <h2>Each agent gets a computer and a clear finish line.</h2>
        <p>
          The seller keeps the customer relationship. The agents handle the
          surrounding work and return drafts for review.
        </p>
      </div>
      <div className="fleet-grid">
        {stories.map((story) => (
          <a href={`#${story.id}`} className="fleet-card" key={story.id}>
            <span className="fleet-computer">
              <ComputerGlyph />
            </span>
            <p>
              <strong>{story.agent}</strong>
              <span>{story.computer}</span>
            </p>
            <span className="fleet-arrow" aria-hidden>
              ↘
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}
