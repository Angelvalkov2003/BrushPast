/** Hand-coded copy for /stories/david — The Rooms */

export const DAVID_STORY = {
  slug: "david",
  title: "David",
  headline: "David",
  subtitle: "The Rooms",
  heroQuote: "Conversation = Freedom!",
  location: "London",
  year: "2025",
  heroImage: "/david.png",
  portraitImage: "/david.png",
  handwrittenQuote:
    "As a child I was sent to my room, without a voice to reply, or knowing how to reply, to await my outcome.",
  narrativeMiddle: [
    "Sometimes the outcome would be full of joy, other times, my outcome would be full of pain.",
    "As a teenager, as I battled with myself to scrape out an identity for myself, coming from a dysfunctional room (home), I was sent to many different rooms (cells!) by those who thought they knew what was best for me.",
    "Within those rooms (prison cells) I found and embraced a lifestyle that I thought would free me!",
  ],
  narrativeRight: [
    "In fact, it caused me to spend many more years in and out of those same rooms (prison cells) and lose out on many of life's love and opportunities.",
    "To say I had a love/hate with a room would not be wrong.",
    "Today the hate is gone and the love is strong — I have found a set of rooms that allow me to be safe, fully free, and be me.",
    "The Rooms of Recovery & Fellowship have allowed me to embrace the shadows of my life and to finally have peace within.",
  ],
  pullQuote:
    "And my hope is to allow others to be heard, especially those who are seen but not heard, and those heard but not seen (there's more to this person!)",
  reflectionParagraphs: [
    "Writing in prison gave me a language when I had none. The Koestler Awards showed me that expression could travel beyond the cell door — that someone might read a line and see a whole person, not a number.",
    "BrushPast grew from that belief: that creativity, mentorship and honest conversation can help people drop the masks we wear to survive.",
    "Today I work to create rooms — real and metaphorical — where people can speak without performing, and be met with dignity rather than judgment.",
  ],
  features: [
    {
      id: "rooms",
      title: "The Rooms",
      image: "/story-reflection.jpg",
      body: "From childhood bedrooms to prison cells to recovery rooms — each space shaped who I became, until I learned to choose the rooms that set me free.",
    },
    {
      id: "conversation",
      title: "Conversation creates freedom",
      icon: "chat" as const,
      body: "Freedom begins when someone is finally heard. Conversation is not small talk — it is the door out of isolation.",
    },
    {
      id: "cells",
      title: "From cells to community",
      image: "/story-reflection.jpg",
      imageGrayscale: true,
      body: "Years inside taught me what it costs to be unseen. Community taught me what it means to belong again.",
    },
    {
      id: "coffee",
      title: "Take a box, start a conversation",
      icon: "coffee" as const,
      body: "Our coffee gift boxes carry stories into everyday spaces — a simple way to begin a dialogue and support the work.",
      href: "/shop",
    },
  ],
  footerCta: {
    left: "Don't just BrushPast!",
    center:
      "Your support helps us give people the chance to tell their stories, drop the masks, and step into a future filled with hope.",
    button: "Get in touch",
    href: "/contact#contact-form",
  },
} as const;
