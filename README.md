# Timezone Converter

A modern, multilingual web application for converting time between different timezones. Built with Next.js, React, TypeScript, and Tailwind CSS.

![Status](https://img.shields.io/badge/status-ready-brightgreen)
![TypeScript](https://img.shields.io/badge/typescript-strict-blue)
![Languages](https://img.shields.io/badge/languages-EN%20%7C%20JA-blue)
![License](https://img.shields.io/badge/license-MIT-green)

## Features

✨ **Instant Timezone Conversion**
- Convert time from any timezone to any other timezone
- Real-time offset calculation with DST handling
- Support for 18+ major world timezones

🌍 **Multilingual Support**
- English and Japanese interface
- Locale-based routing (/en, /ja)
- Seamless language switching

🎨 **Modern UI with Dark Mode**
- Clean, responsive design with Tailwind CSS
- Full dark mode support
- Smooth animations and transitions
- Copy-to-clipboard with toast notifications

📱 **User-Friendly Features**
- Local timezone auto-detection
- "Now" button for current time
- "Clear All" to reset converters
- Timezone search/filter
- Persistent preferences (localStorage)

⚡ **Performance**
- Pure client-side conversions (no server needed)
- Instant processing
- Zero external dependencies for timezone logic

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) 15 with App Router
- **UI**: [React](https://react.dev/) 19
- **Language**: [TypeScript](https://www.typescriptlang.org/) (strict mode)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) 4
- **i18n**: [next-intl](https://next-intl-docs.vercel.app/) 3

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd timezone-converter

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:3000`

## Usage

1. **Select Source Timezone**: Choose the timezone of the time you want to convert
2. **Enter Date & Time**: Select a date and time (or click "Now" for current time)
3. **Select Target Timezone**: Choose the timezone to convert to
4. **View Result**: The converted time displays automatically with UTC offset info
5. **Copy Result**: Click the copy button to copy the time to clipboard
6. **Switch Languages**: Use EN/JA buttons in the header to change language
7. **Toggle Dark Mode**: Click the moon/sun icon to switch themes

## Project Structure

```
timezone-converter/
├── app/
│   ├── layout.tsx              # Root layout
│   ├── globals.css             # Global styles with animations
│   └── [locale]/
│       ├── layout.tsx          # Locale layout with i18n provider
│       └── page.tsx            # Main converter page
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.tsx      # Header with language/theme switcher
│   │   │   └── LanguageSwitcher.tsx
│   │   ├── timezone/
│   │   │   └── TimezoneSelector.tsx
│   │   └── ui/
│   │       ├── Select.tsx
│   │       └── Input.tsx
│   ├── data/
│   │   └── timezones.ts        # Timezone definitions
│   ├── hooks/
│   │   └── useLocalStorage.ts  # Persistent storage hook
│   ├── lib/
│   │   └── timezone/
│   │       └── timezoneUtils.ts # Conversion logic
│   ├── messages/
│   │   ├── en.json             # English translations
│   │   └── ja.json             # Japanese translations
│   └── i18n.ts                 # i18n configuration
├── middleware.ts               # Locale routing
├── package.json
└── tsconfig.json
```

## Core Functionality

### Timezone Conversion Logic

The conversion uses JavaScript's `Intl.DateTimeFormat` API to:
- Calculate timezone offsets for specific dates
- Handle Daylight Saving Time (DST) transitions
- Preserve time accuracy across timezones

### Supported Timezones

- UTC
- Americas: New York, Los Angeles, Chicago, Denver, Toronto, Mexico City, São Paulo
- Europe: London, Paris, Berlin, Madrid, Tokyo
- Asia: Tokyo, Shanghai, Hong Kong, Singapore, Bangkok, Dubai, Mumbai
- Oceania: Sydney, Auckland

### Features in Detail

**Theme Persistence**: Dark mode preference saved to localStorage
**Timezone Preferences**: Source and target timezone selections saved
**Auto-Detection**: Detects user's local timezone on first visit
**Real-time Validation**: Input validation with error messages
**Responsive Design**: Works on desktop, tablet, and mobile devices

## Building for Production

```bash
# Build the application
npm run build

# Start production server
npm start
```

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Requires JavaScript enabled

## Accessibility

- Keyboard navigation support
- ARIA labels on form elements
- Focus indicators for visual clarity
- Semantic HTML structure

## Design Philosophy

- **Simplicity**: Intuitive two-panel layout
- **Clarity**: Real-time feedback on conversions
- **Accessibility**: Support for keyboard and screen readers
- **Localization**: Full multilingual support
- **Responsiveness**: Mobile-first design

## Future Enhancements

Potential features for future releases:
- Batch timezone conversions
- Timezone comparison tool
- Meeting time finder
- Custom timezone lists
- Timezone offset calculator
- Time range converter

## Contributing

Contributions are welcome! Please:
1. Fork the repository
2. Create a feature branch
3. Submit a pull request

## License

MIT License - see LICENSE file for details

## Support

For issues or questions:
1. Check existing GitHub issues
2. Create a new issue with details and examples
3. Include steps to reproduce and expected behavior

---

**Built with ❤️ using Next.js and TypeScript**

All conversions happen in your browser - your data never leaves your device.
