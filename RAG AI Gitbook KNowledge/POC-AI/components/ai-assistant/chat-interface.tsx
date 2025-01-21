"use client";
import { useChat } from "ai/react";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import MessageList from "./message-list";
import MessageInput from "./message-input";
import { useProject } from "@/contexts/ProjectContext";
import { useEffect, useCallback } from "react";

export default function ChatInterface() {
  const { selectedProject } = useProject();

  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    error,
    reload,
    stop,
    setInput,
    setMessages,
  } = useChat({
    api: "/api/assistant",
    maxSteps: 5,
    body: {
      selectedProject: selectedProject ? {
        value: selectedProject.value,
        label: selectedProject.label,
      } : null
    },
    initialMessages: [
      {
        id: "welcome",
        role: "assistant",
        content:
          "Hi! I'm your product knowledge assistant. Please select a project to get started, and I'll help you find the information you need.",
      },
    ],
  });

  // Update welcome message when project is selected
  useEffect(() => {
    if (
      selectedProject &&
      messages.length === 1 &&
      messages[0].id === "welcome"
    ) {
      setMessages([
        {
          id: "welcome",
          role: "assistant",
          content: `Hi! I'm your product knowledge assistant for ${selectedProject.label}. I can provide detailed information about this project and help you understand its features. What would you like to learn more about?`,
        },
      ]);
    }
  }, [selectedProject, messages, setMessages]);

  const handleSendMessage = useCallback((message: string) => {
    if (!selectedProject) {
      setMessages([
        ...messages,
        {
          id: "error",
          role: "assistant",
          content: "Please select a project before sending a message.",
        },
      ]);
      return;
    }

    setInput(message);
    handleSubmit(new Event("submit"));
  }, [selectedProject, messages, setMessages, setInput, handleSubmit]);

  const handleMessageSubmit = useCallback((e: React.FormEvent) => {
    if (!selectedProject) {
      e.preventDefault();
      setMessages([
        ...messages,
        {
          id: "error",
          role: "assistant",
          content: "Please select a project before sending a message.",
        },
      ]);
      return;
    }
    handleSubmit(e);
  }, [selectedProject, messages, setMessages, handleSubmit]);

  return (
    <Card className="flex h-[calc(100vh-5rem)] flex-col gap-4 p-4">
      <ScrollArea className="flex-1 pr-4">
        <MessageList
          messages={messages}
          isLoading={isLoading}
          onSendMessage={handleSendMessage}
        />
      </ScrollArea>
      <div className="flex flex-col gap-2">
        {error && (
          <div className="text-sm text-red-500">
            Error: {error.message}
            {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
            <button
              onClick={() => reload()}
              className="ml-2 text-blue-500 hover:underline"
            >
              Try again
            </button>
          </div>
        )}
        <MessageInput
          input={input}
          handleInputChange={handleInputChange}
          handleSubmit={handleMessageSubmit}
          isLoading={isLoading}
          onStop={stop}
        />
      </div>
    </Card>
  );
}