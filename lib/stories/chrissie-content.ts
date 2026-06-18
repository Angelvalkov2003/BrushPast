/** Hand-coded copy for /stories/chrissie */

export type ChrissieParagraph = {
  text: string;
  emphasis?: boolean;
  pull?: boolean;
  highlight?: string;
};

export type ChrissieColumn = {
  paragraphs: ChrissieParagraph[];
};

export const CHRISSIE_STORY = {
  slug: "chrissie",
  title: "Chrissie",
  tags: "Writing. Recovery. Community.",
  heroQuote: "I am here and I am grateful for all that life has presented me with.",
  heroQuoteHighlight: "grateful",
  heroImage: "/stories/CHRISSIE/1.jpeg",
  storyIntro:
    "A rainy morning, devastating news — and three story cards that changed the shape of the day.",
  storyColumns: [
    {
      paragraphs: [
        {
          text: "I woke up to a rainy, dark and stormy morning and a mind filled with heavy thoughts and concerns. My mood was low and sad feelings seemed to fill my whole being.",
        },
        {
          text: "Sitting by the window, watching the rain and battling with my emotions, I tried to focus and prepare for the day ahead.",
        },
        {
          text: "The ringing of the phone brought me back to the present moment….to a moment of devastating news.",
          pull: true,
          highlight: "devastating news",
        },
        {
          text: "A childhood friend had died during the night as a result of a lifelong battle with drugs and alcohol.",
          emphasis: true,
        },
        {
          text: "This unexpected death brought back painful memories of how my own life had been touched by drugs and alcohol.",
        },
        {
          text: "The countless deaths of family members, friends and clients, which I had to face and deal with over the years. So much loss, grief and sorrow.",
          pull: true,
          highlight: "loss, grief and sorrow",
        },
        {
          text: "Somehow, I dragged myself through the morning and while I sat and played with the idea of going back to bed, my eyes drifted over to a box, that lay in front of me on the table.",
        },
        {
          text: "It was a present which I had received the previous day. Besides a packet of delicious smelling coffee, it contained three cards which I picked up to read.",
        },
        {
          text: "As I became immersed into the first story, all thoughts of going back to bed vanished.",
          emphasis: true,
        },
      ],
    },
    {
      paragraphs: [
        {
          text: "Each card allowed me a glimpse into the life of a fellow human being.",
        },
        {
          text: "As each story unfolded, I became witness to the daily battles, the pain, the suffering and the struggles each storyteller had faced alone and was now sharing with me.",
          pull: true,
        },
        {
          text: "Accompanying them on their road to recovery, I was once again reminded of the power and the resilience of the human spirit, which I had personally experienced frequently during my years of working in the field of addiction.",
          highlight: "power and the resilience of the human spirit",
        },
        {
          text: "That moment when the decision is finally made, the first tentative step on the road to recovery is taken, the will to persevere and survive, becomes stronger than the lure of the drugs.",
          emphasis: true,
        },
        {
          text: "Reading about these different lives reminded me that, no matter how harsh and painful life can be, there is always, at some point during our life, a light at the end of the darkest tunnel.",
          highlight: "light at the end of the darkest tunnel",
        },
      ],
    },
    {
      paragraphs: [
        {
          text: "Acknowledging to myself at that moment just how precious life is, how blessed I am to be in this life and be surrounded by people who love me, brought me to tears.",
        },
        {
          text: "Tears for all the people lost, for the passing of my friend, but also tears of joy and laughter that I had shared with so many and will continue to share.",
          pull: true,
        },
        {
          text: "I looked out of the window; the rain had stopped and the sun was peeking through the clouds.",
          emphasis: true,
        },
        {
          text: "Feeling the warmth of the sun on my face, lifted my own dark cloud which had been hanging over me all morning and I smiled…..I am here and I am grateful for all that life has presented me with.",
          highlight: "grateful",
        },
        {
          text: "Life is good and I am thankful.",
          emphasis: true,
          highlight: "thankful",
        },
      ],
    },
  ] satisfies ChrissieColumn[],
  giftBox: {
    title: "The gift box",
    paragraphs: [
      "A packet of delicious smelling coffee and three story cards — a present from the day before, waiting on the table while grief pressed in at the window.",
      "Each card was a doorway into another life: daily battles, pain, suffering and struggle — shared openly, without performance.",
      "In the field of addiction, you learn to recognise that moment when the will to survive finally outweighs the lure of the drugs.",
    ],
    quote: "All thoughts of going back to bed vanished.",
  },
  notebookQuote:
    "No matter how harsh and painful life can be, there is always a light at the end of the darkest tunnel.",
  closingQuote: "Life is good and I am thankful.",
} as const;
