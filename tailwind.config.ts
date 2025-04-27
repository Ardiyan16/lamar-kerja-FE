import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

export default {
    // darkMode: ['class'],
    content: [
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./layouts/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./stories/**/*.{js,ts,jsx,tsx,mdx,stories}",
    ],
    theme: {
        container: {
            padding: {
                DEFAULT: '1rem',
                sm: '1rem',
                lg: '4rem',
                xl: '5rem',
                '2xl': '6rem',
            },
        },

        extend: {
            fontFamily: {
                primary: ['var(--font-primary)', {
                    fontFeatureSettings: '"cv02","cv03","cv04","cv11"',
                    fontVariationSettings: "normal",
                }],
            },
            screens: {
                'xs': '480px',
            },

            colors: {
                "gray": {
                    50: '#f9fafb',
                    100: '#f3f4f6',
                    200: '#e5e7eb',
                    300: '#c8d1db',
                    400: '#a3b2c2',
                    500: '#7f93a9',
                    600: '#5f748c',
                    700: '#2F3943',
                    800: '#1C252E',
                    900: '#141A21',
                },
                "whatsapp-color": "#25D366",
                //adm
                "admPrimary": "#5c98FF"
            },

            "keyframes": {
                "shimmer": {
                    "100%": {
                        "transform": "translateX(100%)",
                    },
                },
            }

        },
    },

    // safelist: [
    //     'bg-blue-100', 'text-blue-700', 'dark:text-blue-100', 'dark:bg-blue-800',
    //     'bg-yellow-100', 'text-yellow-700', 'dark:text-yellow-100', 'dark:bg-yellow-800',
    //     'bg-green-100', 'text-green-700', 'dark:text-green-100', 'dark:bg-green-800',
    //     'bg-red-100', 'text-red-700', 'dark:text-red-100', 'dark:bg-red-800',
    //     'bg-teal-100', 'text-teal-700', 'dark:text-teal-100', 'dark:bg-teal-800',
    //     'bg-cyan-100', 'text-cyan-700', 'dark:text-cyan-100', 'dark:bg-cyan-800',
    //     'bg-purple-100', 'text-purple-700', 'dark:text-purple-100', 'dark:bg-purple-800',
    //     'bg-indigo-100', 'text-indigo-700', 'dark:text-indigo-100', 'dark:bg-indigo-800',
    // ],

    plugins: [
        plugin(function ({ addBase }) {
            addBase({
                'html': { fontSize: "14px" },
            })
        }),
        require('@tailwindcss/typography'),
    ],
} satisfies Config;
