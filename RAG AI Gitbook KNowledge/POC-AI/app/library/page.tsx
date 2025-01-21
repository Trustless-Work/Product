/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabase-client";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

type Conversation = {
  id: string;
  user_id: string;
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  messages: any[];
  updated_at: string;
};

export default function Library() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/login");
    } else {
      fetchConversations();
    }
  }, [user, router]);

  const fetchConversations = async () => {
    if (user) {
      const { data, error } = await supabase
        .from("conversations")
        .select("*")
        .eq("user_id", user.id)
        .order("updated_at", { ascending: false });

      if (error) {
        console.error("Error fetching conversations:", error);
      } else {
        setConversations(data);
      }
    }
  };

  const handleConversationClick = (conversation: Conversation) => {
    // TODO: Implement navigation to individual conversation view
    console.log("Clicked conversation:", conversation);
  };

  if (!user) {
    return null;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Product Conversations</h1>
      <ScrollArea className="h-[calc(100vh-8rem)]">
        {conversations.map((conversation) => (
          <Button
            key={conversation.id}
            variant="ghost"
            className="w-full justify-start mb-2 p-4 text-left"
            onClick={() => handleConversationClick(conversation)}
          >
            <div>
              <p className="font-semibold">
                {conversation.messages[0]?.content.substring(0, 50)}...
              </p>
              <p className="text-sm text-muted-foreground">
                {new Date(conversation.updated_at).toLocaleString()}
              </p>
            </div>
          </Button>
        ))}
      </ScrollArea>
    </div>
  );
}
