import { Children, cloneElement } from "react";
import { PropTypes } from "prop-types";
import clsx from "clsx";
import Avatar from "../Avatar/Avatar";
import "./AvatarStack.css";

export default function AvatarStack(props) {
  const { children, className, max = 3, ...propsOverride } = props;
  const length = Children.count(children);
  const avatars = Children.toArray(children)
    .slice(0, max)
    .map((child, index) =>
      cloneElement(child, {
        style: { transform: `translateX(calc(-1.4ch * ${index}))` },
      })
    );
  const excessAvatar = length > max && (
    <Avatar
      className="avatar-stack__excess-avatar"
      style={{ transform: `translateX(calc(-1.4ch * ${max}))` }}
    >
      +{length - max}
    </Avatar>
  );

  return (
    <div className={clsx("avatar-stack", className)} {...propsOverride}>
      {avatars}
      {excessAvatar}
    </div>
  );
}

AvatarStack.propTypes = {
  children: PropTypes.node.isRequired,
  max: PropTypes.number,
};
