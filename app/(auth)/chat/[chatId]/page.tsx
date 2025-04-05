import ChatMessage from "./_component/ChatMessage";

interface ChatPageProps {
  params: {
    chatId: string;
  };
}

export default function ChatPage({ params }: ChatPageProps) {
  const { chatId } = params;
  console.log({ chatId });

  return (
    <div>
      <ChatMessage />
    </div>
  );
}
