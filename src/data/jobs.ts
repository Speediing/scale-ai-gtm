import type { Artifact, CroJob, SlideCard } from "./types";

export const SAMPLE_FOLLOW_UP_SLIDES: SlideCard[] = [
  {
    n: 4,
    kicker: "Customer priority",
    voice: "them",
    title: "The evaluation goal",
    body: "We need a clear pass or fail on model quality before we expand the program.",
  },
  {
    n: 5,
    kicker: "Working plan",
    voice: "us",
    title: "Turn the goal into a plan",
    body: "Name the evaluation, the owner, the data needed, and the next review.",
  },
  {
    n: 6,
    kicker: "Open question",
    voice: "them",
    title: "The security path",
    body: "The security team needs approved answers before the evaluation uses production data.",
  },
  {
    n: 7,
    kicker: "Next step",
    voice: "us",
    title: "Keep the next step small",
    body: "One evaluation, named owners, and written success criteria.",
  },
];

export const SAMPLE_SECURITY_RESPONSE: Extract<
  Artifact,
  { kind: "redlines" }
> = {
  kind: "redlines",
  title: "Enterprise security review",
  paperTitle: "Questions to answer",
  from: "Customer security team",
  marks: [
    {
      text: "How is customer data handled?",
      note: "Use the approved response from the security library and link the source.",
      take: true,
    },
    {
      text: "Is customer data used to train shared models?",
      note: "Use the approved product and legal language. Flag any wording that needs review.",
      take: true,
    },
    {
      text: "What access controls and audit records are available?",
      note: "Pull the approved controls summary and cite the current trust materials.",
      take: true,
    },
    {
      text: "What retention period applies to this evaluation?",
      note: "Hold this item for the account team and security owner because the answer depends on the agreed scope.",
      take: false,
    },
  ],
  reply: {
    to: "Customer security team",
    subject: "Security review. Approved answers and one open item",
    body: "Hi team,\n\nI pulled the approved answers for data handling, model training, access controls, and audit records. Each answer includes the current source.\n\nThe retention question depends on the evaluation scope. I routed that item to the account team and security owner for review.\n\nNothing has been sent outside this draft.\n\nBest,",
  },
};

export const SAMPLE_OUTBOUND: Extract<Artifact, { kind: "outbound" }> = {
  kind: "outbound",
  title: "Example account outbound",
  account: "Example account",
  hypothesis: [
    {
      k: "Why us",
      body: "The team is formalizing how it tests model quality. Start with a focused evaluation workflow, not a broad platform pitch.",
    },
    {
      k: "Why now",
      body: "Public hiring and product work show that model evaluation is becoming an operating need.",
    },
    {
      k: "Why them",
      body: "The AI platform and evaluation leads own the process, the evidence, and the internal review.",
    },
  ],
  evidence: [
    {
      source: "Careers page",
      finding: "Open roles mention model evaluation, safety, and data quality.",
    },
    {
      source: "Engineering blog",
      finding: "Recent posts describe a more formal model development process.",
    },
    {
      source: "Product updates",
      finding: "New AI features make evaluation quality more important across teams.",
    },
  ],
  targets: [
    {
      name: "AI platform lead",
      role: "Platform owner",
      why: "Owns the model workflow and the systems around it.",
    },
    {
      name: "Evaluation lead",
      role: "Evaluation owner",
      why: "Owns the quality bar and the evidence used to make model decisions.",
    },
  ],
  page: {
    headline: "A practical evaluation plan for Example account",
    body: "Start with one model workflow, written success criteria, and the people who own the decision. Keep the first conversation focused.",
  },
};

export const JOBS: CroJob[] = [
  {
    id: "standardize-room",
    number: 1,
    title: "Turn every call into a clear next step",
    trigger: "A customer call starts",
    backgroundAction: "Following discovery + preparing the next-step pack",
    problem:
      "The useful part of a customer call often gets buried in notes. Reps still have to write the recap, update the deck, and turn open questions into a plan.",
    botJob:
      "Grok Bot follows the live notes and prepares the evaluation brief, owners, and follow-up. The rep reviews the work before anything leaves the account.",
    storyboard: [
      {
        when: "Call starts",
        label: "The call starts. Grok follows the notes without another prompt.",
        scene: "call",
        visual: {
          kind: "live-call",
          title: "Customer discovery",
          people: [
            { initials: "AE", name: "Scale AI seller" },
            { initials: "SP", name: "Customer sponsor" },
            { initials: "SE", name: "Security lead" },
          ],
        },
      },
      {
        when: "During discovery",
        label: "The evaluation goal and open questions land in the notes.",
        scene: "demo",
        visual: {
          kind: "live-transcript",
          timestamp: "Live",
          speaker: "Customer sponsor",
          quote: "We need a clear pass or fail on model quality before we expand.",
          signals: ["Evaluation goal", "Security review"],
        },
      },
      {
        when: "Before the call ends",
        label: "Grok turns the notes into a focused evaluation plan.",
        scene: "notes",
        visual: {
          kind: "deck-update",
          eyebrow: "Customer goal",
          headline: "A clear model-quality decision",
          product: "Evaluation plan",
          status: "Draft updated",
        },
      },
      {
        when: "Ready for review",
        label: "The recap, owners, and next-step slides are ready.",
        scene: "deck",
        slides: SAMPLE_FOLLOW_UP_SLIDES,
      },
    ],
    unlock:
      "The customer gets a recap that matches the conversation, with owners and a concrete next step.",
    outcome:
      "One customer call becomes a review-ready evaluation brief and follow-up.",
    clips: ["03-slides-granola"],
    demo: {
      title: "Room Ops",
      subtitle: "Live discovery · slides in their words",
      participants: [
        { id: "you", name: "You", role: "you" },
        {
          id: "room",
          name: "Room Ops",
          role: "bot",
          persona: "Turns live discovery into a focused evaluation brief",
          color: "#34C759",
        },
        {
          id: "slides",
          name: "Slides",
          role: "bot",
          persona: "Turns the customer's goal into owners and next steps",
          color: "#007AFF",
        },
      ],
      messages: [
        {
          id: "m1",
          from: "room",
          kind: "routine",
          body: "Customer call started. I am following the live notes for the evaluation goal, open questions, owners, and next steps.",
        },
        {
          id: "m2",
          from: "room",
          kind: "text",
          body: "The customer sponsor named the model-quality decision and the security review. I am adding both to the working brief.",
        },
        {
          id: "m3",
          from: "room",
          kind: "text",
          body: "The call is still live. I have the evaluation goal, the open security item, and the people who own each next step.",
        },
        {
          id: "m4",
          from: "slides",
          kind: "draft",
          draftLabel: "Last slides of the open deck · still on",
          artifact: {
            kind: "slides",
            title: "Customer evaluation plan",
            cards: SAMPLE_FOLLOW_UP_SLIDES,
          },
        },
        {
          id: "m5",
          from: "room",
          kind: "draft",
          draftLabel: "One-pager they can forward",
          artifact: {
            kind: "one-pager",
            title: "Customer evaluation brief",
            eyebrow: "One-pager",
            sections: [
              {
                heading: "Evaluation goal",
                body: "Reach a clear model-quality decision with written success criteria.",
              },
              {
                heading: "Security path",
                body: "Keep the security owner in the next review and use approved answers for every open item.",
              },
              {
                heading: "Evaluation scope",
                body: "Start with one workflow, the agreed data, and the team that owns the result.",
              },
              {
                heading: "Next step",
                body: "Confirm the owners, the evaluation inputs, and the date for the next review.",
              },
            ],
          },
        },
        {
          id: "m6",
          from: "room",
          kind: "draft",
          draftLabel: "Note they can send inside",
          artifact: {
            kind: "packet",
            title: "Forward this inside the account",
            fields: [
              {
                label: "Customer goal",
                value:
                  "Reach a clear pass or fail on model quality before expanding the program.",
              },
              {
                label: "Working plan",
                value:
                  "One evaluation workflow with written criteria, agreed inputs, and named owners.",
              },
              {
                label: "Open question",
                value:
                  "The security owner still needs to confirm the data and retention scope.",
              },
              {
                label: "Next meeting",
                value:
                  "Review the evaluation scope, close the security item, and confirm who makes the final decision.",
              },
            ],
          },
        },
        {
          id: "m7",
          from: "room",
          kind: "draft",
          draftLabel: "Gmail to your contact",
          artifact: {
            kind: "gmail",
            title: "Forward to your contact",
            to: "Customer contact",
            subject: "Evaluation plan and next steps",
            body: "Sharing the draft from today's call. It covers the evaluation goal, the owners, the open security item, and the next review. Nothing has been sent outside this draft.",
          },
        },
        {
          id: "m8",
          from: "room",
          kind: "system",
          body: "Nothing sent. Deck, one-pager, note, and Gmail stay drafts until you tap Send.",
        },
      ],
    },
  },
  {
    id: "legal-redlines",
    number: 2,
    title: "Answer security questions without the Slack chase",
    trigger: "A customer question lands",
    backgroundAction: "Finding approved answers + routing open items",
    problem:
      "A security questionnaire can send a seller through old docs and long Slack threads. The customer waits while internal teams answer the same questions again.",
    botJob:
      "Grok Bot finds approved answers, links each source, and routes only the open items. The seller reviews one draft instead of chasing every team.",
    storyboard: [
      {
        when: "Questionnaire arrives",
        label: "The customer sends a security review. Grok starts sorting it.",
        scene: "notes",
        visual: {
          kind: "procurement-email",
          sender: "Customer security team",
          subject: "Security review for the evaluation",
          questions: SAMPLE_SECURITY_RESPONSE.marks.length,
        },
      },
      {
        when: "Sources checked",
        label: "Grok finds the approved answers and marks the open item.",
        scene: "inspect",
        visual: {
          kind: "answers-found",
          sources: [
            { name: "Trust center", answer: "Controls linked" },
            { name: "Security library", answer: "Language checked" },
            { name: "Product docs", answer: "Scope confirmed" },
          ],
          status: "Approved answers found",
        },
      },
      {
        when: "Ready for review",
        label: "A sourced response waits for the seller and security owner.",
        scene: "send",
        visual: {
          kind: "reply-ready",
          to: "Customer security team",
          subject: "Security review · approved answers",
          status: "Ready to approve",
        },
      },
    ],
    unlock:
      "Customer questions come in. A sourced draft and a short list of open items come out.",
    outcome:
      "Grok finds approved answers and routes the exceptions, so the seller reviews one complete draft.",
    clips: ["01-morning-inbox"],
    demo: {
      title: "Paper",
      subtitle: "Security questions · sourced draft waiting",
      participants: [
        { id: "you", name: "You", role: "you" },
        {
          id: "paper",
          name: "Paper",
          role: "bot",
          persona: "Finds approved security answers and routes the open items",
          color: "#FF375F",
        },
      ],
      messages: [
        {
          id: "m1",
          from: "paper",
          kind: "routine",
          body: "A customer security review arrived. I am checking the trust center, approved security language, and product docs.",
        },
        {
          id: "m2",
          from: "paper",
          kind: "text",
          body: "The approved answers are ready. I routed the retention question to the account team and security owner. Nothing has been sent.",
        },
        {
          id: "m3",
          from: "paper",
          kind: "draft",
          draftLabel: "Questions + reply",
          artifact: SAMPLE_SECURITY_RESPONSE,
        },
        {
          id: "m4",
          from: "paper",
          kind: "draft",
          draftLabel: "Gmail reply · not sent",
          artifact: {
            kind: "gmail",
            title: "Reply to the customer security team",
            to: SAMPLE_SECURITY_RESPONSE.reply.to,
            subject: SAMPLE_SECURITY_RESPONSE.reply.subject,
            body: SAMPLE_SECURITY_RESPONSE.reply.body,
          },
        },
        {
          id: "m5",
          from: "paper",
          kind: "system",
          body: "Nothing sent. The reply stays a draft until you tap Send.",
        },
      ],
    },
  },
  {
    id: "attach-engine",
    number: 3,
    title: "Build outbound from real account signals",
    trigger: "A target account enters your list",
    backgroundAction: "Researching signals + building personalized outreach",
    problem:
      "A generic sequence gives the buyer no reason to care. The rep still has to find a real signal, work out who owns the problem, and write every first touch.",
    botJob:
      "When an account enters the target list, Grok Bot reads public sources, writes a clear account hypothesis, maps the likely owners, and prepares drafts. The rep decides what to send.",
    storyboard: [
      {
        when: "No meeting yet",
        label: "An example account enters the target list. Grok starts the research.",
        scene: "inspect",
        visual: {
          kind: "account-research",
          account: "Example account",
          sources: ["Careers", "Engineering", "Product updates"],
          signal: "Model evaluation hiring",
        },
      },
      {
        when: "Research complete",
        label: "It turns public evidence into a focused account hypothesis.",
        scene: "notes",
        visual: {
          kind: "three-why",
          items: [
            { label: "Why us", answer: "Evaluation workflow" },
            { label: "Why now", answer: "New AI program" },
            { label: "Why them", answer: "Own model quality" },
          ],
        },
      },
      {
        when: "Campaign ready",
        label: "The likely owner gets a draft tied to the public evidence.",
        scene: "map",
        visual: {
          kind: "outreach-ready",
          person: "AI platform lead",
          channels: ["LinkedIn", "Email", "Account page"],
          status: "Drafts ready · nothing sent",
        },
      },
      {
        when: "Ready for your click",
        label: "Research, message, and account page are ready for the rep.",
        scene: "send",
        artifact: SAMPLE_OUTBOUND,
      },
    ],
    unlock:
      "Research, evidence, likely owners, and sendable drafts. Nothing goes out until the rep approves it.",
    outcome:
      "One target account becomes a researched brief and personalized outreach drafts.",
    clips: ["02-prospecting-pg"],
    demo: {
      title: "Outbound",
      subtitle: "Research to a first meeting",
      participants: [
        { id: "you", name: "You", role: "you" },
        {
          id: "attach",
          name: "Outbound",
          role: "bot",
          persona: "Researches the account, writes the 3-why, and drafts the outreach",
          color: "#FF9500",
        },
      ],
      messages: [
        {
          id: "m1",
          from: "attach",
          kind: "routine",
          body: "An example account entered the target list. I am reading public sources, building the account hypothesis, and mapping the likely owners. Drafts only.",
        },
        {
          id: "m2",
          from: "attach",
          kind: "text",
          body: "The careers page and engineering posts both point to a formal model evaluation program. I am writing from that evidence, not from a generic persona.",
        },
        {
          id: "m3",
          from: "attach",
          kind: "draft",
          draftLabel: "3-why hypothesis",
          artifact: {
            kind: "packet",
            title: "Example account hypothesis",
            fields: SAMPLE_OUTBOUND.hypothesis.map((item) => ({
              label: item.k,
              value: item.body,
            })),
          },
        },
        {
          id: "m4",
          from: "attach",
          kind: "draft",
          draftLabel: "Evidence + who cares",
          artifact: {
            kind: "packet",
            title: "Proof, then the people",
            fields: [
              ...SAMPLE_OUTBOUND.evidence.map((item) => ({
                label: item.source,
                value: item.finding,
              })),
              ...SAMPLE_OUTBOUND.targets.map((person) => ({
                label: `${person.name} · ${person.role}`,
                value: person.why,
              })),
            ],
          },
        },
        {
          id: "m5",
          from: "attach",
          kind: "draft",
          draftLabel: "LinkedIn · not sent",
          artifact: {
            kind: "linkedin",
            title: "LinkedIn to the AI platform lead",
            to: "AI platform lead",
            role: "Example account",
            body: "Your open evaluation and safety roles point to a more formal model-quality program. I put together a short note on one way to make the evaluation workflow easier to run and review. Draft only. Nothing sent.",
          },
        },
        {
          id: "m6",
          from: "attach",
          kind: "draft",
          draftLabel: "Gmail · not sent",
          artifact: {
            kind: "gmail",
            title: "Email to the AI platform lead",
            to: "AI platform lead",
            subject: "A focused model evaluation workflow",
            body: "Your public hiring and engineering work point to a more formal model evaluation program. I put together a short note on starting with one workflow, written success criteria, and the team that owns the decision. Draft only until you tap Send.",
          },
        },
        {
          id: "m7",
          from: "attach",
          kind: "draft",
          draftLabel: "Page for this account · not live",
          artifact: {
            kind: "one-pager",
            title: SAMPLE_OUTBOUND.page.headline,
            eyebrow: "Page for Example account",
            sections: [
              {
                heading: "What we saw",
                body:
                  SAMPLE_OUTBOUND.evidence[0]?.finding ??
                  "Public hiring points to a model evaluation program.",
              },
              {
                heading: "Why this team",
                body:
                  SAMPLE_OUTBOUND.hypothesis.find(
                    (item) => item.k === "Why them",
                  )?.body ?? "The AI platform team owns the model workflow.",
              },
              {
                heading: "How the product maps",
                body: SAMPLE_OUTBOUND.page.body,
              },
            ],
          },
        },
        {
          id: "m8",
          from: "attach",
          kind: "system",
          body: "Nothing sent. LinkedIn, Gmail, and the page stay drafts until you tap Send.",
        },
      ],
    },
  }
];

export function getJob(id: string): CroJob | undefined {
  return JOBS.find((job) => job.id === id);
}
