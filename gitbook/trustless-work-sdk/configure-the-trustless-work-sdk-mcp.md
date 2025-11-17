# Configure the Trustless Work SDK MCP

## **Configure the Trustless Work SDK MCP on Cursor**

_Give your AI agent full power to build, update, and execute escrow actions automatically._

The **Model Context Protocol (MCP)** allows Cursor’s AI agent to call external tools and APIs autonomously. By adding the **Trustless Work MCP Server**, developers can interact with the Trustless Work SDK through Cursor—making escrow creation, milestone updates, approvals, releases, and analysis executable directly from the editor.

This guide walks you through the exact steps required to connect Cursor to the **Trustless Work MCP Server**:

```json
"trustlesswork": {
  "type": "streamable-http",
  "url": "https://mcp.trustlesswork.com/mcp",
  "headers": {}
}
```

***

## **1. Open Cursor Settings**

You can access MCP settings in two ways:

#### **Method A: From the UI**

1. Open Cursor
2. Click the **⚙️ Settings** icon (top-right corner)

#### **Method B: From the menu**

* `File → Preferences → Cursor Settings`

***

## **2. Navigate to the MCP Configuration Section**

In the left-side settings sidebar, look for:

**MCP → Tools/MCP**&#x20;

This section lists all local and hosted MCP servers currently available to Cursor.

***

## **3. Add the Trustless Work MCP Server**

Click:

#### **➕ Add New MCP Server**

Cursor will either:

* Create an `mcp.json` file in your project, or
* Open your existing one.

Paste the following configuration:

```json
{
  "trustlesswork": {
    "type": "streamable-http",
    "url": "https://mcp.trustlesswork.com/mcp",
    "headers": {}
  }
}
```

#### **Save the file** (`Cmd+S` / `Ctrl+S`)

***

## **4. Verify the MCP Server is Running**

Go back to:

**Settings → MCP → MCP Servers**

Cursor will automatically:

1. Detect the new entry (this may take a while)
2. Attempt to connect
3. Install and start the MCP server

A successful connection shows:

* **Green "Connected" indicator**
* A list of **tools / methods** exposed by the Trustless Work MCP

<figure><img src="../.gitbook/assets/image (38).png" alt=""><figcaption></figcaption></figure>

If the server does not start:

* Click **↻ Reload Servers**
* Restart Cursor
* Ensure you copied the URL exactly

***

## **5. Start Using Trustless Work Tools in Cursor**

Once the MCP is connected:

* Open a new chat inside Cursor
* Switch to **Agent Mode**
* Start asking Cursor to perform Trustless Work operations (You may want to have trustlesswork-sdk and stellar-wallet-kit installed)

#### Example prompts:

* _“Create a new multi-release escrow with the SDK.”_
* _“Generate code to call the changeMilestoneStatus endpoint.”_
* _“Show me how to sign a transaction for releaseFunds.”_
* _“Use the MCP tool to call `/escrow/multi-release/change-milestone-status`.”_

Cursor will now:

* Query the MCP server
* Fetch schemas and tools
* Generate correct SDK code
* Execute actions directly through the MCP

This effectively becomes your **fully autonomous Trustless Work coding agent**.

***

## **6. Troubleshooting**

#### **Server doesn’t appear in the list**

Check that `mcp.json` is placed in your project root.

#### **Connection error**

Verify:

* URL has **no trailing slash**
* `"type": "streamable-http"`
* Your firewall/ISP doesn’t block outgoing requests

#### **Cursor doesn’t use the MCP tools in chat**

Ensure:

* You have **Agent Mode** activated
* The correct workspace is selected
* No syntax errors in the JSON file

***

### **What This Unlocks**

✔ Autonomous escrow interactions\
✔ Automatic code generation with TW SDK\
✔ XDR signing workflows\
✔ Transaction submission flows\
✔ API wrapper generation\
✔ Integration recipes\
✔ Full Trustless Work lifecycle automation inside Cursor

You’ve effectively enabled **AI-native escrow development**.\
Agents can now build, update, and maintain escrow logic—end to end.

***
