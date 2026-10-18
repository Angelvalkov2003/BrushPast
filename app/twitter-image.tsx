import OpengraphImage, { OG_CONTENT_TYPE, OG_SIZE } from "components/opengraph-image";

export const alt = "BrushPast";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  return await OpengraphImage();
}
