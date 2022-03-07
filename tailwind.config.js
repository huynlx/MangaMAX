module.exports = {
  mode: 'jit',
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'header': "url('/bg.jpg')",
      },
      colors: {
        primary: "#181A1B",
        nav: "#202224",
        link: "#248FFF",
        "link-hover": "#085ED7",
      },
    },
  },
  plugins: []
};
