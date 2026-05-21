module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  plugins: [require("daisyui")],
  theme: {
    screens: {
      // 'xs': '475px',
      'sm': '475px',
      'md': '640px',
      'lg': '768px',
      'xl': '1024px',
      '2xl': '1280px',
      '3xl': '1400px',
    },

    extend: {
      colors: {
        'navy-deep': '#0B1220',
        'gray-dark': '#111827',
        'text-primary': '#FFFFFF',
        'text-secondary': '#9CA3AF',
        'text-muted': '#6B7280',
        'blue-action': '#3B82F6',
        'green-success': '#22C55E',
        'border-dark': '#1F2937',
        'border-hover': '#374151',
      
      }
    }
  }
}