/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {
            colors: {
                'primary-green': '#1A4D2E',
                'secondary-green': '#4F6F52',
                'primary-beige': '#E8DFCA',
                'secondary-beige': '#F5EFE6',
                'primary-dark': '#1A1A19'
            }
        }
    },
    plugins: []
};
