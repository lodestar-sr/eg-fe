/** @type {import('tailwindcss').Config} */

const spacings = {
  unset: 'unset',
};
for (let i = -100; i < 500; i += 0.5) {
  spacings[i] = `${i / 4}rem`;
}

const opacities = {};
for (let i = 0; i < 100; i++) {
  opacities[i] = (i * 0.01).toFixed(2);
}

const colors = {
  primary: {
    DEFAULT: '#354446',
  },
};

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors,
      spacing: spacings,
      minWidth: spacings,
      minHeight: spacings,
      maxWidth: spacings,
      maxHeight: spacings,
      opacity: opacities,
    },
  },
  plugins: [],
};
