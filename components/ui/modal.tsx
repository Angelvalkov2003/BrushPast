"use client";

import { Dialog, DialogPanel, DialogTitle, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { Fragment, type ReactNode } from "react";
import {
  bpTitleClass,
  bpTitleUtility,
} from "components/home/home-typography";

export function Modal({
  open,
  onClose,
  title,
  children,
  panelClassName,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  panelClassName?: string;
}) {
  return (
    <Transition show={open}>
      <Dialog onClose={onClose} className="relative z-[80]">
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/40" aria-hidden="true" />
        </Transition.Child>
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-200"
            enterFrom="opacity-0 translate-y-4"
            enterTo="opacity-100 translate-y-0"
            leave="ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-4"
          >
            <DialogPanel
              className={clsx(
                "relative w-full max-w-md border border-bp-text/12 bg-bp-canvas p-6 shadow-[6px_8px_0_rgba(1,2,0,0.12)]",
                panelClassName,
              )}
            >
              <div className="mb-5 flex items-start justify-between gap-4">
                <DialogTitle
                  className={`${bpTitleClass} ${bpTitleUtility} text-2xl font-bold text-bp-text`}
                >
                  {title}
                </DialogTitle>
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close"
                  className="flex h-9 w-9 items-center justify-center border border-bp-text/15 text-bp-text hover:border-bp-accent"
                >
                  <XMarkIcon className="h-5 w-5" />
                </button>
              </div>
              {children}
            </DialogPanel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}
