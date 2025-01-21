/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import { useState } from 'react';
import type { Message } from 'ai';
import { Card } from '@/components/ui/card';
import { Bot, Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import  ReactMarkdown  from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface AIMessageProps {
  message: Message;
}

function CodeBlock({ language, value }: { language: string; value: string }) {
  const [isCopied, setIsCopied] = useState(false);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(value);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="relative group my-4">
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity"
        onClick={copyToClipboard}
      >
        {isCopied ? (
          <Check className="h-4 w-4" />
        ) : (
          <Copy className="h-4 w-4" />
        )}
      </Button>
      <SyntaxHighlighter
        language={language}
        style={oneDark}
        customStyle={{
          marginTop: 0,
          marginBottom: 0,
          padding: '1.5rem 1rem',
          borderRadius: '0.5rem',
        }}
      >
        {value}
      </SyntaxHighlighter>
    </div>
  );
}

export default function AIMessage({ message }: AIMessageProps) {
  return (
    <div className="flex items-start gap-3">
      <div className="rounded-full bg-primary/10 p-2">
        <Bot className="h-5 w-5" />
      </div>
      <Card className="flex-1 bg-muted/50 p-4 max-w-full overflow-hidden">
        <ReactMarkdown
          components={{
            // Headers with consistent styling and proper spacing
            h1: ({ node, ...props }) => (
              <h1 className="text-2xl font-bold mb-4 text-primary" {...props} />
            ),
            h2: ({ node, ...props }) => (
              <h2 className="text-xl font-semibold mb-3 text-primary/90" {...props} />
            ),
            h3: ({ node, ...props }) => (
              <h3 className="text-lg font-medium mb-2" {...props} />
            ),
            // Improved paragraph readability
            p: ({ node, ...props }) => (
              <p className="mb-4 leading-relaxed text-base last:mb-0" {...props} />
            ),
            // Enhanced list styling
            ul: ({ node, ...props }) => (
              <ul className="mb-4 list-disc pl-4 space-y-2 last:mb-0" {...props} />
            ),
            ol: ({ node, ...props }) => (
              <ol className="mb-4 list-decimal pl-4 space-y-2 last:mb-0" {...props} />
            ),
            li: ({ node, ...props }) => (
              <li className="text-base leading-relaxed" {...props} />
            ),
            // Improved code blocks and inline code
            code: ({ node, inline, className, children, ...props }) => {
              const match = /language-(\w+)/.exec(className || '');
              if (inline) {
                return (
                  <code className="px-1.5 py-0.5 bg-muted rounded font-mono text-sm" {...props}>
                    {children}
                  </code>
                );
              }
              return (
                <CodeBlock
                  language={match ? match[1] : 'text'}
                  value={String(children).replace(/\n$/, '')}
                />
              );
            },
            // Better blockquote styling
            blockquote: ({ node, ...props }) => (
              <blockquote className="border-l-4 border-primary/20 pl-4 italic my-4" {...props} />
            ),
            // Improved link styling
            a: ({ node, ...props }) => (
              <a 
                className="text-primary underline hover:no-underline transition-colors"
                target="_blank"
                rel="noopener noreferrer"
                {...props}
              />
            ),
            // Better table styling
            table: ({ node, ...props }) => (
              <div className="overflow-x-auto my-4">
                <table className="min-w-full divide-y divide-border" {...props} />
              </div>
            ),
            th: ({ node, ...props }) => (
              <th className="px-4 py-2 text-left font-medium bg-muted" {...props} />
            ),
            td: ({ node, ...props }) => (
              <td className="px-4 py-2 border-t border-border" {...props} />
            ),
            // Handle images with proper sizing and loading
            img: ({ node, ...props }) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                className="max-w-full h-auto rounded-lg my-4"
                loading="lazy"
                {...props}
                alt={props.alt || 'Image'}
              />
            ),
          }}
        >
          {message.content}
        </ReactMarkdown>
      </Card>
    </div>
  );
}