"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { getEscrowByContractId } from "@/lib/escrow"

interface EscrowData {
  contractId: string
  provider: string
  client: string
  amount: string
  currency: string
  status: string
  milestone?: {
    id: string
    title: string
    description: string
    paid: boolean
  }
}

interface EscrowCardProps {
  contractId: string
}

export function EscrowCard({ contractId }: EscrowCardProps) {
  const [escrow, setEscrow] = useState<EscrowData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadEscrow() {
      try {
        setLoading(true)
        setError(null)
        const data = await getEscrowByContractId(contractId)
        setEscrow(data)
      } catch (err) {
        console.error("Failed to load escrow:", err)
        setError("Erro ao carregar dados do escrow")
      } finally {
        setLoading(false)
      }
    }

    if (contractId) {
      loadEscrow()
    }
  }, [contractId])

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Carregando Escrow</CardTitle>
          <CardDescription>Buscando dados do contrato...</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse space-y-2">
            <div className="h-4 bg-muted rounded w-3/4"></div>
            <div className="h-4 bg-muted rounded w-1/2"></div>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-destructive">Erro</CardTitle>
          <CardDescription>{error}</CardDescription>
        </CardHeader>
      </Card>
    )
  }

  if (!escrow) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Escrow Não Encontrado</CardTitle>
          <CardDescription>Nenhuma informação encontrada para o contrato fornecido.</CardDescription>
        </CardHeader>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Escrow do Contrato</CardTitle>
        <CardDescription>Contrato: {escrow.contractId}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Provedor</p>
            <p className="text-sm truncate">{escrow.provider}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Cliente</p>
            <p className="text-sm truncate">{escrow.client}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Valor</p>
            <p className="text-sm font-semibold">{escrow.amount} {escrow.currency}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Status</p>
            <p className="text-sm">
              <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                escrow.status === "active" 
                  ? "bg-green-100 text-green-800" 
                  : escrow.status === "completed"
                  ? "bg-blue-100 text-blue-800"
                  : "bg-yellow-100 text-yellow-800"
              }`}>
                {escrow.status}
              </span>
            </p>
          </div>
        </div>

        {escrow.milestone && (
          <div className="border-t pt-4">
            <p className="text-sm font-medium text-muted-foreground mb-2">Milestone Atual</p>
            <div className="p-3 bg-muted/50 rounded-lg">
              <p className="font-medium text-sm">{escrow.milestone.title}</p>
              <p className="text-xs text-muted-foreground mt-1">{escrow.milestone.description}</p>
              <div className="flex items-center gap-2 mt-2">
                <span className={`text-xs ${escrow.milestone.paid ? "text-green-600" : "text-yellow-600"}`}>
                  {escrow.milestone.paid ? "✓ Pago" : "⏳ Pendente"}
                </span>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
