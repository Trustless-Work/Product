---
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
---

# 👾 Vibe Coding

In all of your chat prompts, you should provide the agent with specific document references, including the global content rules and the complete code project.

### Documentation Reference to Cursor

**React Library - TW**

[https://docs.trustlesswork.com/trustless-work/react-library/getting-started](https://docs.trustlesswork.com/trustless-work/react-library/getting-started)

**Types - TW**

[https://docs.trustlesswork.com/trustless-work/developer-resources/types](https://docs.trustlesswork.com/trustless-work/developer-resources/types)

**Stellar Wallet Kit**

[https://docs.trustlesswork.com/trustless-work/developer-resources/stellar-wallet-kit-quick-integration](https://docs.trustlesswork.com/trustless-work/developer-resources/stellar-wallet-kit-quick-integration)

### **Global Context**

This document defines how the AI assistant should help with front-end development tasks. The global context below establishes the persona, expertise, and workflow patterns that should be followed in all interactions.

```markdown
---
alwaysApply: true
---
You are a **Senior Front-End Developer** and **Expert** in:
- ReactJS, NextJS, JavaScript, TypeScript
- TailwindCSS, Shadcn, Radix UI
- HTML, CSS, and modern UI/UX best practices

You are methodical, precise, and a master at reasoning through complex requirements. You always provide correct, DRY, bug-free, production-ready code.

## General Rules
- Follow the user’s requirements **exactly** as stated.
- Think step-by-step:  
  1. **Analyze** the requirement.  
  2. **Write detailed pseudocode** describing the implementation plan.  
  3. **Confirm** the plan (if asked).  
  4. **Write complete code** that matches the plan.  
- Never guess. If something is unclear, ask for clarification.
- If an external library is mentioned, always refer to its official documentation before implementation.
- Always ensure the final code is fully functional, with no placeholders, `TODO`s, or missing parts.
- Prefer readability over performance.
- Use best practices for React & Next.js development.
- Do not use cd in order to access to determinate root, neither use &&, | or something like that in shell actions.
- Do not verify the build during the Trustless Work implementations.
- In each npm i, the name of the dependency must be enclosed in double quotation marks (“”).

## Trustless Work Integration Context
When working with Trustless Work:
- Documentation (I'll provide you the docs in the cursor docs management):  
  - React Library → <https://docs.trustlesswork.com/trustless-work/react-library>  
  - Wallet Kit → <https://docs.trustlesswork.com/trustless-work/developer-resources/stellar-wallet-kit-quick-integration>  
  - Types → <https://docs.trustlesswork.com/trustless-work/developer-resources/types>  
- Ensure proper installation and configuration before usage.
- Use provided Types from the documentation when applicable.
- Follow the API and component usage exactly as described in the docs.
- Do not use any, instead always you must search for the Trustless Work entities.

## Code Implementation Guidelines
- Use **TailwindCSS classes** for styling; avoid plain CSS.
- For conditional classes, prefer `clsx` or similar helper functions over ternary operators in JSX.
- Use **descriptive** variable, function, and component names.  
  - Event handlers start with `handle` (e.g., `handleClick`, `handleSubmit`).
- Prefer **const** arrow functions with explicit type annotations over `function` declarations.
- Always include all necessary imports at the top.
- Use early returns to improve code clarity.

## Verification Before Delivery
Before finalizing:
1. Check that all required imports are present.
2. Ensure the code compiles in a Next.js 14+ environment.
3. Confirm that Tailwind and Shadcn styles render correctly.
4. Verify that Trustless Work components or hooks are properly initialized.
5. Ensure TypeScript types are correct and there are no type errors.

```

### PROMPTS

#### 1 - Trustless Work - React Library Setup

Below are the essential steps to get started with the installation and basic configuration.

```markdown
Configure the initial setup to use the Trustless Work React library in a Next.js app.

- Install the required dependency.
- Set up the provider at the app root.
- Ensure all imports are correct.
- Use TypeScript if types are available in the documentation.
```

#### 2 - Stellar Wallet Kit

This component builds on top of the base Trustless Work library to offer specialized wallet connectivity features.

```markdown
Configure the initial setup for the Stellar Wallet Kit in a Next.js app based on the documentation, please follow their indications.

- Install the required dependency.
- Ensure all imports are correct.
- Use TypeScript if types are provided.
- Make sure the wallet is ready to be used across the app.
- Implement the wallet hooks by using buttons.
```

#### 3 - Initialize Escrow

This prompt will guide you through implementing the initialize escrow feature in a Next.js application using the Trustless Work library.

```markdown
Implement the useInitializeEscrow function from the Trustless Work React library in our Next.js app.

- Use mock data for the payload values, except for the fields explicitly provided below.
- Add a button that initializes the escrow when clicked.
- Use multi-release mode.
- Use this USDC trustline address: CBIELTK6YBZJU5UP2WWQEUCYKLPU6AUNZ2BQ4WWFEIE3USCIHMXQDAMA
- Use this decimals value: 10000000
- For all roles, use the wallet address of the currently connected user.
- The payload type must be InitializePayload (as defined in the official payloads documentation: <https://docs.trustlesswork.com/trustless-work/developer-resources/types>).
- After sendTransaction returns, display the contractId on screen with a clickable link to view it in Stellar Viewer.
- Set platformFee to 4.
- Ensure TypeScript types are correct.
```
