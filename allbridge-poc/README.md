# Allbridge Core SDK Example Project

This repository provides a simple example of how to integrate the Allbridge Core SDK into a React application. It demonstrates the essential functionalities of the SDK, including retrieving supported networks and tokens, calculating fees, estimating received amounts, and sending transactions.

## Project Structure

- **`src/pages/Demo.tsx`**: This component contains the minimal implementation of the core features of the Allbridge SDK.
- **`src/services/sdk.ts`**: This service aggregates all the methods used in the `Demo` component for interacting with the Allbridge SDK.

## Features

1. **Retrieving Networks and Tokens**: Fetches the list of networks and tokens that are available for transfers.
2. **Fetching Fees**: Retrieves the fees associated with a transaction.
3. **Calculating Received Amount**: Estimates the amount the recipient will receive after deducting the fees.
4. **Sending Transactions**: Initiates the transfer of tokens between networks.

### Note

This example project intentionally omits any form of validation or error handling for the sake of simplicity. Integrators are expected to implement these as per their specific requirements.

## Resources

- [Official Documentation](https://docs-core.allbridge.io/)
- [Allbridge Core SDK on GitHub](https://github.com/allbridge-io/allbridge-core-js-sdk)

## Getting Started

To run this project locally, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/allbridge-io/allbridge.git
   ```

2. Navigate to the project directory:

   ```bash
   cd allbridge
   ```

3. Install the dependencies:

   ```bash
   npm install
   ```

4. Start the development server:
   ```bash
   npm start
   ```

Visit `http://localhost:3000/allbridge/demo` in your browser to see the demo in action.

## License

This project is licensed under the MIT License.
