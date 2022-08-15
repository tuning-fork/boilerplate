import { useMemo } from "react";
import { PropTypes } from "prop-types";
import clsx from "clsx";
import { isArrayOfStrings, randomColor } from "./Avatar.helpers";
import "./Avatar.css";

export default function Avatar(props) {
  const { children, ...propsOverride } = props;

  const { initials, color } = useMemo(() => {
    const isString = typeof children === "string";

    if (!isString && !isArrayOfStrings(children)) {
      return { initials: null, color: null };
    }

    const name = isString ? children : children.join("");
    const [firstName, lastName = ""] = name.split(" ");
    const initials =
      firstName[0]?.toUpperCase() + (lastName?.[0] || "").toUpperCase();

    const color = initials && randomColor(name);

    return { initials, color };
  }, [children]);

  return (
    <div
      aria-hidden="true"
      {...propsOverride}
      className={clsx("avatar", propsOverride.className)}
      style={{ backgroundColor: color, ...propsOverride.style }}
    >
      {initials || children}
    </div>
  );
}

Avatar.propTypes = {
  children: PropTypes.node.isRequired,
};
