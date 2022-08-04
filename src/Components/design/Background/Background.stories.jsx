import Component from "./Background";

export default {
  title: "Design/Background",
  component: Component,
};

export const Background = (props) => (
  <Component {...props} style={{ height: "100vh" }}>
    <p>This is the background component!</p>
  </Component>
);
