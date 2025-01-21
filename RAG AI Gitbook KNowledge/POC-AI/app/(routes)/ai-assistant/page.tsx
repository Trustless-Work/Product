import ChatInterface from "@/components/ai-assistant/chat-interface";

export const metadata = {
  title: "TrustAI - Product Knowledge Assistant",
  description: "Query GitBook documentation, GitHub repositories, and coding knowledge in real-time. Empower your development with instant, accurate, and contextual AI assistance.",
};

export default function AIAssistantPage() {
  return (
    <div className="container mx-auto p-4 max-w-5xl">
      <ChatInterface />
    </div>
  );
}
