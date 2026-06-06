import { ImageResponse } from "next/og";
import { SITE_NAME } from "lib/site-config";
import { join } from "path";
import { readFile } from "fs/promises";

export type Props = { title?: string };

export default async function OpengraphImage(props?: Props): Promise<ImageResponse> {
  const title = props?.title ?? SITE_NAME;
  const fontFile = await readFile(join(process.cwd(), "./fonts/Inter-Bold.ttf"));
  const font = Uint8Array.from(fontFile).buffer;

  return new ImageResponse(
    (
      <div tw="flex h-full w-full flex-col items-center justify-center bg-[#131312]">
        <p tw="text-6xl font-bold text-[#f3ede6]">{title}</p>
        <p tw="mt-4 text-2xl text-[#bf3201]">brushpast.org</p>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [{ name: "Inter", data: font, style: "normal", weight: 700 }],
    },
  );
}
