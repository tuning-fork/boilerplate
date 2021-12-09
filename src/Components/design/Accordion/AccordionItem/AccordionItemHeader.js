import React, { useContext } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { MdChevronRight, MdExpandMore } from "react-icons/md";
import { BsThreeDotsVertical } from "react-icons/bs";
import AccordionItemContext from "./AccordionItemContext";
import Button from "../../Button/Button";
import DropdownMini from "../../DropdownMini/DropdownMini";

export default function AccordionItemHeader(props) {
  const {
    heading: Heading,
    className,
    children,
    dropDownProps,
    editButton,
    deleteButton,
  } = props;
  const { expanded, setExpanded, panelId, headerId } =
    useContext(AccordionItemContext);
  const ExpandIcon = expanded ? MdExpandMore : MdChevronRight;
  const SeeMoreIcon = BsThreeDotsVertical;

  return (
    <Heading className={clsx(className, "accordion-item__header")}>
      <div
        className={clsx(props.buttonClassName, "accordion-item__header__row")}
      >
        <Button
          id={headerId}
          variant="none"
          onClick={() => setExpanded(!expanded)}
          aria-expanded={expanded}
          aria-controls={panelId}
          // className={clsx(props.buttonClassName, "accordion-item__header-button"
        >
          <ExpandIcon className="accordion-item__icon" />
        </Button>
        {children}
        {dropDownProps ? (
          <DropdownMini
            className="accordion-item__see-more"
            labelText={dropDownProps.labelText}
            onChange={() => {
              console.log("banana");
            }}
            options={dropDownProps.options}
            value={dropDownProps.placeholder}
          />
        ) : null}
        {editButton ? <Button>Edit</Button> : null}
        {deleteButton ? <Button>Delete</Button> : null}
      </div>
    </Heading>
  );
}

AccordionItemHeader.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  heading: PropTypes.oneOf(["h1", "h2", "h3", "h4", "h5", "h6"]),
};

AccordionItemHeader.defaultProps = {
  heading: "h1",
};

{
  /* <Modal show={!!sectionToSaveAsBoilerplate}>
  <SaveSectionAsBoilerplate
    section={sectionToSaveAsBoilerplate}
    onClose={() => setSectionToSaveAsBoilerplate(null)}
  />
</Modal>; */
}

// x button on the table header item that opens the edit modal for that category
// x button on the table header that triggers the delete function on that category
// on click delete function
// modal on the category index that opens when the button is clicked
// edit category component in the modal
// edit form
// on submit edit function
// use add new category in paste boilerplate component
