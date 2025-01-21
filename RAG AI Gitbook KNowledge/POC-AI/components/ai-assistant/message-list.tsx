// components/sections/ai-assistant/message-list.tsx
import type { Message } from 'ai';
import { motion, AnimatePresence } from 'framer-motion';
import AIMessage from './ai-message';
import UserMessage from './user-message';
import LoadingMessage from './loading-message';
import SuggestionCards from './suggestion-cards';
import { useEffect, useRef } from 'react';

interface MessageListProps {
  messages: Message[];
  isLoading: boolean;
  onSendMessage: (message: string) => void;
}

export default function MessageList({ messages, isLoading, onSendMessage }: MessageListProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
    useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Show suggestions only after the welcome message
  const showSuggestions = messages.length === 1 && messages[0].role === 'assistant';

  return (
    <div className="space-y-6">
      <AnimatePresence mode="sync">
        {messages.filter((m) => m.content.trim() !== "").map((message) => (
          <motion.div
            key={message.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col gap-2"
          >
            {message.role === 'assistant' ? (
              <AIMessage message={message} />
            ) : (
              <UserMessage message={message} />
            )}
          </motion.div>
        ))}

        {showSuggestions && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="pt-2"
          >
            <div className="text-sm text-muted-foreground mb-3">
              Here are some popular questions to get you started:
            </div>
            <SuggestionCards onSelectSuggestion={onSendMessage} />
          </motion.div>
        )}

        {isLoading && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <LoadingMessage />
          </motion.div>
        )}
      </AnimatePresence>
      <div ref={messagesEndRef} />
    </div>
  );
}