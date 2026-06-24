"use client";

import Image from "next/image";
import { useCallback, useEffect } from "react";
import { ArrowLeftIcon, ArrowRightIcon, XMarkIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";

type ImageLightboxProps = {
  images: string[];
  index: number;
  open: boolean;
  onClose: () => void;
  onIndexChange: (index: number) => void;
  alt?: string;
};

export function ImageLightbox({
  images,
  index,
  open,
  onClose,
  onIndexChange,
  alt = "",
}: ImageLightboxProps) {
  const hasMultiple = images.length > 1;
  const current = images[index];

  const goPrev = useCallback(() => {
    onIndexChange(index === 0 ? images.length - 1 : index - 1);
  }, [index, images.length, onIndexChange]);

  const goNext = useCallback(() => {
    onIndexChange((index + 1) % images.length);
  }, [index, images.length, onIndexChange]);

  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft" && hasMultiple) goPrev();
      if (e.key === "ArrowRight" && hasMultiple) goNext();
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose, goPrev, goNext, hasMultiple]);

  if (!open || !current) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex flex-col"
      role="dialog"
      aria-modal="true"
      aria-label="Image gallery"
    >
      <button
        type="button"
        className="absolute inset-0 bg-black/85 backdrop-blur-md"
        onClick={onClose}
        aria-label="Close gallery"
      />

      <button
        type="button"
        onClick={onClose}
        className="absolute right-4 top-4 z-20 rounded-full bg-white/10 p-2 text-white/90 backdrop-blur-sm transition hover:bg-white/20"
        aria-label="Close"
      >
        <XMarkIcon className="h-6 w-6" />
      </button>

      <div
        className="relative z-10 flex flex-1 items-center justify-center px-14 py-14 md:px-20"
        onClick={onClose}
      >
        {hasMultiple ? (
          <>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                goPrev();
              }}
              className="absolute left-3 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white backdrop-blur-sm transition hover:bg-white/20 md:left-6"
              aria-label="Previous image"
            >
              <ArrowLeftIcon className="h-6 w-6" />
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                goNext();
              }}
              className="absolute right-3 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white backdrop-blur-sm transition hover:bg-white/20 md:right-6"
              aria-label="Next image"
            >
              <ArrowRightIcon className="h-6 w-6" />
            </button>
          </>
        ) : null}

        <div
          className="relative h-[min(70vh,720px)] w-full max-w-5xl"
          onClick={(e) => e.stopPropagation()}
        >
          <Image
            key={current}
            src={current}
            alt={alt}
            fill
            className="object-contain"
            sizes="100vw"
            priority
          />
        </div>
      </div>

      {hasMultiple ? (
        <div
          className="relative z-10 border-t border-white/10 bg-black/50 px-4 py-4 backdrop-blur-md"
          onClick={(e) => e.stopPropagation()}
        >
          <ul className="mx-auto flex max-w-4xl items-center justify-center gap-3 overflow-x-auto pb-1">
            {images.map((url, i) => (
              <li key={`${url}-${i}`} className="shrink-0">
                <button
                  type="button"
                  onClick={() => onIndexChange(i)}
                  className={clsx(
                    "relative h-16 w-16 overflow-hidden rounded-sm border-2 transition md:h-20 md:w-20",
                    i === index
                      ? "border-white opacity-100 ring-2 ring-white/25"
                      : "border-transparent opacity-45 hover:opacity-75",
                  )}
                  aria-label={`View image ${i + 1} of ${images.length}`}
                  aria-current={i === index ? "true" : undefined}
                >
                  <Image src={url} alt="" fill className="object-cover" sizes="80px" />
                </button>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}
