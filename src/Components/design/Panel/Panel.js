import React from "react";
import { createPortal } from "react-dom";
import PropTypes from "prop-types";
import clsx from "clsx";
import "./Panel.css";

export default function Panel(props) {
  if (!props.show) {
    return null;
  }
  return createPortal(
    <>
      <dialog
        className={clsx(props.className, "panel")}
        id="slice"
        aria-labelledby="panel-heading"
        aria-modal
        open
      >
        {/* {props.hide && (
          <div className="panel-cancel-button">
            <PanelCancelButton hide={props.hide} />
          </div>
        )} */}

        <div className="panel-header">
          <h1
            id="panel-heading"
            className={clsx(props.headingClassName, "panel__heading")}
          >
            {props.heading}
          </h1>
        </div>
        <div className="panel-content">{props.children}</div>
      </dialog>
      <div className="panel-overlay"></div>
    </>,
    document.body
  );
}

Panel.propTypes = {
  show: PropTypes.bool,
  heading: PropTypes.string.isRequired,
  headingClassName: PropTypes.string,
  className: PropTypes.string,
  //   splashpageForm: PropTypes.bool,
};

Panel.defaultProps = {
  show: false,
};

{
  /* <div class="panel" >
      <h1>Pure CSS panels</h1> 
  </div>
  
  
  <div class="panel" id="slice">
      <div class="panel__content">
          <a href="#home">
              Close me.
          </a>
      </div>
  </div>
  

  
  <!-- Navigation -->
  <div class="menu">
    <a class="menu__link" href="#slice" data-hover="Slice">Slice</a>
    <a class="menu__link" href="#fade" data-hover="Fade">Fade</a> 
  </div> */
}
