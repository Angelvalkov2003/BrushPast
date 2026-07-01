import { PageTransition } from "components/layout/page-transition";
import { ReactNode } from "react";

export default function RootTemplate({ children }: { children: ReactNode }) {
  return <PageTransition>{children}</PageTransition>;
}
