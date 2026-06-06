/** Hand-coded copy for /stories/jamie */

export type JamieParagraph = {
  text: string;
  /** Larger handwritten emphasis */
  emphasis?: boolean;
  /** Margin pull-quote style */
  pull?: boolean;
  /** Red brush underline on phrase */
  highlight?: string;
};

export type JamieColumn = {
  paragraphs: JamieParagraph[];
};

export const JAMIE_STORY = {
  slug: "jamie",
  title: "Jamie",
  tags: "Recovery. Hope. Community.",
  heroQuote:
    "This is not a sob story. I consider myself to be one of the very fortunate ones.",
  heroQuoteHighlight: "fortunate ones",
  heroImage: "/Jamie.png",
  storyIntro: "A survivor story — told in his own words.",
  storyColumns: [
    {
      paragraphs: [
        {
          text: "I never forget 'The luckiest man alive' receiving his award. I loved that YouTube video so much it has stuck with me — it encapsulates my life and what it can be.",
          emphasis: true,
        },
        {
          text: "This is a survivor story in so much as it is a triumph over all the obstacles I faced growing up: surviving homelessness, criminality, and all through my alcohol and drug addiction.",
        },
        {
          text: "I'm 52 this year on the right side of the road.",
          pull: true,
          highlight: "52",
        },
        {
          text: "As you can see I'm not exactly long in the tooth. But to make it to my age, having had a chronic short shelf-life expectancy, is lucky.",
        },
        {
          text: "If you talk about being middle-aged, most people haven't got to 40 — and here I am at 52.",
        },
        {
          text: "I think of all those who died young on the streets, who all died a tragic death.",
        },
        {
          text: "Still people die young because of addiction; sure enough addicts do, but there are just as many who have choice but still live on the streets without the addiction.",
        },
        {
          text: "I have humbly got through my thirties and forties.",
        },
        {
          text: "My amazing family — my partner Sharon and sons Marc — you know, all children are blessings.",
          emphasis: true,
        },
        {
          text: "But I'm still doing the groundwork for my retirement, in the years that I most certainly won't be able to work as I have done.",
        },
      ],
    },
    {
      paragraphs: [
        {
          text: "School was never my thing. I left at fifteen and the streets took over before I knew what I was doing.",
        },
        {
          text: "Homeless at sixteen, addicted by eighteen — those aren't labels I wear for sympathy. They're facts I lived.",
          pull: true,
        },
        {
          text: "Prison became a revolving door. Not because I was violent, but because addiction had its hooks in deep and I didn't know another way yet.",
        },
        {
          text: "Somewhere in the chaos I found people who didn't judge. Recovery meetings, peer support, a room where you could speak without performing.",
        },
        {
          text: "I learned that recovery isn't a straight line. You fall, you get back up, you fall again — and slowly the gaps get shorter.",
          emphasis: true,
        },
        {
          text: "Groundswell gave me a voice when I thought nobody wanted to hear it. Health advocacy, storytelling, dignity — things I didn't know I was allowed to want.",
        },
        {
          text: "Today I work with people who are where I was. Not as an expert who has it figured out. As someone who's been there.",
        },
        {
          text: "Zines and photography became proof I existed beyond the statistics people used to describe me.",
        },
      ],
    },
    {
      paragraphs: [
        {
          text: "BrushPast gave me something I didn't expect — a platform where the work can speak before the backstory has to.",
        },
        {
          text: "I don't share to inspire pity. I share because someone once reached a hand back to me when I was face down.",
          pull: true,
        },
        {
          text: "Fragments of estate life — told honestly, without polish — are still worth telling.",
        },
        {
          text: "Every workshop, every conversation, every cup of coffee at London Coffee Factory is another way of saying: you belong here.",
        },
        {
          text: "The more recovering people there are in society, the better it is for all of us.",
          emphasis: true,
        },
        {
          text: "If my story helps one person feel less alone, that's enough.",
        },
        {
          text: "This is not a sob story. I consider myself one of the very fortunate ones — and I intend to keep reaching back.",
          highlight: "fortunate ones",
        },
      ],
    },
  ] satisfies JamieColumn[],
  reachingBack: {
    title: "A hand reaching back",
    paragraphs: [
      "Recovery taught me that survival isn't the finish line. The real work is what you do with the second chance — how you show up for the next person who thinks they're out of options.",
      "I've sat in rooms where nobody wanted to be the first to speak. I've also been the person who needed someone to say: I've been there too.",
      "If you can hold your hand out in some small way — a conversation, a workshop, a story shared — then when another fallen person reaches out, we are there to help.",
    ],
    quote: "I've been there too.",
  },
  notebookQuote:
    "If you can hold your hand out in some small way, so when another fallen person reaches out, we are there to help.",
  closingQuote:
    "The more recovering people there are in society, the better it is for all of us.",
  cta: {
    left: "Share a story. Start a conversation. Help someone feel less alone.",
    right: "Don't just brush past!",
  },
} as const;
