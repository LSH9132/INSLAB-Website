import { PreviewFrame } from "./preview-frame";

export const dynamic = "force-dynamic";

const SITE_URL = process.env.SITE_URL || "http://localhost";

export default function PreviewPage() {
  return <PreviewFrame siteUrl={SITE_URL} />;
}
