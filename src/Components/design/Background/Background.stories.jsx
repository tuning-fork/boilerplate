import Component from "./Background";

export default {
  title: "Design/Background",
  component: Component,
};

export const Background = (props) => (
  <Component {...props}>
    <p>This is the background component!</p>
  </Component>
);
