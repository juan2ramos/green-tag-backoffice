import formsPlugin from '@tailwindcss/forms';
import flowbitePlugin from 'flowbite/plugin';

export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    'node_modules/flowbite-react/lib/esm/**/*.js',
  ],
  theme: {
    extend: {
      colors: {
        'green-primary': '#44C949',
        secondary: {
          100: '#E2E2D5',
          200: '#888883',
        },
      },
    },
  },
  plugins: [formsPlugin, flowbitePlugin],
};
