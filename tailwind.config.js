module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    screens: {
      xs: "400px",
      // => @media (min-width: 400px) { ... }

      sm: "640px",
      // => @media (min-width: 640px) { ... }

      md: "768px",
      // => @media (min-width: 768px) { ... }

      lg: "1024px",
      // => @media (min-width: 1024px) { ... }

      xl: "1280px",
      // => @media (min-width: 1280px) { ... }

      "2xl": "1536px",
      // => @media (min-width: 1536px) { ... }
    },
    extend: {
      backgroundImage: {
        "section-1-landscape":
          "linear-gradient(180deg,rgba(0, 0, 0, 0.6) 0%,rgba(0, 0, 0, 0.3) 100%), url('https://res.cloudinary.com/xxvii/image/upload/c_fill,g_auto,h_920,w_1920/v1654516713/portfolio/truck.jpg')",
        "section-2-landscape":
          "linear-gradient(180deg,rgba(0, 0, 0, 0.6) 0%,rgba(0, 0, 0, 0.3) 100%), url('https://res.cloudinary.com/xxvii/image/upload/c_fill,g_auto,h_920,w_1920/v1654516705/portfolio/boats.jpg')",
        "section-3-landscape":
          "linear-gradient(180deg,rgba(0, 0, 0, 0.6) 0%,rgba(0, 0, 0, 0.3) 100%), url('https://res.cloudinary.com/xxvii/image/upload/c_fill,g_auto,h_920,w_1920/v1654516704/portfolio/bamaga.jpg')",
        "section-4-landscape":
          "linear-gradient(180deg,rgba(0, 0, 0, 0.6) 0%,rgba(0, 0, 0, 0.3) 100%), url('https://res.cloudinary.com/xxvii/image/upload/c_fill,g_auto,h_920,w_1920/v1654516702/portfolio/cape.jpg')",
        "section-5-landscape":
          "linear-gradient(180deg,rgba(0, 0, 0, 0.6) 0%,rgba(0, 0, 0, 0.3) 100%), url('https://res.cloudinary.com/xxvii/image/upload/c_fill,g_auto,h_1080,w_1920/v1654516705/portfolio/bamaga2.jpg')",
        "section-6-landscape":
          "linear-gradient(180deg,rgba(0, 0, 0, 0.1) 0%,rgba(0, 0, 0, 0) 100%), url('https://res.cloudinary.com/xxvii/image/upload/c_fill,g_auto,h_1080,w_1920/v1654516700/portfolio/sundowner.jpg')",
        "section-1-portrait":
          "linear-gradient(180deg,rgba(0, 0, 0, 0.6) 0%,rgba(0, 0, 0, 0.3) 100%), url('https://res.cloudinary.com/xxvii/image/upload/c_fill,g_auto,h_1000,w_530/v1654516713/portfolio/truck.jpg')",
        "section-2-portrait":
          "linear-gradient(180deg,rgba(0, 0, 0, 0.6) 0%,rgba(0, 0, 0, 0.3) 100%), url('https://res.cloudinary.com/xxvii/image/upload/c_fill,g_auto,h_1000,w_530/v1654516705/portfolio/boats.jpg')",
        "section-3-portrait":
          "linear-gradient(180deg,rgba(0, 0, 0, 0.6) 0%,rgba(0, 0, 0, 0.3) 100%), url('https://res.cloudinary.com/xxvii/image/upload/c_fill,g_auto,h_1000,w_530/v1654516704/portfolio/bamaga.jpg')",
        "section-4-portrait":
          "linear-gradient(180deg,rgba(0, 0, 0, 0.6) 0%,rgba(0, 0, 0, 0.3) 100%), url('https://res.cloudinary.com/xxvii/image/upload/c_fill,g_auto,h_1000,w_530/v1654516702/portfolio/cape.jpg')",
        "section-5-portrait":
          "linear-gradient(180deg,rgba(0, 0, 0, 0.6) 0%,rgba(0, 0, 0, 0.3) 100%), url('https://res.cloudinary.com/xxvii/image/upload/c_fill,g_auto,h_1000,w_530/v1654516705/portfolio/bamaga2.jpg')",
        "section-6-portrait":
          "linear-gradient(180deg,rgba(0, 0, 0, 0.1) 0%,rgba(0, 0, 0, 0) 100%), url('https://res.cloudinary.com/xxvii/image/upload/c_fill,g_xy_center,h_1000,w_530,x_2000,y_0/v1654516700/portfolio/sundowner.jpg')",
      },
    },
  },
  plugins: [],
};
