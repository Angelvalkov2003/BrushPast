"use client";

import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { ImageLightbox } from "components/shared/image-lightbox";

type JournalLightboxContextValue = {
  openAt: (index: number) => void;
} | null;

const JournalLightboxContext = createContext<JournalLightboxContextValue>(null);

export function JournalLightboxProvider({
  images,
  title,
  children,
}: {
  images: string[];
  title: string;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  const value = useMemo(
    () => ({
      openAt: (i: number) => {
        setIndex(i);
        setOpen(true);
      },
    }),
    [],
  );

  if (images.length === 0) return <>{children}</>;

  return (
    <JournalLightboxContext.Provider value={value}>
      {children}
      <ImageLightbox
        images={images}
        index={index}
        open={open}
        onClose={() => setOpen(false)}
        onIndexChange={setIndex}
        alt={title}
      />
    </JournalLightboxContext.Provider>
  );
}

export function JournalLightboxTrigger({
  index,
  children,
  className,
}: {
  index: number;
  children: ReactNode;
  className?: string;
}) {
  const ctx = useContext(JournalLightboxContext);

  return (
    <button
      type="button"
      onClick={() => ctx?.openAt(index)}
      className={
        className ??
        "block w-full cursor-zoom-in text-left transition-opacity hover:opacity-95 focus-visible:outline-offset-4"
      }
      aria-label="Open image"
    >
      {children}
    </button>
  );
}
