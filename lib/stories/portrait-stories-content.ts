/** Shared portrait / subject story shape for Karl, Jed, Sandra */

export type PortraitStoryBlock =
  | { type: "lead"; text: string }
  | { type: "body"; text: string }
  | { type: "pair"; lines: [string, string] }
  | { type: "quote"; text: string };

export type PortraitStory = {
  slug: string;
  title: string;
  location?: string;
  metaNote?: string;
  tags: string;
  heroQuote?: string;
  blocks: PortraitStoryBlock[];
  /** Optional known image; otherwise page shows a ready slot */
  heroImage?: string;
  artSlots: { label: string; note: string }[];
};

export const KARL_STORY: PortraitStory = {
  slug: "karl",
  title: "Karl",
  location: "Portsmouth",
  metaNote: "6",
  tags: "Portraiture. Community. Conversation.",
  heroQuote: "Every portrait begins with a conversation.",
  blocks: [
    { type: "lead", text: "Every portrait begins with a conversation." },
    { type: "body", text: "Karl's work asks us to slow down." },
    {
      type: "pair",
      lines: [
        "Behind every portrait is a person.",
        "Behind every person is a story.",
      ],
    },
    {
      type: "body",
      text: "Through years of working alongside people experiencing homelessness, social-care challenges, and mental-health challenges, Karl has used portraiture to question first impressions and encourage conversations that might otherwise never happen.",
    },
  ],
  artSlots: [
    {
      label: "Portrait 1",
      note: "IMAGE NEEDED: Karl portrait / related artwork",
    },
    {
      label: "Portrait 2",
      note: "IMAGE NEEDED: Supporting photograph or painting",
    },
  ],
};

export const JED_STORY: PortraitStory = {
  slug: "jed",
  title: "Jed",
  tags: "Portraiture. Care. First impressions.",
  heroQuote: "Portraits don't change people. They change how we see.",
  blocks: [
    {
      type: "body",
      text: "My 86-year-old dad had a fall, which came with a hip replacement and, in turn, a lot of recuperation and physiotherapy.",
    },
    {
      type: "body",
      text: "During several hospital visits, Dad kept talking about this guy with lots of tattoos. I simply humoured him, but I was curious, so I asked one of the nurses what Dad was talking about. They pointed me towards Jed—Dad's physiotherapist.",
    },
    {
      type: "body",
      text: "The painting says that you wouldn't want to see this guy on a dark night, but Jed is a healer and a lovely human being.",
    },
    {
      type: "quote",
      text: "Portraits don't change people. They change how we see.",
    },
  ],
  artSlots: [
    {
      label: "Jed portrait",
      note: "IMAGE NEEDED: Jed portrait painting",
    },
    {
      label: "Detail",
      note: "IMAGE NEEDED: Detail or process photograph",
    },
  ],
};

export const SANDRA_STORY: PortraitStory = {
  slug: "sandra",
  title: "Sandra",
  location: "Somerstown, Portsmouth",
  tags: "Portraiture. Culture. Community.",
  heroQuote: "Once I met Sandra, I knew I had to paint her.",
  blocks: [
    {
      type: "body",
      text: "Sandra lives in Somerstown, an area of Portsmouth.",
    },
    {
      type: "body",
      text: "She is part of a project called We Don't Need Culture: an exploration and re-evaluation of the word \"culture\" through portraiture.",
    },
    {
      type: "body",
      text: 'Rudziak has found that some people are suspicious of the term "culture," with many regarding it as elitist, particularly within the context of arts and culture. The project attempts to break through that distrust in a grounded way through one-to-one interaction and pop-up exhibitions.',
    },
    {
      type: "body",
      text: "Once I met Sandra, I knew I had to paint her. She is a well-known character in the area, but it took six weeks of coffee-morning visits to convince her to sit for me.",
    },
  ],
  artSlots: [
    {
      label: "Sandra portrait",
      note: "IMAGE NEEDED: Sandra portrait painting",
    },
    {
      label: "Project photo",
      note: "IMAGE NEEDED: We Don't Need Culture project photograph",
    },
  ],
};
