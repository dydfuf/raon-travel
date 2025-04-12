import { ChevronLeft } from "lucide-react";
import Link from "next/link";

export default function ChatMessageHeader({ title }: { title: string }) {
  return (
    <div className="fixed left-0 top-0 w-screen h-16 z-[1] backdrop-blur-[20px] border-b-[0.5px] border-gray-200 dark:border-gray-800 flex items-center px-4">
      <div className="w-10">
        <Link href="/chat">
          <ChevronLeft size={24} />
        </Link>
      </div>
      <div className="flex-grow text-center font-semibold">{title}</div>
      <div className="w-10"></div> {/* Right spacer to center title */}
    </div>
  );
}
