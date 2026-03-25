import { PreviewFrame } from "./preview-frame";

export const dynamic = "force-dynamic";

const SITE_URL = process.env.SITE_URL || "http://localhost";
const PREVIEW_URL = process.env.PREVIEW_URL || "http://localhost:9980";

export default function PreviewPage() {
  return <PreviewFrame siteUrl={SITE_URL} previewUrl={PREVIEW_URL} />;
}
