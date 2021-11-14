import React, { forwardRef } from "react";
import PropTypes from "prop-types";
import ReactQuill from "react-quill";
import { modules, formats } from "../../../config/ReactQuillConfig";
import "react-quill/dist/quill.snow.css";
import "./RichTextEditor.css";

const RichTextEditor = forwardRef((props, ref) => {
  return (
    <ReactQuill
      className={props.className}
      modules={modules}
      format={formats}
      {...props}
      ref={ref}
    />
  );
});

RichTextEditor.propTypes = {
  className: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

RichTextEditor.defaultProps = {};

export default RichTextEditor;
