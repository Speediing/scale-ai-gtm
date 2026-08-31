export type HeroJobIcon =
  | "outbound"
  | "research"
  | "follow-up"
  | "security"
  | "evaluation"
  | "expansion"
  | "competitive"
  | "chief-of-staff";

export type HeroJob = {
  name: string;
  icon: HeroJobIcon;
  account: string;
  signal: string;
  work: string;
  result: string;
  user: string;
  bot: string;
};

export const HERO_JOBS = [
  {
    name: "Sales Outbound",
    icon: "outbound",
    account: "Target account",
    signal: "New AI infrastructure roles",
    work: "I mapped the team, read the public hiring plan, and drafted outreach around the work they are staffing for.",
    result: "Personalized email drafts ready",
    user: "queue the strongest drafts for review",
    bot: "queued. nothing will send without your approval.",
  },
  {
    name: "Account Research",
    icon: "research",
    account: "Strategic account",
    signal: "New model evaluation program",
    work: "I pulled the public context, mapped the likely buying team, and prepared a brief with clear reasons to reach out.",
    result: "Account brief and outreach angles ready",
    user: "brief me before the call",
    bot: "sent. i will keep the brief current.",
  },
  {
    name: "Call Follow-up",
    icon: "follow-up",
    account: "Customer discovery",
    signal: "Discovery call ended",
    work: "I captured the evaluation goals, owners, and open questions, then drafted the recap in the customer's language.",
    result: "Recap and evaluation brief ready",
    user: "share the recap with me",
    bot: "shared. the customer draft is still waiting.",
  },
  {
    name: "Security Responses",
    icon: "security",
    account: "Enterprise evaluation",
    signal: "Security questionnaire arrived",
    work: "I found approved answers in the trust materials and internal docs, then separated the open items for review.",
    result: "Sourced response draft ready",
    user: "route the open items to security",
    bot: "routed. the answered items stay in draft.",
  },
  {
    name: "Evaluation Pilot",
    icon: "evaluation",
    account: "Active evaluation",
    signal: "New pilot feedback arrived",
    work: "I grouped the feedback by owner, updated the open tasks, and prepared the next evaluation check-in.",
    result: "Evaluation update ready",
    user: "send me the open items",
    bot: "sent to you. the customer note is still a draft.",
  },
  {
    name: "Expansion Signals",
    icon: "expansion",
    account: "Existing customer",
    signal: "Another team started an AI project",
    work: "I mapped the new team, connected its work to the current account plan, and prepared a focused expansion brief.",
    result: "Expansion brief ready",
    user: "share it with the account team",
    bot: "shared internally. i will watch for more changes.",
  },
  {
    name: "Competitive Intel",
    icon: "competitive",
    account: "Open opportunity",
    signal: "A competitor came up on the call",
    work: "I found the exact concern, matched it to approved proof, and drafted a talk track for this buyer.",
    result: "Competitive response ready",
    user: "add it to the next call brief",
    bot: "added. the rep has the approved proof points.",
  },
  {
    name: "Sales Chief of Staff",
    icon: "chief-of-staff",
    account: "Weekly account review",
    signal: "Open decisions need owners",
    work: "I gathered account changes, evaluation risks, and team commitments, then prepared the decisions that need attention.",
    result: "Operating brief ready",
    user: "send me the brief",
    bot: "sent to you. nothing went to the customer.",
  },
] as const satisfies readonly HeroJob[];
