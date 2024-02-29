import React, { forwardRef } from "react";
import PropTypes from "prop-types";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./RichTextEditor.css";

const RichTextEditor = forwardRef(
  ({ className, readOnly, value, onChange, showToolbar }, ref) => {
    return (
      <ReactQuill
        className={className}
        modules={
          showToolbar
            ? {
                toolbar: [
                  [{ header: [1, 2, false] }],
                  ["bold", "italic", "underline", "strike", "blockquote"],
                  [
                    { list: "ordered" },
                    { list: "bullet" },
                    { indent: "-1" },
                    { indent: "+1" },
                  ],
                  //this align menu includes four default text-align: left, right, center, justify
                  [{ align: ["", "right", "center", "justify"] }],
                  ["link", "image", "video", "formula"],
                  //clean removes all formatting
                  ["clean"],
                ],
              }
            : { toolbar: [] }
        }
        readOnly={readOnly}
        value={value}
        onChange={onChange}
        ref={ref}
      />
    );
  }
);

RichTextEditor.propTypes = {
  className: PropTypes.string,
  readOnly: PropTypes.bool,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  showToolbar: PropTypes.bool,
};
RichTextEditor.defaultProps = {
  onChange: () => {},
  showToolbar: true,
};

export default RichTextEditor;
