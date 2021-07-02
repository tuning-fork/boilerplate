export const modules = {
  toolbar: [
    [{ header: [1, 2, 3, false] }],
    ["bold", "italic", "underline", "strike", "link"],
    [{ script: "sub" }, { script: "super" }],
    [{ list: "ordered" }, { list: "bullet" }],
    //this align menu includes four default text-align: left, right, center, justify
    [{ align: [] }],
    //clean removes all formatting
    ["clean"],
  ],
};

export const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "link",
  "list",
  "script",
  "bullet",
  "indent",
];
