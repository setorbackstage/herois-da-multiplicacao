/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['Fredoka', 'Nunito', 'sans-serif'],
        body: ['Nunito', 'Fredoka', 'sans-serif'],
      },
      colors: {
        duo: {
          cream: '#FFFDF5',
          creamBorder: '#EFE8D6',
          ink: '#1E293B',
          muted: '#64748B',
          green: '#58CC02',
          greenDark: '#46A302',
          blue: '#1CB0F6',
          blueDark: '#1899D6',
          orange: '#FF9600',
          orangeDark: '#E08500',
          purple: '#A855F7',
          purpleDark: '#7E22CE',
          gold: '#FFC800',
          goldDark: '#D99B00',
          red: '#FF4B4B',
          redDark: '#EA2B2B',
        },
      },
      keyframes: {
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-8px) rotate(2deg)' },
        },
        tagBounce: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        chestWobble: {
          '0%, 100%': { transform: 'rotate(0deg) scale(1)' },
          '20%': { transform: 'rotate(-5deg) scale(1.05)' },
          '40%': { transform: 'rotate(5deg) scale(1.05)' },
          '60%': { transform: 'rotate(-3deg)' },
          '80%': { transform: 'rotate(3deg)' },
        },
        shakeX: {
          '0%, 100%': { transform: 'translateX(0)' },
          '20%, 60%': { transform: 'translateX(-7px)' },
          '40%, 80%': { transform: 'translateX(7px)' },
        },
        sheen: {
          '0%, 65%': { transform: 'translateX(-140%) skewX(-22deg)' },
          '100%': { transform: 'translateX(260%) skewX(-22deg)' },
        },
        popIn: {
          '0%': { opacity: '0', transform: 'scale(0.92) translateY(6px)' },
          '100%': { opacity: '1', transform: 'scale(1) translateY(0)' },
        },
      },
      animation: {
        floatSlow: 'floatSlow 3.4s ease-in-out infinite',
        tagBounce: 'tagBounce 1.2s ease-in-out infinite',
        chestWobble: 'chestWobble 1.6s ease-in-out infinite',
        shakeX: 'shakeX 0.4s ease-in-out',
        sheen: 'sheen 4s infinite',
        popIn: 'popIn 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
    },
  },
  plugins: [],
};
