# NestJS Stress Test for Stellar Contract Deployer

This service performs stress testing on the Stellar Contract Deployer endpoint to evaluate its performance and stability under high load.

## Environment Configuration

Create a `.env` file based on the provided `.env.example`:

```
# Deployer endpoint settings
DEPLOYER_ENDPOINT=https://dev.api.trustlesswork.com/deployer/invoke-deployer-contract
TRUSTLESS_API_KEY=your_api_key_here

# Stress test settings
CONCURRENT_REQUESTS=10
TOTAL_REQUESTS=100
DELAY_BETWEEN_BATCHES=100

# Stellar settings
STELLAR_NETWORK=testnet

# Stellar accounts (public and secret keys)
# Add as many accounts as needed, depending on CONCURRENT_REQUESTS
STELLAR_PUBLIC_KEY_1=your_public_key_here
STELLAR_SECRET_KEY_1=your_secret_key_here
STELLAR_PUBLIC_KEY_2=your_public_key_here
STELLAR_SECRET_KEY_2=your_secret_key_here
# ...
# Continue adding pairs of public and secret keys as needed
```

### Important Note: Number of Stellar Accounts

The number of Stellar accounts (public and secret keys) you need to configure in the `.env` file depends on the `CONCURRENT_REQUESTS` value. Each concurrent request requires a unique Stellar account to avoid conflicts during transaction signing. For example:
- If `CONCURRENT_REQUESTS=10`, you need at least 10 Stellar accounts (10 pairs of public and secret keys).
- If `CONCURRENT_REQUESTS=50`, you need at least 50 Stellar accounts.

Ensure you have enough accounts configured to match or exceed the number of concurrent requests.

## Installation

```bash
# Install dependencies
npm install

# Create .env file
cp .env.example .env
# Edit .env to configure your credentials
```

## Running Stress Tests

### Automatic Stress Tests
This will automatically run the tests with the parameters defined in your .env file and display a detailed report upon completion.

```bash
# Build the project
npm run build

# Run stress tests
npm run test:stress
```

## Results Report

When running `npm run test:stress`, the system will automatically generate a detailed report including:

- Total execution time
- Total number of requests
- Successful and failed requests
- Success rate
- Average response time
- Requests per second
- HTTP status code distribution
- Details of errors encountered

The reports are displayed in the console and also saved in the reports folder in CSV format for further analysis and record-keeping.

## Running Tests

The project includes comprehensive unit tests to ensure reliability.

### Running Unit Tests

```bash
# Run all unit tests
npm run test

# Run tests in watch mode (for development)
npm run test:watch
```