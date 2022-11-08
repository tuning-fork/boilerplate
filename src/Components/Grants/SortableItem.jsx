import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Item } from "./Item";

{
  /* <SortableContext 
        items={items}
        strategy={verticalListSortingStrategy}
      >
        {items.map(item => <SortableItem key={item.id} id={item.id} item={item}/>)}
      </SortableContext> */
}

export function SortableItem(props) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: props.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  console.log(props);

  return (
    <Item
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      item={props.item}
      id={props.id}
    >
      {props.id}
      {props.item.title}
    </Item>
  );
}

// import React from "react";
// import { useSortable } from "@dnd-kit/sortable";
// import { CSS } from "@dnd-kit/utilities";

// export default function SortableElement(props) {
//   const { attributes, listeners, setNodeRef, transform, transition } =
//     useSortable({ id: props.id });

//   const style = {
//     transform: CSS.Transform.toString(transform),
//     transition,
//     listStyle: "none",
//   };

//   return (
//     <li ref={setNodeRef} style={style} {...attributes} {...listeners}>
//       {props.children}
//     </li>
//   );
// }
