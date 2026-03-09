# Dcastalia Next.js Template

This is a Next.js project built with the App Router, featuring a robust set of UI components, animations, and API integrations.

## 🚀 Technologies

- **Framework**: [Next.js 15+](https://nextjs.org/) (App Router)
- **Styling**: 
  - [Tailwind CSS](https://tailwindcss.com/)
  - [Styled Components](https://styled-components.com/)
  - [Bootstrap 5](https://getbootstrap.com/)
- **Animations**:
  - [GSAP](https://greensock.com/gsap/)
  - [Framer Motion](https://www.framer.com/motion/)
- **Icons**:
  - [FontAwesome](https://fontawesome.com/)
  - [Lucide React](https://lucide.dev/)
  - [React Icons](https://react-icons.github.io/react-icons/)
- **Carousel/Sliders**:
  - [Swiper](https://swiperjs.com/)
  - [Embla Carousel](https://www.embla-carousel.com/)
- **Forms**: [React Hook Form](https://react-hook-form.com/) with [Zod](https://zod.dev/) (or similar resolvers)
- **HTTP Client**: [Axios](https://axios-http.com/)

## 📂 Project Structure

```text
├── public/                 # Static assets (images, fonts, etc.)
├── scripts/                # Utility scripts
├── src/
│   ├── animations/         # Reusable GSAP/Framer Motion animations
│   ├── api/                # API configurations
│   ├── app/                # Next.js App Router (layouts, pages, groups)
│   ├── components/         # Common UI components (buttons, inputs, cards)
│   ├── config/             # App configuration files
│   ├── hooks/              # Custom React hooks
│   ├── lib/                # Third-party library initializations
│   ├── modules/            # Feature-specific components and logic
│   ├── render/             # Rendering utilities or specialized components
│   ├── services/           # Data fetching and API services
│   ├── store/              # State management (if any)
│   ├── styles/             # Global CSS and theme files
│   └── utils/              # Helper functions and constants
├── next.config.mjs         # Next.js configuration
├── tailwind.config.js      # Tailwind CSS configuration
└── package.json            # Project dependencies and scripts
```

## 🛠️ Getting Started

1. **Install Dependencies**:
   ```bash
   yarn install
   ```

2. **Set Up Environment**:
   Create a `.env.local` file based on `.env`.

3. **Run Development Server**:
   ```bash
   yarn dev
   ```

4. **Build for Production**:
   ```bash
   yarn build
   ```

## 🧹 Maintenance

The project has been indexed and cleaned of unnecessary files (e.g., duplicate lock files, OS-specific files, and build artifacts).

## 📄 License

Private - Dcastalia
