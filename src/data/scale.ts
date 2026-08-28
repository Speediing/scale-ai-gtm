export const ACCOUNT = {
  customer: "Scale AI",
  partner: "SpaceXAI",
  title: "Scale AI x SpaceXAI",
  slug: "scale-ai",
} as const;

export type ChatLine = {
  from: "agent" | "seller";
  text: string;
};

export type Workspace = {
  app: string;
  title: string;
  status: string;
  rows: readonly {
    label: string;
    value: string;
  }[];
};

export type Artifact = {
  title: string;
  status: string;
  fields: readonly {
    label: string;
    value: string;
  }[];
};

export type SceneFrame = {
  kind: "scene";
  id: string;
  moment: string;
  label: string;
  chat: readonly ChatLine[];
  workspace: Workspace;
};

export type ArtifactFrame = {
  kind: "artifact";
  id: string;
  moment: string;
  label: string;
  chat: readonly ChatLine[];
  artifact: Artifact;
};

export type AgentStory = {
  id: string;
  number: string;
  agent: string;
  computer: string;
  title: string;
  summary: string;
  trigger: string;
  frames: readonly [SceneFrame, SceneFrame, ArtifactFrame];
};

export const AGENT_STORIES = [
  {
    id: "meeting-prep",
    number: "01",
    agent: "Agent 01",
    computer: "Browser + account record",
    title: "Walk into the meeting knowing what is true.",
    summary:
      "The agent opens the account record, checks public sources, and turns confirmed information into a short brief for the Scale seller.",
    trigger: "Starts when the seller adds an account.",
    frames: [
      {
        kind: "scene",
        id: "source-list",
        moment: "Account added",
        label: "The agent opens the account record and makes a source list.",
        chat: [
          {
            from: "agent",
            text: "I am checking the account record and public pages now.",
          },
          {
            from: "seller",
            text: "Keep open questions separate from confirmed context.",
          },
        ],
        workspace: {
          app: "Browser",
          title: "Research queue",
          status: "Checking sources",
          rows: [
            { label: "Account record", value: "Open" },
            { label: "Public pages", value: "Reviewing" },
            { label: "Open questions", value: "Collecting" },
          ],
        },
      },
      {
        kind: "scene",
        id: "sort-context",
        moment: "Sources checked",
        label: "It sorts what is confirmed and what still needs an answer.",
        chat: [
          {
            from: "agent",
            text: "Confirmed context is ready. I marked the gaps instead of guessing.",
          },
        ],
        workspace: {
          app: "Docs",
          title: "Meeting brief",
          status: "Drafting",
          rows: [
            { label: "Confirmed", value: "From named sources" },
            { label: "Open", value: "Needs seller review" },
            { label: "Plan", value: "Short and specific" },
          ],
        },
      },
      {
        kind: "artifact",
        id: "brief-ready",
        moment: "Ready for review",
        label: "The last frame is the meeting brief.",
        chat: [
          {
            from: "agent",
            text: "The brief is ready. I left every unsupported point out.",
          },
        ],
        artifact: {
          title: "Meeting brief",
          status: "Draft for seller review",
          fields: [
            {
              label: "Confirmed context",
              value: "Only information tied to the account record or a public source.",
            },
            {
              label: "Open questions",
              value: "Gaps to resolve in the meeting, without a guessed answer.",
            },
            {
              label: "Meeting plan",
              value: "A clear opening, the questions to ask, and the next step to confirm.",
            },
          ],
        },
      },
    ],
  },
  {
    id: "live-support",
    number: "02",
    agent: "Agent 02",
    computer: "Call notes + knowledge base",
    title: "Stay with the customer while the agent checks the answer.",
    summary:
      "The agent follows the call, catches a question, and checks an approved source before it drafts an answer.",
    trigger: "Starts when the customer call begins.",
    frames: [
      {
        kind: "scene",
        id: "call-starts",
        moment: "Call starts",
        label: "The agent follows the notes while the seller runs the room.",
        chat: [
          {
            from: "agent",
            text: "I am following the notes. I will flag questions that need a source.",
          },
        ],
        workspace: {
          app: "Notes",
          title: "Live call",
          status: "Listening",
          rows: [
            { label: "Decisions", value: "Watching" },
            { label: "Questions", value: "Watching" },
            { label: "Next steps", value: "Watching" },
          ],
        },
      },
      {
        kind: "scene",
        id: "check-source",
        moment: "A question comes up",
        label: "It opens the approved source and prepares a plain answer.",
        chat: [
          {
            from: "agent",
            text: "I found the approved source. The draft answer is based on that page.",
          },
          {
            from: "seller",
            text: "Show me the source before I use it.",
          },
        ],
        workspace: {
          app: "Knowledge",
          title: "Approved source",
          status: "Source open",
          rows: [
            { label: "Source", value: "Named and linked" },
            { label: "Answer", value: "Plain English" },
            { label: "Confidence", value: "No unsupported claims" },
          ],
        },
      },
      {
        kind: "artifact",
        id: "answer-ready",
        moment: "Ready in the call",
        label: "The last frame is the answer card.",
        chat: [
          {
            from: "agent",
            text: "The answer card is ready with the source attached.",
          },
        ],
        artifact: {
          title: "Answer card",
          status: "Ready for the seller",
          fields: [
            {
              label: "Customer question",
              value: "Copied from the live notes so the wording stays intact.",
            },
            {
              label: "Approved source",
              value: "The page used to prepare the answer.",
            },
            {
              label: "Draft answer",
              value: "A short response the seller can use or edit in the room.",
            },
          ],
        },
      },
    ],
  },
  {
    id: "follow-up",
    number: "03",
    agent: "Agent 03",
    computer: "Notes + email + CRM",
    title: "Leave the call with the follow-up ready.",
    summary:
      "The agent reads the final notes, prepares the follow-up, and holds every external action for seller approval.",
    trigger: "Starts when the call notes are ready.",
    frames: [
      {
        kind: "scene",
        id: "notes-ready",
        moment: "Notes are ready",
        label: "The agent pulls out confirmed owners, dates, and open questions.",
        chat: [
          {
            from: "agent",
            text: "I am using the final notes. I will keep anything unconfirmed out of the drafts.",
          },
        ],
        workspace: {
          app: "Notes",
          title: "Call recap",
          status: "Reading",
          rows: [
            { label: "Owners", value: "Collecting" },
            { label: "Dates", value: "Collecting" },
            { label: "Open questions", value: "Collecting" },
          ],
        },
      },
      {
        kind: "scene",
        id: "draft-actions",
        moment: "Drafts open",
        label: "It prepares the email and the account update side by side.",
        chat: [
          {
            from: "agent",
            text: "The email and account update are open. Nothing has been sent.",
          },
          {
            from: "seller",
            text: "Keep both as drafts until I approve them.",
          },
        ],
        workspace: {
          app: "Mail + CRM",
          title: "Follow-up workspace",
          status: "Drafting",
          rows: [
            { label: "Email", value: "Draft" },
            { label: "Account update", value: "Draft" },
            { label: "External actions", value: "Waiting" },
          ],
        },
      },
      {
        kind: "artifact",
        id: "pack-ready",
        moment: "Ready for approval",
        label: "The last frame is the follow-up pack.",
        chat: [
          {
            from: "agent",
            text: "The pack is ready. Review it once, then choose what moves.",
          },
        ],
        artifact: {
          title: "Follow-up pack",
          status: "Nothing sent",
          fields: [
            {
              label: "Customer email",
              value: "A draft based on the confirmed next step in the notes.",
            },
            {
              label: "Account update",
              value: "Confirmed owners, dates, and open questions.",
            },
            {
              label: "Internal handoff",
              value: "Questions routed to the right team for review.",
            },
          ],
        },
      },
    ],
  },
] as const satisfies readonly AgentStory[];
