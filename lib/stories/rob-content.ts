/** Hand-coded copy for /stories/rob - Glitch + Rob's story */

export type RobPoemLine = {
  text: string;
  emphasis?: boolean;
  highlight?: string;
  pull?: boolean;
};

export type RobPoemStanza = {
  lines: RobPoemLine[];
};

export type RobParagraph = {
  text: string;
  emphasis?: boolean;
  pull?: boolean;
  highlight?: string;
};

export type RobColumn = {
  paragraphs: RobParagraph[];
};

export const ROB_STORY = {
  slug: "rob",
  title: "Rob",
  poemTitle: "Glitch",
  credits: {
    words: "Words by Rob",
    photography: "Photography by Sam",
  },
  tags: "Writing. Art. Recovery.",
  heroQuote: "I am just a glitch in your perfect system.",
  heroQuoteHighlight: "glitch",
  heroImage: "/stories/ROB'S-POEM/1.png",
  poemIntro: '"There has been a…"',
  poemStanzas: [
    {
      lines: [
        { text: "As I lie in a ditch. A bitch. A parasite" },
        { text: "A whore of society to challenge your sobriety" },
        { text: "A sore to be scratched off like an itch" },
        { text: "Just a glitch", emphasis: true, highlight: "glitch" },
        { text: "Human scum. A man on the run" },
        { text: "A druggy, a drunkard, an explosive gun..." },
        { text: "Or perhaps I am none - of these!" },
        { text: "I beg for reprieve as I cough and splutter" },
        { text: "in my gutter and wheeze" },
      ],
    },
    {
      lines: [
        { text: "A glitch in the system", highlight: "glitch" },
        { text: "Through my own ill-gotten reasons" },
        { text: "Treasons to the sanctuary of my heart" },
        { text: "As I lie here" },
        { text: "Often cold, tormented and torn apart" },
        { text: "And no, I'm not whole as I lie in my hole" },
        { text: "A sometimes lonely, downtrodden" },
        { text: "And broken soul", emphasis: true },
      ],
    },
    {
      lines: [
        { text: "I know" },
        { text: "You say you see me" },
        { text: "But really" },
        { text: "You just look" },
        { text: "Right through me", pull: true, highlight: "through me" },
        { text: "I am sure I exist" },
        { text: "But to you" },
        { text: "I am just a glitch", highlight: "glitch" },
        { text: "A glitch" },
        { text: "In your perfect system", emphasis: true },
      ],
    },
  ] satisfies RobPoemStanza[],
  storyHeading: "Rob's story",
  storyIntro:
    "Homelessness is devastating - mentally, emotionally and physically. In Rob's own words.",
  storyColumns: [
    {
      paragraphs: [
        {
          text: "Homelessness is Devastating… Mentally, Emotionally and Physically… It impacts your whole World. Your Relationships, your prospects, your health, your self-esteem, confidence and ability to provide for yourself and those you care for…",
          emphasis: true,
        },
        {
          text: "Having Experienced Homelessness now on and off for the last 16 years, I consider myself very lucky to be Alive!!! By the grace of God, good people and my tenacity to overcome obstacles I am still here… although barely!",
          pull: true,
          highlight: "lucky to be Alive",
        },
        {
          text: "Often broken, troubled, tormented and Confused I somehow managed to navigate the Trauma, craziness and Insanity often found 'Rough-Sleeping', Sofa-surfing and being insecurely housed in temporary or short-term accommodations.",
        },
      ],
    },
    {
      paragraphs: [
        {
          text: "The loneliness, isolation and depression. The constant fear and threat of violence and abuse whilst living on the streets and constant temptation to succumb to 'Whatever Substances' may Annihilate my pain were ever present….",
        },
        {
          text: "In short, I would NOT wish Homelessness on anyone…",
          pull: true,
        },
        {
          text: "Being able to Write, paint and draw along with Meditation allowed me to Keep a sense of purpose and hope and thanks to Jeremy and David at Brushpast I now have an opportunity to share some of my work with you!!!",
          highlight: "sense of purpose and hope",
        },
        {
          text: "There's loads to come - although it may take some time!!!",
        },
      ],
    },
    {
      paragraphs: [
        {
          text: "I hope that through some of my Poems and words people may Gain a greater understanding of the problems faced by Homelessness and through some of my Art that people will realise that even those who have had to spend a majority of their lives \"Living in the gutter\" are STILL CAPABLE of Creating things of Beauty and have something to offer the World…",
          emphasis: true,
          highlight: "STILL CAPABLE",
        },
        {
          text: "We are ALL Beautiful people regardless of our circumstances 🙏🙂…",
        },
        {
          text: "For anyone who is Struggling - Have Faith, Belief in yourself and Never Give Up!!! Remember you Are \"Priceless\" ❤️",
          pull: true,
          highlight: "Priceless",
        },
      ],
    },
  ] satisfies RobColumn[],
  glitchNote: {
    title: "Glitch",
    quote: "You just look right through me.",
  },
  notebookQuote:
    "Even those who have spent a majority of their lives living in the gutter are still capable of creating things of beauty.",
  closingQuote: "Remember you are Priceless.",
} as const;
