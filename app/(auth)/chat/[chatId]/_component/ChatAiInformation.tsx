import { Avatar, AvatarImage } from "@/components/ui/avatar";

export function ChatAiInformation() {
  return (
    <div className="pt-20 px-4">
      <div className="flex items-center justify-center h-32">
        <Avatar className="size-20">
          <AvatarImage src="/asset/persona/ENTP.png" />
        </Avatar>
      </div>
    </div>
  );
}
