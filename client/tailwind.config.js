module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'custom-blue': '#4794ff',
        'custom-navy': '#212d52',
        'custom-gray': '#8a96be',
        'custom-sand': '#c5c5c5',
        'custom-green': '#1aba65',
      },
      backgroundImage: {
        'main': "url('/src/css/bg/main6.jpg')",
      }
    },
  },
  plugins: [],
}
