/** Hand-coded copy for /stories/karl — Karl Rudziak portraiture */

const BASE = "/stories/KARL";

export const KARL_STORY = {
  slug: "karl",
  title: "Karl",
  location: "Portsmouth",
  tags: ["art", "community-stories", "portraiture"],
  tagsLabel: "Artist · Community · Portraiture",
  heroQuote: "Every portrait begins with a conversation.",
  heroQuoteHighlight: "conversation",
  heroImage: `${BASE}/mohawk.jpg`,
  /** Supporting gallery — remaining KARL assets not used as hero/Jed/Sandra */
  galleryImages: [`${BASE}/duo.jpg`] as const,
  introLead: [
    "Karl's work asks us to slow down.",
    "Behind every portrait is a person.",
    "Behind every person is a story.",
  ],
  introBody:
    "Through years of working alongside people experiencing homelessness, social-care challenges, and mental-health challenges, Karl has used portraiture to question first impressions and encourage conversations that might otherwise never happen.",
  portraits: [
    {
      id: "jed",
      name: "Jed",
      image: `${BASE}/jed.jpg`,
      imageAlt: "Portrait of Jed by Karl Rudziak",
      paragraphs: [
        "My 86-year-old dad had a fall, which came with a hip replacement and, in turn, a lot of recuperation and physiotherapy.",
        "During several hospital visits, Dad kept talking about this guy with lots of tattoos. I simply humoured him, but I was curious, so I asked one of the nurses what Dad was talking about. They pointed me towards Jed—Dad's physiotherapist.",
        "The painting says that you wouldn't want to see this guy on a dark night, but Jed is a healer and a lovely human being.",
      ],
    },
    {
      id: "sandra",
      name: "Sandra",
      image: `${BASE}/sandra.jpg`,
      imageAlt: "Portrait of Sandra by Karl Rudziak",
      paragraphs: [
        "Sandra lives in Somerstown, an area of Portsmouth.",
        'She is part of a project called We Don\'t Need Culture: an exploration and re-evaluation of the word "culture" through portraiture.',
        'Rudziak has found that some people are suspicious of the term "culture," with many regarding it as elitist, particularly within the context of arts and culture. The project attempts to break through that distrust in a grounded way through one-to-one interaction and pop-up exhibitions.',
        "Once I met Sandra, I knew I had to paint her. She is a well-known character in the area, but it took six weeks of coffee-morning visits to convince her to sit for me.",
      ],
    },
  ],
  midQuote: "Portraits don't change people. They change how we see.",
  themes: [
    {
      title: "Community",
      body: "Work rooted in real neighbourhoods and real conversations.",
    },
    {
      title: "Homelessness",
      body: "Portraiture that sits with people society too often brushes past.",
    },
    {
      title: "Conversation",
      body: "Every sitting begins with listening — not performance.",
    },
    {
      title: "Dignity",
      body: "First impressions questioned. People seen again, properly.",
    },
    {
      title: "Hope",
      body: "A slower look that makes space for someone else's story.",
    },
  ],
  explore: {
    eyebrow: "Explore Karl's story",
    body: "Visit Karl Rudziak's site to see more portraits and the projects behind them.",
    button: "Visit Karl Rudziak Artist",
    href: "https://www.rudziak.co.uk",
    urlLabel: "www.rudziak.co.uk",
    signature: "Rudziak ARTIST",
  },
  cta: {
    left: "Every story shared creates",
    highlight: "connection",
    right: "and opportunity.",
    aside: "Are you a creative with a story to share? We'd love to hear from you.",
    button: "Share your story",
    href: "/contact#contact-form",
  },
} as const;
