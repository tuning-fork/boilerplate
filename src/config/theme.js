/**
 * @type {import('@mantine/styles').MantineThemeOverride}
 */
const theme = {
  fontFamily: "Rubik",
  lineHeight: 1.75,
  headings: {
    sizes: {
      h1: {
        fontSize: "var(--font-size-large-5)",
        fontWeight: "var(--font-weight-bold)",
        lineHeight: 1.3,
      },
      h2: {
        fontSize: "var(--font-size-large-4)",
        fontWeight: "var(--font-weight-bold)",
        lineHeight: 1.3,
      },
      h3: {
        fontSize: "var(--font-size-large-3)",
        fontWeight: "var(--font-weight-normal)",
        lineHeight: 1.3,
      },
      h4: {
        fontSize: "var(--font-size-large-2)",
        fontWeight: "var(--font-weight-normal)",
        lineHeight: 1.3,
      },
      h5: {
        fontSize: "var(--font-size-large-1)",
        fontWeight: "var(--font-weight-bold)",
        lineHeight: 1.3,
      },
      h6: {
        fontSize: "var(--font-size-small)",
        fontWeight: "var(--font-weight-bold)",
        lineHeight: 1.3,
      },
    },
  },
  colors: {
    primary: [
      "#defbf4",
      "#c0ece1",
      "#9eddd0",
      "#7bcec0",
      "#58c0b2",
      "#3fa79b",
      "#2C7D6E",
      "#1d5e4e",
      "#09392b",
      "#00160b",
    ],
  },
  primaryColor: "primary",
};

export default theme;
