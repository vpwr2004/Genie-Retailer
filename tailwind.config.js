/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./App/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
              
        colors: {
        general: '#2e2c43', //black
        primary: '#fb8c00',//dark orange
        secondary: '#ffe7c8', //light orange
        danger: '#e76063', // red
        inputBoxBg: '#f9f9f9', // pure white
        successText: '#558b2f', //green

      },
      fontSize: {
        first: '18px',
        second: '16px',
        third: '14px',
        fourth: '13px',
        fifth: '12px',
        sixth: '11px',
      },
      fontStyle: {
        first: 'extrabold',
        second: 'bold',
        third: 'semibold',
        fourth: 'light',
      },
      borderRadius: {
        first: '3xl',
        second: '2xl',
        third: 'xl',
        fourth: 'lg',
        fifth: 'md',
        sixth: 'sm',
      },
      background: {
        primary: '#fb8c00', //dark orange
        secondary: '#ffe7c8', //light orange
        success: '#70b241', //green
        danger: '#e76063', //red
        chatUserBg: '#ebebeb', //light grey
        chatRetailerBg: '#fafafa', //pure white
        userAccountBg: '#f9f9f9', //extra white
        dummyUserBg: '#f9f9f9', // extra white
        textInputBg: '#f9f9f9', //extra white
        border: '#2e2c43' //black
      }






    },
  },
  plugins: [],
}

// tailwind.config.js
