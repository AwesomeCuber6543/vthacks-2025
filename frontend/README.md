# Advisr.ai - Financial Aid Assistant

A modern financial aid assistant application built with Next.js, TypeScript, and Tailwind CSS, featuring Virginia Tech's signature colors.

## Features

- **My Info Tab**: Document upload interface with drag-and-drop functionality
- **Recap Tab**: Call summary and action items tracking
- **Virginia Tech Theme**: Maroon red, burnt orange, and white color scheme
- **Responsive Design**: Mobile-first approach with modern UI/UX
- **TypeScript**: Full type safety throughout the application

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Heroicons (SVG)
- **Font**: Inter

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
src/
├── app/
│   ├── globals.css          # Global styles and Tailwind imports
│   ├── layout.tsx           # Root layout component
│   └── page.tsx             # Main page with tab navigation
└── components/
    ├── MyInfo.tsx           # Document upload component
    └── Recap.tsx            # Call summary component
```

## Color Palette

- **VT Maroon**: #861F41 (Primary brand color)
- **VT Orange**: #E87722 (Accent color)
- **VT White**: #FFFFFF (Text and backgrounds)

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Features in Detail

### My Info Tab
- Drag and drop file upload
- Support for PDF, PNG, JPG files
- File size validation (10MB limit)
- File management with remove functionality
- Feature highlights (Secure, Fast, Smart)

### Recap Tab
- Expandable call summaries
- Key points and action items
- Quick statistics dashboard
- Download and follow-up actions
- Mock data for demonstration

## Development Notes

This is a frontend-only application. Backend functionality for file processing, AI analysis, and data persistence would need to be implemented separately.
