module.exports = {
  mode: 'jit',
  content: [
    "./src/components/**/*.{ts,tsx,js,jsx}",
    "./src/pages/**/*.{ts,tsx,js,jsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'header': "url('/_next/image?url=/bg.jpg&w=480&q=75')",
        'grid': "url('/_next/image?url=/background.png&w=720&q=75')"
      },
      colors: {
        primary: "#1A1A1A",
        nav: "#202224",
        link: "#248FFF",
        "link-hover": "#085ED7",
        chapter: "rgb(17 46 64)",
        root: '#2D2D2E',
        main: 'rgb(239 68 68)',
        'main-hover': 'rgba(239,68,68,0.4)',
        logo: '#D04A32',
        accent: '#2c2c2c',
        'accent-lighten': '#3d3d3d',
        'shade-mid': '#b4b9be',
        'logo-darken': '#e6613e'
      },
      backgroundSize: {
        'auto': 'auto',
        'cover': 'cover',
        'contain': 'contain',
        '90%': '90%',
        '16': '4rem',
      },
      transitionProperty: {
        'width': 'width',
        'height': 'height'
      },
      screens: {
        'xs': '480px'
      },
      padding: {
        'x': "var(--padding-x)"
      },
      inset: {
        'x': "var(--padding-x)"
      },
      gridTemplateColumns: {
        chapter: "repeat(auto-fill, minmax(60px, 1fr))",
        comic: 'repeat(auto-fill, minmax(135px, 1fr));'
      },
      borderRadius: {
        '4': '4px'
      },
      flex: {
        '0': '0 0 0%'
      }
    }
  },
  plugins: [
    require('@tailwindcss/line-clamp')
  ]
};
