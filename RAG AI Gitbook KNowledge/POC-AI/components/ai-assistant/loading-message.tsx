"use client";

import { Card } from "@/components/ui/card";
import { Bot } from "lucide-react";
import { motion } from "framer-motion";

export default function LoadingMessage() {
  return (
    <div className="flex items-start gap-3">
      <div className="rounded-full bg-primary/10 p-2">
        <Bot className="h-5 w-5" />
      </div>
      <Card className="flex-1 bg-muted/50 p-4">
        <div className="flex items-center gap-2">
          <motion.div
            className="flex gap-1.5"
            initial={false}
            animate={{
              transition: {
                staggerChildren: 0.2,
              },
            }}
          >
            {[...Array(3)].map((_, i) => (
              <motion.span
                // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                key={i}
                className="w-2 h-2 bg-primary/40 rounded-full"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 1, 0.3],
                }}
                transition={{
                  duration: 1,
                  repeat: Number.POSITIVE_INFINITY,
                  delay: i * 0.2,
                }}
              />
            ))}
          </motion.div>
          <span className="text-sm text-muted-foreground">
            Generating response...
          </span>
        </div>
        <motion.div
          className="mt-4 space-y-3"
          animate={{
            opacity: [0.5, 0.7, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
          }}
        >
          {[...Array(3)].map((_, i) => (
            <div
              // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
              key={i}
              className="h-4 bg-muted rounded"
              style={{ width: `${85 - i * 15}%` }}
            />
          ))}
        </motion.div>
      </Card>
    </div>
  );
}
