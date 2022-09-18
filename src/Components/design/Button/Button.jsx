import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import "./Button.css";

export const ButtonVariant = {
  Contained: "contained",
  Outlined: "outlined",
  Text: "text",
  None: "none",
  UserIcon: "usericon",
  SignIn: "signin",
  ModalCancelButton: "modalcancelbutton",
};
export const ButtonColor = {
  Primary: "primary",
  Success: "success",
  Error: "error",
  Contrast: "contrast",
  Secondary: "secondary",
};

const Button = React.forwardRef((props, ref) => {
  const { variant, color, children, as: Component, ...restProps } = props;

  return (
    <Component
      {...restProps}
      ref={ref}
      className={clsx(
        props.className,
        "button",
        `button--${variant}`,
        `button--${color}`,
        props.disabled && "button--disabled"
      )}
    >
      {Array.isArray(children)
        ? children.map((child, index) => {
            // Wrap text nodes in span for styling with icons.
            if (typeof child === "string") {
              return <span key={index}>{child}</span>;
            }
            return child;
          })
        : children}
    </Component>
  );
});

Button.propTypes = {
  as: PropTypes.elementType,
  className: PropTypes.string,
  children: PropTypes.node,
  color: PropTypes.oneOf(Object.values(ButtonColor)),
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  tabIndex: PropTypes.number,
  type: PropTypes.oneOf(["button", "reset", "submit"]),
  variant: PropTypes.oneOf(Object.values(ButtonVariant)),
};

Button.defaultProps = {
  as: "button",
  color: ButtonColor.Primary,
  disabled: false,
  type: "button",
  variant: ButtonVariant.Contained,
};

export default Button;
