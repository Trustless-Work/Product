import { Server } from "soroban-client";

// Soroban RPC server URL
const RPC_URL = "https://rpc-futurenet.stellar.org";

// Create a Soroban server instance
export const server = new Server(RPC_URL);

// Contract ID
export const CONTRACT_ID =
  "CB3Z4V72OPFTHA6MBJCOFXGXTFJIG463LOTPBXMWFDAUZRIUX7IH4LDG";
