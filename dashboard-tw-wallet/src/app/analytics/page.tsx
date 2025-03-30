'use client';

import { AnalyticsCard } from "@/components/dashboard/AnalyticsCard"
import { Navigation } from "@/components/dashboard/Navigation"

export default function AnalyticsPage() {
  return (
    <div className="flex min-h-screen">
      <Navigation />
      <main className="flex-1 lg:ml-64 p-4 lg:p-8">
        <AnalyticsCard />
      </main>
    </div>
  )
} 