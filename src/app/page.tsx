"use client"

import { useState } from "react"
import { EscrowCard } from "@/components/EscrowCard"

export default function Home() {
  const [contractId, setContractId] = useState("")

  return (
    <main className="min-h-screen bg-background p-8">
      <div className="max-w-2xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold tracking-tight">Load Escrow Component</h1>
        
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Digite o contract ID..."
            value={contractId}
            onChange={(e) => setContractId(e.target.value)}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          />
        </div>

        {contractId && <EscrowCard contractId={contractId} />}
      </div>
    </main>
  )
}
