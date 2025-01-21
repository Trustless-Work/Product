/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

interface AIAnswer {
  text: string;
  markdown: string;
  followupQuestions: string[];
  sources: Array<{
    space: string;
    page: string;
    sections: string[];
  }>;
}

export default function GitBookContent() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState<AIAnswer | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAnswer = async (query: string) => {
    setLoading(true);
    setError(null);
    setAnswer(null);

    try {
      const response = await fetch("/api/gitbook", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch answer");
      }

      const data = await response.json();
      setAnswer(data.answer);
      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (question.trim()) {
      fetchAnswer(question);
    }
  };

  return (
    <div className="p-6">
      <form onSubmit={handleSubmit} className="flex space-x-4 mb-6">
        <Input
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Ask a question..."
          className="flex-grow"
        />
        <Button type="submit" disabled={loading}>
          {loading ? "Loading..." : "Ask"}
        </Button>
      </form>

      {error && <p className="text-red-500 mt-4">{error}</p>}

      {answer && (
        <Card>
          <CardHeader>
            <CardTitle>Answer</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">{answer.text}</p>
            <div
              className="prose mb-4"
              // biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
              dangerouslySetInnerHTML={{ __html: answer.markdown }}
            />

            {answer.followupQuestions.length > 0 && (
              <div className="mt-4">
                <h3 className="font-semibold mb-2">Follow-up Questions:</h3>
                <ul className="list-disc list-inside">
                  {answer.followupQuestions.map((q, index) => (
                    // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                    <li key={index}>{q}</li>
                  ))}
                </ul>
              </div>
            )}

            {answer.sources.length > 0 && (
              <div className="mt-4">
                <h3 className="font-semibold mb-2">Sources:</h3>
                <ul className="list-disc list-inside">
                  {answer.sources.map((source, index) => (
                    // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                    <li key={index}>
                      <Link
                        href={`https://app.gitbook.com/o/${source.space}/s/${source.page}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500"
                      >
                        View Source {index + 1}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
