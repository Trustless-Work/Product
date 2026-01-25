# 📚 Trustless Work SDK

### Quick links

<table data-view="cards"><thead><tr><th>Title</th><th data-card-target data-type="content-ref">Link</th></tr></thead><tbody><tr><td>Getting started</td><td><a href="getting-started-sdk.md">getting-started-sdk.md</a></td></tr><tr><td>Request an API key</td><td><a href="../developer-resources/request-api-key.md">request-api-key.md</a></td></tr><tr><td>API basics (base URLs, Swagger, limits)</td><td><a href="../api-reference/introduction.md">introduction.md</a></td></tr><tr><td>NPM package</td><td><a href="https://www.npmjs.com/package/@trustless-work/escrow">https://www.npmjs.com/package/@trustless-work/escrow</a></td></tr><tr><td>GitHub repo</td><td><a href="https://github.com/Trustless-Work/react-library-trustless-work">https://github.com/Trustless-Work/react-library-trustless-work</a></td></tr></tbody></table>

### Overview

This SDK is a React/TypeScript client for Trustless Work.

It wraps the Trustless Work API with hooks and typed payloads.

{% hint style="info" %}
Most write calls return an **unsigned XDR**. Your app must sign it client-side.
{% endhint %}

### What you’ll do with the SDK

* Initialize escrows (single-release or multi-release).
* Fund, approve, change milestone status, release, dispute, resolve.
* Query and index escrows with helper endpoints.
