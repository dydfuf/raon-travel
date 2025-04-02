"use client";

import {
  ChatBubbleAction,
  ChatBubbleAvatar,
  ChatBubbleMessage,
} from "@/src/components/ui/chat/chat-bubble";
import { ChatMessageList } from "@/src/components/ui/chat/chat-message-list";
import { ChatBubble } from "@/src/components/ui/chat/chat-bubble";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { CoreMessage } from "ai";
import { useState } from "react";
import {
  CopyIcon,
  CornerDownLeft,
  Mic,
  Paperclip,
  RefreshCcw,
  Send,
  Volume2,
} from "lucide-react";
import { ChatInput } from "@/src/components/ui/chat/chat-input";
import { Button } from "@/components/ui/button";

const ChatAiIcons = [
  {
    icon: CopyIcon,
    label: "Copy",
  },
  {
    icon: RefreshCcw,
    label: "Refresh",
  },
  {
    icon: Volume2,
    label: "Volume",
  },
];

export default function Home() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<CoreMessage[]>([]);

  return (
    <main>
      <div>
        <ChatInput
          value={input}
          onChange={(event) => {
            setInput(event.target.value);
          }}
          onKeyDown={async (event) => {
            if (event.key === "Enter") {
              setMessages((currentMessages) => [
                ...currentMessages,
                { role: "user", content: input },
              ]);

              const response = await fetch("/api/chat", {
                method: "POST",
                body: JSON.stringify({
                  messages: [...messages, { role: "user", content: input }],
                }),
              });

              const { messages: newMessages } = await response.json();

              setMessages((currentMessages) => [
                ...currentMessages,
                ...newMessages,
              ]);
            }
          }}
        />

        <ChatMessageList>
          {messages.map((message, index) => (
            <ChatBubble
              key={`${message.role}-${index}`}
              variant={message.role == "user" ? "sent" : "received"}
            >
              <ChatBubbleAvatar
                src=""
                fallback={message.role == "user" ? "👨🏽" : "🤖"}
              />

              <ChatBubbleMessage>
                {messages.map((message, index) => (
                  <div key={`${message.role}-${index}`}>
                    {typeof message.content === "string"
                      ? message.content
                      : message.content
                          .filter((part) => part.type === "text")
                          .map((part, partIndex) => (
                            <Markdown
                              key={partIndex}
                              remarkPlugins={[remarkGfm]}
                            >
                              {part.text}
                            </Markdown>
                          ))}
                  </div>
                ))}

                {message.role === "assistant" &&
                  messages.length - 1 === index && (
                    <div className="flex items-center mt-1.5 gap-1">
                      {!isGenerating && (
                        <>
                          {ChatAiIcons.map((icon, iconIndex) => {
                            const Icon = icon.icon;
                            return (
                              <ChatBubbleAction
                                variant="outline"
                                className="size-5"
                                key={iconIndex}
                                icon={<Icon className="size-3" />}
                                onClick={() => {}}
                              />
                            );
                          })}
                        </>
                      )}
                    </div>
                  )}
              </ChatBubbleMessage>
            </ChatBubble>
          ))}
        </ChatMessageList>
      </div>
    </main>
  );
}
