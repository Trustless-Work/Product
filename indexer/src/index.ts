import { config } from 'dotenv'
import { createPublicClient, http, parseAbiItem, type Log } from 'viem'
import { base } from 'viem/chains'

config()

const RPC_URL = process.env.RPC_URL ?? 'https://mainnet.base.org'
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS as `0x${string}`
const START_BLOCK = BigInt(process.env.START_BLOCK ?? '0')

if (!CONTRACT_ADDRESS || CONTRACT_ADDRESS === '0x0000000000000000000000000000000000000000') {
  throw new Error('CONTRACT_ADDRESS must be set in .env')
}

const client = createPublicClient({
  chain: base,
  transport: http(RPC_URL)
})

const WorkCreatedAbi = parseAbiItem('event WorkCreated(uint256 indexed id, address indexed creator, uint256 createdAt)')
const ProposalSubmittedAbi = parseAbiItem('event ProposalSubmitted(uint256 indexed workId, address indexed proposer)')

type IndexedEvent = {
  blockNumber: bigint
  logIndex: number
  eventName: string
  args: Record<string, unknown>
}

const inMemoryStore: IndexedEvent[] = []

async function handleLogs(fromBlock: bigint, toBlock: bigint) {
  const logs = await client.getLogs({
    address: CONTRACT_ADDRESS,
    fromBlock,
    toBlock,
    event: WorkCreatedAbi
  })

  const proposalLogs = await client.getLogs({
    address: CONTRACT_ADDRESS,
    fromBlock,
    toBlock,
    event: ProposalSubmittedAbi
  })

  for (const log of [...logs, ...proposalLogs]) {
    const eventName = log.eventName ?? 'Unknown'
    inMemoryStore.push({
      blockNumber: log.blockNumber,
      logIndex: Number(log.index),
      eventName,
      args: log.args as Record<string, unknown>
    })
    console.log('[INDEXED]', eventName, log.args)
  }
}

async function run() {
  console.log('Indexer starting on Base...')
  let lastBlock = START_BLOCK

  while (true) {
    try {
      const latest = await client.getBlockNumber()
      if (latest > lastBlock) {
        await handleLogs(lastBlock + 1n, latest)
        lastBlock = latest
      }
      await new Promise(r => setTimeout(r, 15_000))
    } catch (err) {
      console.error('Indexer error', err)
      await new Promise(r => setTimeout(r, 30_000))
    }
  }
}

run()
