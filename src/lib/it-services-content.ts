/**
 * Central template content for the Northstar IT Services starter.
 * Frontend pages render from this file first; a CMS sync (see
 * docs/cms-sync-it-services.md) pushes the same shapes into Payload CMS.
 */

export type NavChild = { label: string; href: string };

export type NavLink = {
  label: string;
  href: string;
  isButton?: boolean;
  children?: NavChild[];
};

export type FooterColumn = {
  title: string;
  links: NavChild[];
};

export type SocialLink = {
  platform: "linkedin" | "twitter" | "github" | "youtube";
  label: string;
  url: string;
};

export type ServiceCard = {
  slug: string;
  title: string;
  summary: string;
  icon: string;
  image: string;
  bullets: string[];
};

export type PricingTier = {
  slug: string;
  name: string;
  price: string;
  cadence: string;
  description: string;
  features: string[];
  ctaLabel: string;
  ctaHref: string;
  highlight?: boolean;
};

export type Testimonial = {
  quote: string;
  name: string;
  title: string;
  company: string;
};

export type Faq = { question: string; answer: string };

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
  author: { name: string; role: string };
  body: string;
};

export type TeamMember = {
  name: string;
  role: string;
  bio: string;
  photo: string;
};

export type ProcessStep = {
  title: string;
  description: string;
};

export const siteSettings = {
  siteName: "Northstar IT Services",
  tagline: "Reliable IT partners for modern, secure, and fast-moving teams.",
  description:
    "Northstar IT Services is a B2B technology partner delivering managed IT, cloud migration, cybersecurity, custom software, and automation for growing companies.",
  email: "hello@northstar.example.com",
  supportEmail: "support@northstar.example.com",
  phone: "+1 (555) 010-4102",
  address: "500 Market Street, Suite 900, San Francisco, CA 94105",
  mapsEmbedUrl:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3152.6261944057!2d-122.40238212446!3d37.79297547197!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085807ded297e89%3A0xf84aa9b4fec2897e!2s500%20Market%20St%2C%20San%20Francisco%2C%20CA%2094105!5e0!3m2!1sen!2sus!4v1712345678901",
  copyright: `\u00A9 ${new Date().getFullYear()} Northstar IT Services. All rights reserved.`,
};

export const socialLinks: SocialLink[] = [
  { platform: "linkedin", label: "LinkedIn", url: "https://www.linkedin.com/company/example" },
  { platform: "twitter", label: "X / Twitter", url: "https://twitter.com/example" },
  { platform: "github", label: "GitHub", url: "https://github.com/example" },
  { platform: "youtube", label: "YouTube", url: "https://www.youtube.com/@example" },
];

export const navLinks: NavLink[] = [
  { label: "Services", href: "/services" },
  { label: "Pricing", href: "/pricing" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact", isButton: true },
];

export const footerColumns: FooterColumn[] = [
  {
    title: "Services",
    links: [
      { label: "Managed IT", href: "/services#managed-it" },
      { label: "Cloud Migration", href: "/services#cloud-migration" },
      { label: "Cybersecurity", href: "/services#cybersecurity" },
      { label: "Custom Software", href: "/services#custom-software" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Blog", href: "/blog" },
      { label: "Pricing", href: "/pricing" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Help Center", href: "/contact" },
      { label: "Status", href: "/contact" },
      { label: "Privacy Policy", href: "/legal/privacy-policy" },
    ],
  },
];

export const hero = {
  eyebrow: "Northstar IT Services",
  heading: "Modern IT partners\nfor teams that ship.",
  subheading:
    "We run the platforms, secure the perimeter, and build the software that keeps your business moving — so your team can stay focused on customers.",
  primaryCta: { label: "Talk to an engineer", href: "/contact" },
  secondaryCta: { label: "See services", href: "/services" },
  backgroundImage:
    "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2000&auto=format&fit=crop",
  stats: [
    { value: "99.98%", label: "Average uptime" },
    { value: "24/7", label: "Incident response" },
    { value: "120+", label: "Workloads migrated" },
    { value: "SOC 2", label: "Aligned controls" },
  ],
};

export const logos = [
  "Northwind",
  "Acme Robotics",
  "BluePeak",
  "Helios Labs",
  "Atrium",
  "Quorum",
];

export const services: ServiceCard[] = [
  {
    slug: "managed-it",
    title: "Managed IT",
    summary:
      "Proactive monitoring, patching, device management, and an actual human on the other end of every ticket.",
    icon: "server",
    image:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1600&auto=format&fit=crop",
    bullets: [
      "24/7 monitoring and alerting",
      "Identity, SSO, and device management",
      "Predictable monthly pricing",
    ],
  },
  {
    slug: "cloud-migration",
    title: "Cloud Migration",
    summary:
      "Move workloads to AWS, GCP, or Azure with a plan that favors reliability and cost clarity over buzzwords.",
    icon: "cloud",
    image:
      "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=80&w=1600&auto=format&fit=crop",
    bullets: [
      "Discovery, assessment, and landing zone design",
      "Zero-downtime cutover playbooks",
      "FinOps and post-migration tuning",
    ],
  },
  {
    slug: "cybersecurity",
    title: "Cybersecurity",
    summary:
      "Harden your stack end to end: identity, endpoints, network, and the humans who click on things.",
    icon: "shield",
    image:
      "https://images.unsplash.com/photo-1510511459019-5dda7724fd87?q=80&w=1600&auto=format&fit=crop",
    bullets: [
      "Threat detection and response",
      "Vulnerability and penetration testing",
      "SOC 2 / ISO 27001 readiness",
    ],
  },
  {
    slug: "custom-software",
    title: "Custom Software",
    summary:
      "Product-minded engineering teams that ship durable, well-tested software — not throwaway prototypes.",
    icon: "code",
    image:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1600&auto=format&fit=crop",
    bullets: [
      "Full-stack web and mobile delivery",
      "API and integration platforms",
      "Modernization of legacy systems",
    ],
  },
  {
    slug: "data-automation",
    title: "Data & Automation",
    summary:
      "Turn operations data into dashboards and automations that actually change what your team does each day.",
    icon: "chart",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1600&auto=format&fit=crop",
    bullets: [
      "Warehouses, ELT, and analytics",
      "Workflow automation across tools",
      "AI integration and evaluation",
    ],
  },
  {
    slug: "support-desk",
    title: "Support Desk",
    summary:
      "A single trusted place for your team to get help — with SLAs measured in minutes, not business days.",
    icon: "headset",
    image:
      "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=1600&auto=format&fit=crop",
    bullets: [
      "Tier 1–3 ticket coverage",
      "Onboarding and offboarding runbooks",
      "Quarterly business reviews",
    ],
  },
];

export const processSteps: ProcessStep[] = [
  {
    title: "Discover",
    description:
      "A structured audit of your stack, risks, and priorities — then a shared plan with clear scope.",
  },
  {
    title: "Design",
    description:
      "Reference architectures, runbooks, and change plans that your team can actually own after we leave.",
  },
  {
    title: "Deliver",
    description:
      "Short cycles, paired reviews, and measurable outcomes — migrations, rollouts, or new software.",
  },
  {
    title: "Operate",
    description:
      "Observability, patching, and on-call that keeps systems healthy between releases.",
  },
];

export const pricingTiers: PricingTier[] = [
  {
    slug: "essentials",
    name: "Essentials",
    price: "$1,800",
    cadence: "per month",
    description: "For small teams that need reliable coverage without a full IT department.",
    features: [
      "Up to 25 seats",
      "Business-hours support",
      "Endpoint management and patching",
      "Monthly reporting",
    ],
    ctaLabel: "Start with Essentials",
    ctaHref: "/contact",
  },
  {
    slug: "growth",
    name: "Growth",
    price: "$4,200",
    cadence: "per month",
    description: "For scaling companies running cloud workloads and customer-facing software.",
    features: [
      "Up to 100 seats",
      "24/7 incident response",
      "Cloud cost and security reviews",
      "Quarterly roadmap sessions",
    ],
    ctaLabel: "Start with Growth",
    ctaHref: "/contact",
    highlight: true,
  },
  {
    slug: "enterprise",
    name: "Enterprise",
    price: "Custom",
    cadence: "",
    description: "For regulated or multi-region organizations that need a dedicated partner.",
    features: [
      "Unlimited seats",
      "Named technical account manager",
      "SOC 2 / ISO 27001 support",
      "Custom SLAs and reporting",
    ],
    ctaLabel: "Contact sales",
    ctaHref: "/contact",
  },
];

export const testimonials: Testimonial[] = [
  {
    quote:
      "Northstar cut our cloud bill by 38% in the first quarter and then helped us pass SOC 2 three months ahead of plan.",
    name: "Priya Narayanan",
    title: "VP Engineering",
    company: "Atrium",
  },
  {
    quote:
      "Their team just shows up and fixes things. Our internal engineers finally get to work on product instead of on-call.",
    name: "Marcus Reyes",
    title: "CTO",
    company: "BluePeak",
  },
  {
    quote:
      "From migration plan through cutover weekend, they treated our platform like it was their own. Exactly what we hoped for.",
    name: "Jules Dubois",
    title: "Head of Platform",
    company: "Helios Labs",
  },
];

export const teamMembers: TeamMember[] = [
  {
    name: "Alex Morgan",
    role: "Managing Partner",
    bio: "Twenty years across managed services, cloud, and compliance. Former head of platform at a Series D fintech.",
    photo:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=800&auto=format&fit=crop",
  },
  {
    name: "Rina Okafor",
    role: "Director of Engineering",
    bio: "Leads the software practice. Ex-principal engineer at a global logistics company.",
    photo:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop",
  },
  {
    name: "Daniel Chen",
    role: "Security Lead",
    bio: "Runs the offensive security and compliance practices. CISSP and OSCP certified.",
    photo:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=800&auto=format&fit=crop",
  },
  {
    name: "Sofia Lindgren",
    role: "Operations Lead",
    bio: "Keeps the support desk and on-call rotations running. Previously at a regional MSP with 4,000 seats.",
    photo:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=800&auto=format&fit=crop",
  },
];

export const faqs: Faq[] = [
  {
    question: "How long does a typical engagement take?",
    answer:
      "Most discovery phases take 2–4 weeks. From there, delivery timelines vary by scope, but we target short, measurable cycles rather than multi-quarter waterfalls.",
  },
  {
    question: "Do you work with companies outside the US?",
    answer:
      "Yes. Our delivery team is distributed across North America and Europe, and we frequently staff engagements across both time zones.",
  },
  {
    question: "Can you augment an existing in-house team?",
    answer:
      "Absolutely. Many engagements start as staff augmentation alongside a client's platform or security team, with clear boundaries and shared tooling.",
  },
  {
    question: "What about SOC 2 and other compliance audits?",
    answer:
      "We help with readiness, evidence collection, and policy work. We are not an auditor, but we work well alongside firms like Vanta, Drata, and the major audit partners.",
  },
];

export const aboutPage = {
  eyebrow: "About Northstar",
  heading: "We run the systems behind serious businesses.",
  lead:
    "Northstar IT Services started in 2016 when a small group of platform engineers kept being asked the same question by their former teammates: \u201Ccan you just run our infrastructure for us?\u201D Today we are a cross-functional team of engineers, security specialists, and operators serving mid-market companies across North America and Europe.",
  paragraphs: [
    "We focus on outcomes our clients can measure. Fewer outages. Lower cloud bills. Passing audits. Faster releases. Calmer on-call rotations.",
    "We are deliberately not the biggest IT firm. We are a focused partner that earns the trust of your engineering and operations teams, and then sticks around for the long run.",
  ],
  stats: [
    { value: "2016", label: "Founded" },
    { value: "45", label: "Engineers" },
    { value: "80+", label: "Active clients" },
    { value: "4.8 / 5", label: "NPS" },
  ],
  image:
    "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1800&auto=format&fit=crop",
  values: [
    {
      title: "Own the outcome",
      description:
        "We measure ourselves against the numbers our clients care about — uptime, cost, time-to-ship, audit findings.",
    },
    {
      title: "Calm by default",
      description:
        "Drama is a symptom. We invest in tools, runbooks, and handoffs that keep the system steady even when the quarter gets loud.",
    },
    {
      title: "Transfer knowledge",
      description:
        "Every engagement ends with your team understanding what we built, how it works, and how to extend it.",
    },
    {
      title: "Pragmatic security",
      description:
        "We pick controls that hold up under real attacks and real audits — not whichever checklist is trending that month.",
    },
  ],
};

export const contactPage = {
  heading: "Let\u2019s talk.",
  subheading:
    "Tell us a bit about your team and what you are trying to improve. We usually reply within one business day.",
  reasons: [
    "Managed IT & support",
    "Cloud migration or cost review",
    "Security readiness / audit prep",
    "Custom software engagement",
    "Just a conversation",
  ],
  responseTime: "Usually replies in under 1 business day.",
};

export const blogCategories = ["All", "Cloud", "Security", "Automation", "Operations"];

export const blogPosts: BlogPost[] = [
  {
    slug: "right-sizing-aws-for-growing-teams",
    title: "Right-sizing AWS for growing teams without breaking production",
    excerpt:
      "A simple, boring playbook we use to trim 20–40% from most AWS bills without touching application code.",
    category: "Cloud",
    date: "2026-02-14",
    readTime: "7 min read",
    image:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1600&auto=format&fit=crop",
    author: { name: "Alex Morgan", role: "Managing Partner" },
    body:
      "Most cloud bills grow in three places: idle development environments, oversized databases, and orphaned resources from deprecated services. Before reaching for reserved instances or complex savings plans, we start by asking the boring questions. Which workloads can be shut down overnight? Which databases are sized for peaks that never happen? Which S3 buckets are paying for data nobody has read in 18 months?\n\nA good right-sizing pass is about visibility first, not negotiation. Cost Explorer, Athena over the CUR, and a shared spreadsheet usually beat any expensive tool — especially when paired with an engineering team that actually owns the numbers. Once you have that, savings plans become a tool for locking in the right baseline rather than a magic discount.",
  },
  {
    slug: "incident-runbooks-that-people-actually-use",
    title: "Incident runbooks that people actually use at 3am",
    excerpt:
      "Runbooks die in Confluence when they are too long. Here is the short format our on-call engineers reach for first.",
    category: "Operations",
    date: "2026-01-22",
    readTime: "5 min read",
    image:
      "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=1600&auto=format&fit=crop",
    author: { name: "Sofia Lindgren", role: "Operations Lead" },
    body:
      "A good runbook answers three questions fast: how do I know this is happening, what do I check next, and what is the rollback. Everything else is appendix material. We keep each runbook to a single page, with the first section always focused on \u201Cdeclare the incident.\u201D\n\nWe test runbooks by having an engineer who did not write them run them during a game day. If they get stuck for more than 90 seconds on any step, we rewrite that step. That single habit has kept our MTTR trending down across every client we have supported since 2022.",
  },
  {
    slug: "what-soc2-actually-requires",
    title: "What SOC 2 actually requires from your platform team",
    excerpt:
      "Strip away the theater and SOC 2 is mostly about boring, provable habits. Here is the short version.",
    category: "Security",
    date: "2025-12-10",
    readTime: "8 min read",
    image:
      "https://images.unsplash.com/photo-1510511459019-5dda7724fd87?q=80&w=1600&auto=format&fit=crop",
    author: { name: "Daniel Chen", role: "Security Lead" },
    body:
      "Most of SOC 2 is not surprising. Your auditor wants to see that you have policies, that those policies match reality, and that you keep evidence. The surprise is how much of the work is organizational rather than technical. MFA, logging, and access reviews are straightforward once a platform team is committed. The harder parts tend to be vendor reviews, onboarding/offboarding hygiene, and keeping training records up to date.\n\nThe good news: a well-run engineering org is already doing most of this. A readiness engagement is mostly about collecting the evidence that already exists, fixing the last 10% where reality drifted from policy, and picking a compliance tool you will actually keep using after the audit.",
  },
  {
    slug: "automating-onboarding-with-terraform",
    title: "Automating new-hire onboarding with Terraform and one SCIM provider",
    excerpt:
      "How a small investment in identity-as-code pays back every time someone joins, changes roles, or leaves.",
    category: "Automation",
    date: "2025-11-18",
    readTime: "6 min read",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1600&auto=format&fit=crop",
    author: { name: "Rina Okafor", role: "Director of Engineering" },
    body:
      "Most onboarding pain comes from brittle, one-off scripts that only one person understands. Replacing that with a small Terraform module that describes every role — what apps, what groups, what permissions — tends to pay back inside a quarter.\n\nWe usually start with the identity provider, because SCIM provisioning fans out from there to most SaaS tools. From there, we describe roles declaratively and treat changes to those roles as reviewable pull requests. Offboarding becomes a single PR. Promotions become a diff a manager can approve in Slack. And no one has to remember \u201Coh right, this user also has access to the billing dashboard.\u201D",
  },
];

export const blogFallbackBody = blogPosts[0].body;

export const imageAssets = {
  teamPhoto:
    "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1800&auto=format&fit=crop",
  dashboardScreenshot:
    "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1800&auto=format&fit=crop",
  datacenter:
    "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1800&auto=format&fit=crop",
  security:
    "https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=1800&auto=format&fit=crop",
};
