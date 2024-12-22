# React to JPG

A simple yet powerful tool to convert React components into JPG images. Perfect for creating infographics, presentations, or social media content.

🌐 [Try it live](https://silas-h.github.io/react-to-jpg/)

## Features

- 🎨 Live preview of React components
- 📸 One-click export to JPG
- 🔌 Built-in Lucide icons support
- 🛡️ Robust error handling
- 💻 Simple and intuitive interface

## Installation

```bash
# Clone the repository
git clone https://github.com/Silas-h/react-to-jpg.git

# Navigate to the project directory
cd react-to-jpg

# Install dependencies
npm install

# Start the development server
npm run dev
```

## Usage

1. **Write or Paste Your Component**
   - Start with a React component declaration (e.g., `const MyComponent = ...`)
   - Use `e()` for createElement (provided globally)
   - Lucide icons are available directly by name (e.g., `DollarSign`, `Calculator`)

```javascript
const MyComponent = () => {
  return e('div', { className: "p-8 text-center" },
    e('h1', { className: "text-2xl font-bold" }, "My Title"),
    e(DollarSign, { size: 24, className: "mx-auto mt-4" }),
    e('p', { className: "mt-4" }, "My content here...")
  );
};
```

2. **Preview Your Component**
   - See live updates as you type
   - Any errors will be displayed clearly below the code editor

3. **Export to JPG**
   - Click "Export as JPG" to download your component as an image
   - Images are exported with high quality and a white background

## Built With

- ⚛️ React
- 🎨 Tailwind CSS
- 📦 Vite
- 🖼️ html-to-image
- 🎯 Lucide Icons

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Thanks to all the open-source libraries that made this possible
- Built with 💙 by [Silas-h](https://github.com/Silas-h)

## Screenshots

![React to JPG Interface](screenshot.png)
*Add your screenshot here*
