# Installation Guide

## Installation Guide# <a href="#installation-guide" id="installation-guide"></a>

Complete setup guide for Trustless Work React blocks with detailed configuration and best practices.

### Install Trustless Work Blocks# <a href="#install-trustless-work-blocks" id="install-trustless-work-blocks"></a>

Install the main library package:

npm

```
npm install @trustless-work/blocks
```

#### Run the CLI Setup# <a href="#run-cli-setup" id="run-cli-setup"></a>

Configure Trustless Work Blocks to your project:

```
npx trustless-work init
```

What the init command does:

* Installs shadcn/ui components (with interactive prompts)
* Installs required dependencies: @tanstack/react-query, @trustless-work/escrow, axios, zod, react-hook-form, @creit.tech/stellar-wallets-kit, react-day-picker, etc.
* Creates `.twblocks.json` configuration file
* Optionally wires providers into your Next.js `app/layout.tsx`

### Environment Configuration# <a href="#environment-configuration" id="environment-configuration"></a>

[Documentation](https://docs.trustlesswork.com/trustless-work/developer-resources/authentication/request-api-key)

Create a `.env` file in your project root:

.env

```
# Required: Your Trustless Work API key 
NEXT_PUBLIC_API_KEY=your_api_key_here
```

### Configuration Files(Optional)# <a href="#configuration-files" id="configuration-files"></a>

#### .twblocks.json# <a href="#twblocks-json" id="twblocks-json"></a>

The CLI creates a configuration file to manage UI component paths:

.twblocks.json

```
{
  "uiBase": "@/components/ui"
}
```

#### Custom UI Base Path# <a href="#custom-ui-base-path" id="custom-ui-base-path"></a>

If your UI components are in a different location, specify the path when adding blocks:

```
npx trustless-work add escrows/escrows-by-role/cards --ui-base "@/lib/ui"
```

### Wrap your App with Providers# <a href="#wrap-app-with-providers" id="wrap-app-with-providers"></a>

If you want to use some blocks, you should wrap your app with their providers. See more in: [Dependencies](https://blocks.trustlesswork.com/get-started/dependencies)

Absolutely must be used: ReactQueryClientProvider | TrustlessWorkProvider | WalletProvider.

### Add Your First Component# <a href="#add-your-first-component" id="add-your-first-component"></a>

Add wallet connectivity to your app:

```
npx trustless-work add wallet-kit
```

Example usage in a page:

app/home/page.tsx

```
import { WalletButton } from "@/components/tw-blocks/wallet-kit/WalletButtons";

export default function HomePage() {
  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">My Escrows</h1>
        <WalletButton />
      </div>
    </div>
  );
}
```

Now, you are able to interact with the wallet.
