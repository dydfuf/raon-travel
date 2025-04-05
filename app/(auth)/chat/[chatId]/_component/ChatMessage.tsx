"use client";

import { Input } from "@/components/ui/input";
import { useChat } from "@ai-sdk/react";

export default function ChatMessage() {
  const { messages, input, setInput, append } = useChat({
    api: "/api/chat-stream",
  });

  return (
    <div>
      <Input
        value={input}
        onChange={(event) => {
          setInput(event.target.value);
        }}
        onKeyDown={async (event) => {
          if (event.key === "Enter") {
            await append({
              role: "user",
              content: input,
            });
          }
        }}
      />

      {messages.map((message, index) => (
        <div key={index}>{message.content}</div>
      ))}
    </div>
  );
}
