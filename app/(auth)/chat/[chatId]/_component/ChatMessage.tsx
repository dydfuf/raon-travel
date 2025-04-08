"use client";

import { Input } from "@/components/ui/input";
import { useChat } from "@ai-sdk/react";
import { useChatScroll } from "../_hook/useChatScroll";
import { FormEvent, useCallback, useEffect, useMemo } from "react";
import { UIMessage } from "ai";
import { compareDesc } from "date-fns";
import { ChatMessageItem } from "./ChatMessageItem";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { cn } from "@/lib/utils";

export default function ChatMessage() {
  const initialMessages: UIMessage[] = [];

  const { messages, input, setInput, append } = useChat({
    api: "/api/chat-stream",
  });
  const { containerRef, scrollToBottom } = useChatScroll();

  // Merge realtime messages with initial messages
  const allMessages = useMemo(() => {
    const mergedMessages = [...initialMessages, ...messages];
    // Remove duplicates based on message id
    const uniqueMessages = mergedMessages.filter(
      (message, index, self) =>
        index === self.findIndex((m) => m.id === message.id)
    );
    // Sort by creation date
    const sortedMessages = uniqueMessages.sort((a, b) => {
      if (!a.createdAt) return 1;
      if (!b.createdAt) return -1;
      return compareDesc(new Date(b.createdAt), new Date(a.createdAt));
    });

    return sortedMessages;
  }, [initialMessages, messages]);

  useEffect(() => {
    scrollToBottom();
  }, [allMessages, scrollToBottom]);

  const handleSendMessage = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      if (!input.trim()) return;

      append({ role: "user", content: input });

      setInput("");
    },
    [input, append, setInput]
  );

  return (
    <div className="flex flex-col h-full w-full bg-background text-foreground antialiased">
      {/* Messages */}
      <div ref={containerRef} className="flex-1 overflow-y-auto p-4 space-y-4">
        {allMessages.length === 0 ? (
          <div className="text-center text-sm text-muted-foreground">
            No messages yet. Start the conversation!
          </div>
        ) : null}
        <div className="space-y-1">
          {allMessages.map((message, index) => {
            const prevMessage = index > 0 ? allMessages[index - 1] : null;
            const showHeader =
              !prevMessage || prevMessage.role !== message.role;

            return (
              <div
                key={message.id}
                className="animate-in fade-in slide-in-from-bottom-4 duration-300"
              >
                <ChatMessageItem
                  message={message}
                  isOwnMessage={message.role === "user"}
                  showHeader={showHeader}
                />
              </div>
            );
          })}
        </div>
      </div>

      <form
        onSubmit={handleSendMessage}
        className="flex w-full gap-2 border-t border-border p-4"
      >
        <Input
          className={cn(
            "rounded-full bg-background text-sm transition-all duration-300",
            input.trim() ? "w-[calc(100%-36px)]" : "w-full"
          )}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
        />
        {input.trim() && (
          <Button
            className="aspect-square rounded-full animate-in fade-in slide-in-from-right-4 duration-300"
            type="submit"
          >
            <Send className="size-4" />
          </Button>
        )}
      </form>
    </div>
  );
}
