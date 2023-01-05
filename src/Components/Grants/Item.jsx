import React, { forwardRef } from "react";

export const Item = forwardRef(({ id, ...props }, ref) => {
  return (
    <div key={id} {...props} ref={ref}>
      {props.children}
    </div>
  );
});
