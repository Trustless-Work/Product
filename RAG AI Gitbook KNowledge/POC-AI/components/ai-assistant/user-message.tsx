'use client'

import type { Message } from 'ai';
import { Card } from '@/components/ui/card';
import { User } from 'lucide-react';

interface UserMessageProps {
  message: Message;
}

export default function UserMessage({ message }: UserMessageProps) {
  return (
    <div className="flex items-start gap-3">
      <div className="rounded-full bg-secondary p-2">
        <User className="h-5 w-5" />
      </div>
      <Card className="flex-1 bg-background p-4">
        <p className="whitespace-pre-wrap">{message.content}</p>
      </Card>
    </div>
  );
}