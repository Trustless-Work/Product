---
icon: screwdriver-wrench
layout:
  width: default
  title:
    visible: true
  description:
    visible: false
  tableOfContents:
    visible: true
  outline:
    visible: true
  pagination:
    visible: true
  metadata:
    visible: true
  tags:
    visible: true
---

# MCP

## Connect Cursor to Trustless Work with MCP

{% embed url="https://youtu.be/0a4QE2d9zHg" %}

Use MCP to let Cursor read Trustless Work docs and trigger escrow workflows from chat.

### What to install

Use both servers together:

* `trustlesswork-docs` gives Cursor direct access to the docs.
* `trustlesswork` gives Cursor access to Trustless Work tools and actions.

{% hint style="info" %}
Use the docs server for answers and code generation.

Use the product server for escrow actions and live operations.
{% endhint %}

{% code title="mcp.json" %}
```json
{
  "mcpServers": {
    "trustlesswork-docs": {
      "type": "streamable-http",
      "url": "https://docs.trustlesswork.com/trustless-work/~gitbook/mcp",
      "headers": {}
    },
    "trustlesswork": {
      "type": "streamable-http",
      "url": "https://mcp.trustlesswork.com/mcp",
      "headers": {}
    }
  }
}
```
{% endcode %}

### Setup in Cursor

{% stepper %}
{% step %}
### Open MCP settings

Open **Cursor**.

Go to **Settings**.

You can also use **File → Preferences → Cursor Settings**.
{% endstep %}

{% step %}
### Open the MCP section

In the sidebar, open **MCP → Tools/MCP**.

This is where Cursor lists local and hosted MCP servers.
{% endstep %}

{% step %}
### Add the Trustless Work servers

Click **Add New MCP Server**.

Cursor creates or opens `mcp.json`.

Paste the config above.

Save the file with `Cmd+S` or `Ctrl+S`.
{% endstep %}

{% step %}
### Confirm the connection

Go to **Settings → MCP → MCP Servers**.

Cursor will detect the new entries and try to connect.

You should see:

* a green **Connected** status
* the available Trustless Work methods
{% endstep %}
{% endstepper %}

<figure><img src="../.gitbook/assets/image.png" alt=""><figcaption></figcaption></figure>

<figure><img src="../.gitbook/assets/image (1).png" alt=""><figcaption></figcaption></figure>

### Start using it

Open a new Cursor chat.

Switch to **Agent Mode**.

Then ask Cursor to work with Trustless Work directly.

Example prompts:

* `Create a new multi-release escrow with the SDK.`
* `Generate code to call the changeMilestoneStatus endpoint.`
* `Show me how to sign a transaction for releaseFunds.`

{% hint style="success" %}
For SDK actions, install the Trustless Work SDK and wallet dependencies in your project first.
{% endhint %}

### What this unlocks

* Ask Trustless Work questions in plain language
* Generate SDK integrations faster
* Walk through XDR signing flows
* Trigger escrow operations from your editor

This gives you an AI-native workflow for Trustless Work development.

### Troubleshooting

{% hint style="warning" %}
If the server does not connect, reload Cursor before changing the config again.
{% endhint %}

#### Server does not appear

Make sure `mcp.json` is in your project root.

#### Connection fails

Check these values:

* the URL has no trailing slash
* `type` is `streamable-http`
* your network allows outbound requests

#### Cursor ignores MCP tools

Check these basics:

* **Agent Mode** is enabled
* you are in the right workspace
* the JSON file has no syntax errors

### Related AI workflows

* [Skill](skill.md)
* [Vibe Coding | Blocks SDK](vibe-coding-or-blocks-sdk.md)
* [Vibe Coding | React SDK](vibe-coding-or-react-sdk.md)
