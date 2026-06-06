import { RoundaboutMeetingPage } from "components/stories/roundabout-meeting/roundabout-meeting-page";
import { ROUNDABOUT_MEETING } from "lib/stories/the-roundabout-meeting-content";

export const metadata = {
  title: ROUNDABOUT_MEETING.title,
  description: ROUNDABOUT_MEETING.heroQuote,
};

export const dynamic = "force-dynamic";

export default function Page() {
  return <RoundaboutMeetingPage />;
}
