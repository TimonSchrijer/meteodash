# MeteoDash - Weather Dashboard

A modern, responsive weather dashboard built with Next.js, React, and Tailwind CSS. This dashboard provides a beautiful and intuitive interface for viewing weather data, including temperature, precipitation, wind, and tide information.

## Features

- 🌡️ Temperature visualization
- 💧 Precipitation tracking
- 💨 Wind speed and direction
- 🌊 Tide information
- 📱 Responsive design
- 🌓 Dark/Light mode support
- 📊 Interactive charts and graphs

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v18 or higher)
- pnpm (v8 or higher)

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/TimonSchrijer/meteodash.git
cd meteodash
```

2. Install dependencies:
```bash
pnpm install
```

3. Start the development server:
```bash
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Available Scripts

- `pnpm dev` - Start the development server
- `pnpm build` - Build the application for production
- `pnpm start` - Start the production server
- `pnpm lint` - Run ESLint to check code quality

## Tech Stack

- [Next.js](https://nextjs.org/) - React framework
- [React](https://reactjs.org/) - UI library
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Recharts](https://recharts.org/) - Charting library
- [Radix UI](https://www.radix-ui.com/) - UI components
- [TypeScript](https://www.typescriptlang.org/) - Type safety

## Project Structure

```
meteodash/
├── app/                 # Next.js app directory
├── components/         # React components
│   ├── ui/            # Reusable UI components
│   └── ...            # Feature-specific components
├── lib/               # Utility functions and configurations
├── public/            # Static assets
└── styles/            # Global styles
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details. 