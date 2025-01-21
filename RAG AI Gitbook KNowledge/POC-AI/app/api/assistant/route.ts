/* eslint-disable @typescript-eslint/no-explicit-any */
import { type NextRequest, NextResponse } from "next/server";
import { openai } from "@ai-sdk/openai";
import { streamText } from "ai";
import { gitBookSearchTool } from "@/app/tools/gitBookSearchTool";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { messages, selectedProject } = body;

    if (!selectedProject) {
      return NextResponse.json(
        { error: "No project selected" },
        { status: 400 }
      );
    }

    const filteredMessages = messages.filter(
      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
      (m: any) => m.content.trim() !== ""
    );

    // Add project information to the last message
    const lastMessage = filteredMessages[filteredMessages.length - 1];
    if (lastMessage) {
      lastMessage.project = selectedProject;
    }

    const result = streamText({
      model: openai("gpt-4o-mini"),
      messages: filteredMessages,
      tools: { gitBookSearch: gitBookSearchTool },
      maxSteps: 5,
    });

    return result.toDataStreamResponse();
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  } catch (error: any) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}