// import {
//   Character,
//   elizaLogger,
//   validateCharacterConfig,
//   defaultCharacter,
// } from "@ai16z/eliza";
// import { DirectClient } from "@ai16z/client-direct";
// import fs from "fs";
// import * as path from "path";
// import { fileURLToPath } from 'url';
// import { dirname } from 'path';

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

// function tryLoadFile(filePath: string): string | null {
//   // Check for --characters flag
//   const args = process.argv;
//   const charactersFlag = args.find((arg) => arg.startsWith("--characters="));
//   const characterPath = charactersFlag?.split("=")[1];

//   if (characterPath) {
//     filePath = characterPath;
//   }

//   try {
//     return fs.readFileSync(filePath, "utf8");
//   } catch (e) {
//     return null;
//   }
// }

// function isAllStrings(arr: unknown[]): boolean {
//   return Array.isArray(arr) && arr.every((item) => typeof item === "string");
// }

// export async function loadCharacters(
//   characterPath: string,
// ): Promise<Character[]> {
//   const loadedCharacters: Character[] = [];
//   const content = tryLoadFile(characterPath);

//   if (!content) {
//     elizaLogger.error(
//       `Error loading character from ${characterPath}: File not found`,
//     );
//     process.exit(1);
//   }

//   try {
//     const character = JSON.parse(content);
//     validateCharacterConfig(character);

//     if (isAllStrings(character.plugins)) {
//       elizaLogger.info("Plugins are: ", character.plugins);
//       const importedPlugins = await Promise.all(
//         character.plugins.map(async (pluginPath: string) => {
//           try {
//             // Resolve plugin path relative to the character file
//             const characterDir = path.dirname(path.resolve(characterPath));
//             const resolvedPath = path.resolve(characterDir, pluginPath);
            
//             elizaLogger.info(`Attempting to load plugin from: ${resolvedPath}`);
            
//             const importedPlugin = await import(`file://${resolvedPath}`);
//             return importedPlugin.default || importedPlugin;
//           } catch (error) {
//             elizaLogger.error(`Failed to load plugin: ${pluginPath}`, error);
//             return null;
//           }
//         }),
//       );
//       character.plugins = importedPlugins.filter(plugin => plugin !== null);
//     }

//     loadedCharacters.push(character);
//     elizaLogger.info(`Successfully loaded character from: ${characterPath}`);
//   } catch (e) {
//     elizaLogger.error(`Error parsing character from ${characterPath}: ${e}`);
//     process.exit(1);
//   }

//   if (loadedCharacters.length === 0) {
//     elizaLogger.info("No characters found, using default character");
//     loadedCharacters.push(defaultCharacter);
//   }

//   return loadedCharacters;
// }
