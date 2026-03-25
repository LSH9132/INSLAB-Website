import { readMessages } from "@/lib/content-io";
import { MessageEditor } from "./editor";

export const dynamic = "force-dynamic";

export default function MessagesPage() {
  const en = readMessages("en");
  const ko = readMessages("ko");

  return (
    <div>
      <h2 className="text-xl font-bold text-gray-900 mb-6">i18n Messages</h2>
      <MessageEditor enMessages={en} koMessages={ko} />
    </div>
  );
}
