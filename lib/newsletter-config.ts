export const NEWSLETTER_SOURCE_HOME = "join-the-story" as const;
export const NEWSLETTER_SOURCE_ABOUT = "stay-in-the-loop" as const;

export type NewsletterSource =
  | typeof NEWSLETTER_SOURCE_HOME
  | typeof NEWSLETTER_SOURCE_ABOUT;

export const NEWSLETTER_SOURCE_LABELS: Record<string, string> = {
  [NEWSLETTER_SOURCE_HOME]: "Join the story",
  [NEWSLETTER_SOURCE_ABOUT]: "Stay in the loop",
};
