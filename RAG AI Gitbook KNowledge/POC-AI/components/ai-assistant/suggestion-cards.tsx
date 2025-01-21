import { Card } from '@/components/ui/card';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { ChevronRight, BookOpen, Code, FileCode } from 'lucide-react';

interface SuggestionCardsProps {
  onSelectSuggestion: (question: string) => void;
}

const suggestions: { icon: React.ElementType; title: string; questions: string[] }[] = [
  {
    icon: BookOpen,
    title: "Understanding Trustless Work",
    questions: [
      "What is Trustless Work?",
      "How do smart contracts work in Trustless Work?",
      "Benefits of Trustless Work vs. traditional escrow?",
    ],
  },
  {
    icon: Code,
    title: "Integrating Trustless Work",
    questions: [
      "How to integrate Trustless Work's API?",
      "What tools does Trustless Work offer for integration?",
      "Are there setup guides for Trustless Work?",
    ],
  },
  {
    icon: FileCode,
    title: "Use Cases and Future",
    questions: [
      "Which industries benefit from Trustless Work?",
      "How can marketplaces use Trustless Work for trust?",
      "When is the mainnet launch?",
    ],
  },
] as const;

function SuggestionCard({
  icon: Icon,
  title,
  questions,
  onSelectSuggestion,
}: {
  icon: React.ElementType;
  title: string;
  questions: string[];
  onSelectSuggestion: (question: string) => void;
}) {
  return (
    <Card className="flex-shrink-0 w-[280px] p-4 hover:bg-muted/50 transition-colors">
      <div className="flex items-center gap-2 mb-3">
        <Icon className="w-5 h-5 text-primary" />
        <h3 className="font-semibold">{title}</h3>
      </div>
      <div className="space-y-2">
        {questions.map((question) => (
          <button
            key={question}
            type="button"
            onClick={() => onSelectSuggestion(question)}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground w-full text-left transition-colors group"
          >
            <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
            <span>{question}</span>
          </button>
        ))}
      </div>
    </Card>
  );
}

export default function SuggestionCards({ onSelectSuggestion }: SuggestionCardsProps) {
  return (
    <ScrollArea className="w-full">
      <div className="flex space-x-4 pb-4">
        {suggestions.map((category) => (
          <SuggestionCard
            key={category.title}
            icon={category.icon}
            title={category.title}
            questions={category.questions}
            onSelectSuggestion={onSelectSuggestion}
          />
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}