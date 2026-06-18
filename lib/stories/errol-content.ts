/** Hand-coded copy for /stories/errol */

export type ErrolParagraph = {
  text: string;
  emphasis?: boolean;
  pull?: boolean;
  highlight?: string;
};

export type ErrolColumn = {
  paragraphs: ErrolParagraph[];
};

export const ERROL_STORY = {
  slug: "errol",
  title: "Errol",
  fullName: "Errol McGlashan",
  tags: "Writing. Photography. Recovery.",
  epigraph:
    "All shall be well, and all shall be well, and all manner of things shall be well.",
  epigraphAttribution: "Julian of Norwich",
  heroQuote: "My Kill List was really my Forgive List… I added my own name to it.",
  heroQuoteHighlight: "Forgive List",
  heroImage: "/stories/ERROL/1.webp",
  storyIntro:
    "Wronged, wronging, reckoning — and the long road from a kill list to forgiveness.",
  storyColumns: [
    {
      paragraphs: [
        {
          text: '"Occasionally, well every now and then, quite often actually, in fact several times a day; increasing in frequency the older I got, my thoughts were preoccupied with two main areas… the times I have been wronged. I was like…What? Is that it? They\'re just gonna get away with it? And the wrongs I have done. The wrongs I had got away with knowing that somewhere along the line there has to be a reckoning.',
        },
        {
          text: "The second to last time I was in prison I could not sleep for the first two months, nothing to smoke, feeling sorry for myself, and obsessive thinking.",
        },
        {
          text: "One restless night I got up and compiled a 'Kill List'. After that, I slept like a baby.",
          pull: true,
          highlight: "Kill List",
        },
        {
          text: "During my sentence I would add a few more names to the list as they came to mind.",
        },
        {
          text: "When I got out, Jay, a brilliant probation officer based at Stockwell, referred me to a specialist forensic therapy service that works with persistent offenders with suspect personality disorders.",
          emphasis: true,
        },
      ],
    },
    {
      paragraphs: [
        {
          text: "During weekly therapy/counselling sessions with Tamara I began to deal with the issue in my tissues. You know… the usual: anger management; coming to terms with my past; my early years spent in care; my troubled relationship with my mum after she snatched me away from my foster family; my years back in care as an adolescent and all the messed-up crap that came with that… don't get me started… addictions and my turbulent romantic entanglements. Definitely better late than never.",
        },
        {
          text: "And I got too long in the tooth to be running around up to all sorts, getting into altercations. It was getting ridiculously embarrassing. There I was a man in his 30's 40's 50's!!!! Getting banged up for anything from three months to three years for all kinds of petty bollocks.",
          pull: true,
        },
        {
          text: "So I'm in therapy in my 50's and I get diagnosed with Borderline Personality Disorder and Adult ADHD. I declined the Ritalin after one dose (it felt a bit too classy and I was becoming anti-drugs).",
        },
        {
          text: "I had a 40-year chronic weed addiction but I started to recognise it for what it was… come on, we all have something we know we are meant to be getting on with! Smoking weed is just a way of making yourself ok with being bored! If you wanna get shit done, Try Focusmate.com. Trust me it's a game changer. Thank me later.",
          emphasis: true,
        },
        {
          text: "Underneath my chronic procrastination were talents in writing, performing, running workshops, hosting events. I had previously managed to bang out the odd bit of award-winning Spoken Word here and there.",
        },
      ],
    },
    {
      paragraphs: [
        {
          text: "I also wrote a semi biographical one-man theatre show Something To Take Off The Edge (two mismatched cellmates develop an unlikely relationship as they flirt with heroin, chocolate Hobnobs and Shakespeare)) I have toured it extensively to prisons and hostels across the UK.",
        },
        {
          text: "The book version was published by Insurgent Press — copies available from the publisher, or purchase from me in person if you wanna avoid the postage fee.",
        },
        {
          text: "And after many decades of resistance I relented and gave my life to Christ and was baptised two years ago.",
          pull: true,
          highlight: "baptised",
        },
        {
          text: "My Kill List was really my Forgive List… I added my own name to it.",
          emphasis: true,
          highlight: "Forgive List",
        },
        {
          text: "Occasionally, well every now and then, quite often actually, in fact several times a day; increasing in frequency the older I get… I feel, like the hymn says, a Blessed Assurance, Phew, I made it, Thank you Jesus!!",
          highlight: "Blessed Assurance",
        },
      ],
    },
  ] satisfies ErrolColumn[],
  killList: {
    title: "The Kill List",
    paragraphs: [
      "Compiled on a restless night in prison — names added as they came to mind. It let him sleep. It also held everything he had not yet forgiven.",
      "Years of therapy at Stockwell, forensic counselling with Tamara, and the slow work of naming anger, care, addiction and love.",
      "The list did not disappear. It changed shape.",
    ],
    quote: "I added my own name to it.",
  },
  notebookQuote:
    "All shall be well, and all shall be well, and all manner of things shall be well.",
  closingQuote: "Phew, I made it, Thank you Jesus!!",
  bio: {
    title: "Now",
    paragraphs: [
      "Errol currently lives in Stockwell with his flatmate and two dogs Lucy and Ulla Blue.",
      "He is currently committing the Gospel of Mark to memory for a one man show he is taking to the 2026 Edinburgh Fringe Festival. Ten performances across three churches in Edinburgh.",
    ],
    showTitle: "The Greatest Story Ever Told",
    showDescription:
      "A dramatic recital of the Gospel of Mark performed entirely from memory. \"Whoever Has Ears to Hear.\"",
    showDates: "9th to 15th of August 2026",
  },
} as const;
