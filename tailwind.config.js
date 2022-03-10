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
        primary: "rgb(17 24 39)",
        nav: "#202224",
        link: "#248FFF",
        "link-hover": "#085ED7",
        chapter: "#112E40"
      },
    },
  },
  plugins: []
};
