import PropTypes from "prop-types";
import clsx from "clsx";
import { ReactComponent as Flames } from "./flames.svg";
import "./Background.css";

export default function Background(props) {
  const { color, ...propsOverride } = props;

  return (
    <div {...propsOverride} className={clsx(props.className, "background")}>
      <Flames style={{ color }} />
      {props.children}
    </div>
  );
}

Background.propTypes = {
  color: PropTypes.string,
};

Background.defaultProps = {
  color: "#FCE353",
};
