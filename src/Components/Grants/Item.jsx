import React, { forwardRef } from "react";
// import countSectionWords from "../../Helpers/countSectionWords";
import "./Item.css";

export const Item = forwardRef(({ id, ...props }, ref) => {
  return (
    <div key={id} {...props} ref={ref}>
      {props.children}
    </div>
  );
});

// export default function Item(props) {
//   const { section } = props;

//   const { setNodeRef, attributes, listeners, transition, transform } =
//     useSortable({ id: section.id });

//   const style = {
//     transition,
//     transform: CSS.Transform.toString(transform),
//   };

//   return (
//     <li
//       className="section-list-item"
//       ref={setNodeRef}
//       {...attributes}
//       {...listeners}
//       style={style}
//     >
//       <article className="section">
//         <p className="section__title">{section.title}</p>
//         <div className="section__wordcount">
//           <b>WORD COUNT: {countSectionWords(section)}</b>
//         </div>
//       </article>
//     </li>
//   );
// }
