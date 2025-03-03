import { DirectClient } from "@elizaos/client-direct";
import {
  AgentRuntime,
  elizaLogger,
  type Character,
  validateCharacterConfig,
  stringToUuid,
  type IDatabaseAdapter,
  settings,
  DbCacheAdapter,
  CacheManager,
} from "@elizaos/core";
import { SqliteDatabaseAdapter } from "@elizaos/adapter-sqlite";
import Database from "better-sqlite3";
import { stellarPlugin } from "../plugins/plugin-stellar/index.ts";
import { bootstrapPlugin } from "@elizaos/plugin-bootstrap";
import { createNodePlugin } from "@elizaos/plugin-node";
import * as path from "path";
import * as fs from "fs";
import { fileURLToPath } from "url";
import readline from "readline";

// ES Module dirname equivalent
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Chat functionality
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.on("SIGINT", () => {
  rl.close();
  process.exit(0);
});

async function handleUserInput(input: string, agentId: string) {
  if (input.toLowerCase() === "exit") {
    rl.close();
    process.exit(0);
  }

  try {
    const serverPort = parseInt(settings.SERVER_PORT || "3000");
    const response = await fetch(
      `http://localhost:${serverPort}/${agentId}/message`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: input,
          userId: "user",
          userName: "User",
        }),
      }
    );

    const data = await response.json();
    data.forEach((message: { text: string }) => 
      console.log(`Agent: ${message.text}`)
    );
  } catch (error) {
    console.error("Error fetching response:", error);
  }
}

function startChat(characters: Character[]) {
  return function chat() {
    const agentId = characters[0].id ?? stringToUuid(characters[0].name);
    rl.question("You: ", async (input) => {
      await handleUserInput(input, agentId);
      if (input.toLowerCase() !== "exit") {
        chat();
      }
    });
  };
}

export async function loadCharacters(characterPath: string): Promise<Character[]> {
  const loadedCharacters: Character[] = [];
  
  try {
    const content = fs.readFileSync(characterPath, 'utf8');
    const character = JSON.parse(content);
    validateCharacterConfig(character);
    character.id = stringToUuid(character.name);
    loadedCharacters.push(character);
    elizaLogger.info(`Successfully loaded character from: ${characterPath}`);
  } catch (e) {
    elizaLogger.error(`Error loading character from ${characterPath}: ${e}`);
    process.exit(1);
  }

  return loadedCharacters;
}

async function main() {
  elizaLogger.info("Starting Eliza Agent...");

  const args = process.argv.slice(2);
  const characterPathArg = args.find(arg => arg.startsWith('--characters='));
  
  if (!characterPathArg) {
    elizaLogger.error("No character file specified. Use --characters=path/to/character.json");
    process.exit(1);
  }

  const characterPath = characterPathArg.split('=')[1];
  const characters = await loadCharacters(characterPath);
  const directClient = new DirectClient();
  const dataDir = path.join(__dirname, "../../data");
  const filePath = process.env.SQLITE_FILE ?? path.resolve(dataDir, "db.sqlite");
  const db = new SqliteDatabaseAdapter(new Database(filePath));
  await db.init();

  for (const character of characters) {
    const cache = new CacheManager(new DbCacheAdapter(db, character.id));
    // let nodePlugin: any | undefined = createNodePlugin();

    const runtime = new AgentRuntime({
      databaseAdapter: db,
      character,
      plugins: [bootstrapPlugin, stellarPlugin],
      token: character.settings?.secrets?.OPENROUTER || settings.OPENROUTER_API_KEY,
      modelProvider: character.modelProvider,
      cacheManager: cache,
      logging: true,
    });

    await runtime.initialize();
    elizaLogger.success(`Agent "${character.name}" initialized successfully!`);
    directClient.registerAgent(runtime);
  }

  directClient.start(3000);
  elizaLogger.success("Eliza agents started successfully!");

  // Start chat interface
  elizaLogger.log("Chat started. Type 'exit' to quit.");
  const chat = startChat(characters);
  chat();
}

// Run the main function
main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
