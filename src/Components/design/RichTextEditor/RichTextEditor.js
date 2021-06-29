import React from "react";
import PropTypes from "prop-types";
import ReactQuill from "react-quill";
import { modules, formats } from "../../../config/ReactQuillConfig";
import "react-quill/dist/quill.snow.css";
import "./RichTextEditor.css";

export default function RichTextEditor(props) {
  return (
    <ReactQuill
      className={props.className}
      modules={modules}
      format={formats}
      {...props}
    />
  );
}

RichTextEditor.propTypes = {
  className: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

RichTextEditor.defaultProps = {};
