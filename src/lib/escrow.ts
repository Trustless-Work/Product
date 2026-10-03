const API_BASE = process.env.NEXT_PUBLIC_API_URL || "https://api.trustlesswork.com"

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

export async function getEscrowByContractId(contractId: string): Promise<EscrowData> {
  try {
    const response = await fetch(`${API_BASE}/api/escrow/by-contract/${encodeURIComponent(contractId)}`)
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    const data = await response.json()
    return data
  } catch (error) {
    console.error("Failed to fetch escrow:", error)
    throw error
  }
}
