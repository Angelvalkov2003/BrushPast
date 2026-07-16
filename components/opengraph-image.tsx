import { ImageResponse } from "next/og";
import { SITE_NAME, SITE_TAGLINE } from "lib/site-config";
import { join } from "path";
import { readFile } from "fs/promises";

export type Props = {
  title?: string;
  subtitle?: string;
};

export const OG_SIZE = { width: 1200, height: 630 } as const;
export const OG_CONTENT_TYPE = "image/png";

export default async function OpengraphImage(
  props?: Props,
): Promise<ImageResponse> {
  const title = props?.title ?? SITE_NAME;
  const subtitle = props?.subtitle ?? SITE_TAGLINE;

  const [fontFile, heroFile, logoFile] = await Promise.all([
    readFile(join(process.cwd(), "./fonts/Inter-Bold.ttf")),
    readFile(join(process.cwd(), "./public/home-hero.png")),
    readFile(join(process.cwd(), "./public/logosmall.png")),
  ]);

  const font = Uint8Array.from(fontFile).buffer;
  const heroSrc = Uint8Array.from(heroFile).buffer;
  const logoSrc = Uint8Array.from(logoFile).buffer;

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          height: "100%",
          width: "100%",
          position: "relative",
          backgroundColor: "#131312",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={heroSrc as unknown as string}
          alt=""
          width={1200}
          height={630}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            background:
              "linear-gradient(115deg, rgba(19,19,18,0.88) 0%, rgba(19,19,18,0.55) 48%, rgba(191,50,1,0.35) 100%)",
          }}
        />
        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            height: "100%",
            width: "100%",
            padding: "56px 64px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={logoSrc as unknown as string}
              alt=""
              width={72}
              height={72}
              style={{
                width: 72,
                height: 72,
                objectFit: "contain",
                borderRadius: 8,
              }}
            />
          </div>

          <div style={{ display: "flex", flexDirection: "column", maxWidth: 900 }}>
            <p
              style={{
                margin: 0,
                fontSize: 72,
                lineHeight: 1.05,
                fontWeight: 700,
                color: "#f3ede6",
                fontFamily: "Inter",
              }}
            >
              {title}
            </p>
            <p
              style={{
                margin: "20px 0 0",
                fontSize: 28,
                lineHeight: 1.35,
                color: "#f3ede6",
                opacity: 0.9,
                fontFamily: "Inter",
              }}
            >
              {subtitle.length > 140 ? `${subtitle.slice(0, 137)}…` : subtitle}
            </p>
            <p
              style={{
                margin: "28px 0 0",
                fontSize: 24,
                fontWeight: 700,
                color: "#bf3201",
                fontFamily: "Inter",
              }}
            >
              brushpast.org
            </p>
          </div>
        </div>
      </div>
    ),
    {
      ...OG_SIZE,
      fonts: [{ name: "Inter", data: font, style: "normal", weight: 700 }],
    },
  );
}
