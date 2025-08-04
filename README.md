# ISOL Chatbot Frontend

A modern, multilingual chatbot frontend built with React, Vite, and TypeScript. Features file upload, language switching (English/Spanish), context-based state management, and custom SCSS styling. Ready for local development or containerized deployment with Docker.

## Features

- ⚡ **React 19 + Vite** for fast development and HMR
- 🌐 **Multilingual**: English and Spanish support (i18n via `react-i18next`)
- 🗂️ **File Upload**: Upload images or PDFs for identity validation
- 🔄 **Language Toggle**: Switch between English and Spanish on the fly
- 🧠 **Context API**: Centralized app state (auth, language)
- 🎨 **Custom SCSS Styling**: Responsive, modern UI
- 🐳 **Docker & Docker Compose**: Easy containerized setup

## Getting Started

### Prerequisites
- Node.js 20+
- npm 9+

### Installation
```bash
npm install
```

### Development
```bash
npm run dev
```
Visit [http://localhost:5173](http://localhost:5173)

### Linting
```bash
npm run lint
```

### Build
```bash
npm run build
```

## Docker Usage

### Build & Run with Docker
```bash
docker build -t isol-chatbot-frontend .
docker run -p 5173:5173 isol-chatbot-frontend
```

### Using Docker Compose
```bash
docker-compose up --build
```

## Testing

### Running Tests
```bash
npm run test
```

### Running Tests coverage
```bash
npm run test:ci
npx serve coverage
```

Visit [http://localhost:5173](http://localhost:5173)

### Running cypress tests
```bash
npm run cy:e2e
```

## Project Structure

```
├── public/
│   └── logo.jpg                # App logo
├── src/
│   ├── main.tsx                # App entry, context provider
│   ├── index.scss              # Global styles (SCSS)
│   ├── components/
│   │   ├── ChatbotForm.tsx     # File upload form
│   │   ├── ChatbotMessage.tsx  # Chat message bubble
│   │   └── icons/
│   │       └── ChatbotIcon.tsx # SVG chatbot icon
│   ├── contexts/
│   │   └── AppContext.tsx      # Context for auth/language, translation hook
│   └── translations/
│       ├── en/global.json      # English translations
│       └── es/global.json      # Spanish translations
├── cypress/
│   └── e2e/
│       └── spec.cy.ts          # e2e tests
├── Dockerfile                  # Docker support
├── docker-compose.yml          # Docker Compose support
├── vite.config.ts              # Vite config
├── package.json                # Dependencies & scripts
└── index.html                  # HTML entry
```

## Usage

- **File Upload**: Click or drag-and-drop an image (PNG, JPG, JPEG, WEBP) or PDF to upload for identity validation.
- **Language Toggle**: Use the button in the header to switch between English and Spanish. All UI text updates instantly.
- **Chatbot**: Messages are displayed in a chat-like interface, with bot and user roles visually distinguished.

## Customization
- **Translations**: Edit `src/translations/en/global.json` and `src/translations/es/global.json` to update UI text.
- **Styling**: Modify `src/index.scss` for theming and layout changes.
- **Context**: Extend `src/contexts/AppContext.tsx` for additional global state needs.

## License

MIT
