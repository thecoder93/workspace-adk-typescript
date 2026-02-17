# Random City Agent (TypeScript)

This is a simple ADK-based agent that suggests a random city when asked. It demonstrates how to use the Google Agent Development Kit (ADK) to build a specialized AI assistant.

## Features

- **City Explorer**: A friendly assistant that helps you discover new cities.
- **Random City Tool**: A dedicated tool (`get_random_city`) to fetch randomized city data.
- **Web Interface**: Integrated support for the ADK Web UI.
- **Modern Tooling**: Built with TypeScript and includes linting/formatting via `oxlint` and `oxfmt`.

## Project Structure

```
├── .husky/               # Git hooks
├── random_city/
│   ├── .env.example      # Environment variables template
│   ├── agent.ts          # Agent definition (LlmAgent)
│   ├── config.ts         # Configuration management
│   ├── prompts.ts        # System instructions
│   └── tools/
│       ├── function_tools.ts # ADK Tool wrappers
│       └── tools.ts          # Core tool logic
├── package.json          # Project scripts and dependencies
├── tsconfig.json         # TypeScript configuration
├── .oxlintrc.json        # Linter configuration
└── oxfmt.toml            # Formatter settings
```

## Setup

1. **Install dependencies**:

   ```bash
   pnpm install
   ```

2. **Set up environment variables**:
   Copy the example environment file and fill in your `GOOGLE_API_KEY`:

   ```bash
   cp random_city/.env.example random_city/.env
   # Then edit random_city/.env with your key
   ```

## Running the Agent

### 1. Web Interface (Recommended)

Launch the agent with a browser-based chat interface:

```bash
npm start
```

### 2. Command Line Interface

Run the agent directly in your terminal:

```bash
npx adk run random_city/agent.ts
```

## Development

- **Linting**: `npm run lint` (uses `oxlint` for high-performance linting)
- **Formatting**: `npm run fmt` (uses `oxfmt` for lightning-fast formatting)
- **Git Hooks**: Pre-commit hooks are configured via Husky to ensure code quality.
