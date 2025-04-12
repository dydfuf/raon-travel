import ChatMessage from "./_component/ChatMessage";
import ChatMessageHeader from "./_component/ChatMessageHeader";

interface ChatPageProps {
  params: Promise<{
    chatId: string;
  }>;
}

export default async function ChatPage({ params }: ChatPageProps) {
  const { chatId } = await params;
  console.log({ chatId });

  return (
    <main className="h-full">
      <div className="relative">
        <div className="flex min-h-dvh">
          <main className="flex-1 min-h-dvh max-w-full">
            <div className="flex h-dvh">
              <div className="relative flex flex-col w-full items-center flex-1 h-dvh gap-4">
                <ChatMessageHeader title="채팅" />
                <ChatMessage />
              </div>
            </div>
          </main>
        </div>
      </div>
    </main>
  );
}
