// import React, { useRef, useState } from "react";
// import { Link } from "react-router-dom";
// import { Form, Button } from "react-bootstrap";
// import ReactQuill from "react-quill";
// import { countWords } from "../Services/infofunctions";

// export default function SaveSectionAsBoilerplate(props) {
//   const quillEl = useRef(null);
//   const [title, setTitle] = useState(props.section.title);
//   const [text, setText] = useState(props.section.text);
//   const [organizationId, setOrganizationId] = useState("");
//   const [categoryId, setCategoryId] = useState("");
//   const [wordcount, setWordcount] = useState("");
//   //   const [categories, setCategories] = useState([]);
//   //   const [
//   //     isHiddenCategoriesOrganizationsNew,
//   //     setIsHiddenCategoriesOrganizationsNew,
//   //   ] = useState(true);
//   const [errors, setErrors] = useState([]);
//   const [loading, setLoading] = useState(true);
//   //   const {
//   //     currentOrganizationStore,
//   //     currentOrganizationDispatch,
//   //     organizationClient,
//   //   } = useCurrentOrganizationContext();
//   //   const currentOrganizationId =
//   //     currentOrganizationStore.currentOrganization &&
//   //     currentOrganizationStore.currentOrganization.id;

//   const handleCancel = (event) => {
//     event.preventDefault();
//     props.onCancel();
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     const newBoilerplate = {
//       title: title,
//       text: text,
//       organization_id: props.preventDefaultorganizationId,
//       category_id: categoryId,
//       wordcount: countWords(text),
//     };
//     createBoilerplate(organizationClient, newBoilerplate)
//       .then((boilerplate) => {
//         if (boilerplate) {
//           // handle close save as boilerplate modal
//         }
//       })
//       .catch((error) => {
//         console.log("boilerplate creation error", error);
//       });
//   };

//   //   event.preventDefault();
//   //     props.onSubmit({
//   //       ...boilerplateFields,
//   //       text: quillEl.current.getEditor().getText(),
//   //     });

//   const modules = {
//     toolbar: [
//       [{ header: [1, 2, false] }],
//       ["bold", "italic", "underline", "strike", "blockquote"],
//       [
//         { list: "ordered" },
//         { list: "bullet" },
//         { indent: "-1" },
//         { indent: "+1" },
//       ],
//       ["clean"],
//       [{ color: [] }],
//     ],
//   };

//   const formats = [
//     "header",
//     "bold",
//     "italic",
//     "underline",
//     "strike",
//     "blockquote",
//     "list",
//     "bullet",
//     "indent",
//     "color",
//   ];

//   return (
//     <Form className="SectionForm" onSubmit={handleSubmit}>
//       <Form.Group>
//         <Form.Label>Category</Form.Label>
//         <Form.Control
//           as="select"
//           name="categoryId"
//           value={categoryId}
//           onChange={(event) => setCategoryId(event.target.value)}
//           required
//         >
//           <option value="" disabled>
//             Select Category
//           </option>
//           {categories.map((category) => {
//             return (
//               <option
//                 key={category.id}
//                 value={category.id}
//                 onChange={(event) => setCategoryId(event.target.value)}
//               >
//                 {category.name}
//               </option>
//             );
//           })}
//         </Form.Control>
//       </Form.Group>
//       <Form.Group>
//         <Form.Label>Boilerplate Title</Form.Label>
//         <Form.Control
//           type="text"
//           value={boilerplateFields.title}
//           onChange={(event) => {
//             setBoilerplateFields({
//               ...boilerplateFields,
//               title: event.target.value,
//             });
//           }}
//           required
//         />
//       </Form.Group>
//       <Form.Group>
//         <Form.Label>Boilerplate Text</Form.Label>
//         <ReactQuill
//           className="SectionForm__ContentEditor"
//           ref={quillEl}
//           value={boilerplateFields.html}
//           onChange={(html) => {
//             setBoilerplateFields({
//               ...boilerplateFields,
//               html,
//             });
//           }}
//         />
//       </Form.Group>
//       <div className="SectionForm__Actions">
//         <Link>Store Section as Boilerplate</Link>
//         <Button variant="outline-dark" size="lg" onClick={handleCancel}>
//           Cancel
//         </Button>
//         <Button variant="dark" size="lg" type="submit">
//           Save
//         </Button>
//       </div>
//     </Form>
//   );
// }
