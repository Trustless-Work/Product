import React from "react";
import {
  ArrowRight,
  Shield,
  Laptop,
  Brain,
  FileCode,
  BookOpenText,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="space-y-16 py-8">
      {/* Hero Section */}
      <section className="text-center space-y-6">
        <h1 className="text-4xl py-10 md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#252838] to-[#7cc635]">
          Your AI-Powered <br/>Product Knowledge Assistant
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
          Query GitBook documentation, GitHub repositories, and coding knowledge
          in real-time. Empower your development with instant, accurate, and
          contextual AI assistance.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button asChild size="lg" className="gap-2">
            <Link href="/ai-assistant">
              Try the AI Chat <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/library">Explore the Knowledge Base</Link>
          </Button>
        </div>
      </section>

      {/* Key Features Section */}
      <section className="space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold">
            What Can the AI Chat Do for You?
          </h2>
          <p className="text-muted-foreground mt-2">
            Designed for developers integrating Trustless Work and Stellar-based
            systems.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpenText className="h-5 w-5 text-blue-500" />
                GitBook Documentation Insights
              </CardTitle>
              <CardDescription>
                Instantly query Trustless Work documentation for precise
                answers.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
                <li>Find best practices and setup guides</li>
                <li>Clarify Trustless Work concepts</li>
                <li>Get configuration examples</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileCode className="h-5 w-5 text-green-500" />
                GitHub Repository Queries
              </CardTitle>
              <CardDescription>
                Scan and index Markdown documentation from GitHub repositories.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
                <li>Navigate project codebases easily</li>
                <li>Retrieve relevant code snippets</li>
                <li>Stay updated with evolving content</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5 text-purple-500" />
                Technical Coding Assistance
              </CardTitle>
              <CardDescription>
                Get help with Rust programming, debugging, and general
                development.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
                <li>Understand Rust syntax and concepts</li>
                <li>Debug code efficiently</li>
                <li>Improve your coding workflow</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="space-y-8 bg-muted/50 rounded-lg p-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold">
            Why Our AI-Powered Platform Stands Out
          </h2>
          <p className="text-muted-foreground mt-2">
            Built to accelerate your development journey and streamline
            integration with Trustless Work.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              icon: BookOpenText,
              title: "Comprehensive Knowledge",
              description:
                "Access synced GitBook and GitHub content effortlessly.",
            },
            {
              icon: Shield,
              title: "Reliable & Secure",
              description: "Ensure best practices with AI-driven guidance.",
            },
            {
              icon: Brain,
              title: "Context-Aware AI",
              description:
                "Receive answers tailored to your queries and use cases.",
            },
            {
              icon: Laptop,
              title: "Developer-Centric",
              description:
                "Built by developers, for developers, to enhance productivity.",
            },
          ].map((feature, index) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
            <div
              // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
              key={index}
              className="flex flex-col items-center text-center space-y-2"
            >
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="text-center space-y-6 bg-gradient-to-r from-[#7bc6351a] to-violet-500/10 rounded-lg p-12">
        <h2 className="text-3xl font-bold">
          Start Building with AI Assistance
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Join developers leveraging AI to accelerate their workflows and master
          Trustless Work integrations.
        </p>
        <div className="flex gap-4 justify-center">
          <Button asChild size="lg" className="gap-2">
            <Link href="/ai-assistant">
              Try the AI Chat <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="/library">Explore the Knowledge Base</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
