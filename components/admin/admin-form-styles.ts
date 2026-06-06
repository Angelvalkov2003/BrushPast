/** Shared layout + field styles for admin create/edit forms (desktop-friendly). */

export const adminFormClass =
  "w-full space-y-5 rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:space-y-6 sm:p-8 lg:p-10";

export const adminPanelClass =
  "w-full rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:p-8";

export const adminLabelClass = "block text-sm font-medium text-gray-800";

export const adminInputClass =
  "mt-1.5 w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-base text-gray-900 shadow-sm transition-colors placeholder:text-gray-400 focus:border-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-200 sm:py-2.5 sm:text-sm";

export const adminTextareaClass = `${adminInputClass} min-h-[7rem] resize-y leading-relaxed`;

export const adminTextareaLgClass = `${adminInputClass} min-h-[12rem] resize-y leading-relaxed`;

export const adminSelectClass = adminInputClass;

export const adminHelpClass = "mt-1.5 text-xs leading-relaxed text-gray-500";

export const adminGridClass = "grid gap-4 sm:grid-cols-2 sm:gap-5 xl:grid-cols-3";

export const adminGrid2Class = "grid gap-4 sm:gap-5 lg:grid-cols-2";

export const adminButtonClass =
  "rounded-lg bg-gray-900 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50 sm:py-2.5";

export const adminPageTitleClass = "mb-4 text-xl font-bold text-gray-900 sm:mb-6 sm:text-2xl";

export const adminPageHeaderClass =
  "mb-4 flex flex-col gap-3 sm:mb-6 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:gap-4";

export const adminPrimaryLinkClass =
  "inline-flex w-full items-center justify-center rounded-lg bg-gray-900 px-4 py-3 text-center text-sm font-medium text-white transition-colors hover:bg-gray-800 sm:w-auto sm:py-2";
