import React from "react";
import Input, { InputType } from "./Input";
import "../theme.css";

export default {
  title: "Design/Input",
  component: Input,
  argTypes: {
    text: {
      defaultValue: "Button",
      control: {
        type: "text",
      },
    },
    variant: {
      options: Object.values(ButtonVariant),
      control: { type: "radio" },
    },
    color: {
      options: Object.values(ButtonColor),
      control: { type: "radio" },
    },
  },
};

const Container = ({ children }) => (
  <div
    style={{
      display: "flex",
      justifyContent: "space-evenly",
      marginBottom: "20px",
    }}
  >
    {children}
  </div>
);

export const InputText = (props) => <Input {...props}
type="text"
            value={props.value}
            name={props.name}
            // onChange={(event) => setNewTitle(event.target.value)}
            required>
            </Input>;



export const InputText = (props) => <Input {...props}>
   <label>{props.label}</label> 
   <input type={props.type}
value={props.value}
name={props.name}
required></input>
</Input>
;

export const InputQuillText = (props) => (
  
);

export const InputCheckbox = (props) => (
    <Input {...props}
    type={props.type}>
    <label>{props.label}</label>
          <checkbox
            type={props.type}
            name={props.name}
            checked={props.checked}
            // onChange={(event) => setNewSubmitted(event.target.checked)}
          />
    </Input>
);

export const InputDropdown = (props) => (
  <Input {...props} 
  type={props.type}>
  <label>{props.label}</label>
  <input
            as="select"
            name={props.name}
            value={props.value}
            // onChange={(event) => setNewCategoryId(event.target.value)}
            required
       >   
    {props.options.map = (option) => {
        return (
        <select 
        name={option.name}
        value={option.id}
        key={option.id}
        >
        {option.name}
        </select>
        )
    }}
    </input>
  </Input>
);

<div>
  <form action="/action_page.php">
    <label for="fname">First Name</label>
    <input type="text" id="fname" name="firstname" placeholder="Your name..">

    <label for="lname">Last Name</label>
    <input type="text" id="lname" name="lastname" placeholder="Your last name..">

    <label for="country">Country</label>
    <select id="country" name="country">
      <option value="australia">Australia</option>
      <option value="canada">Canada</option>
      <option value="usa">USA</option>
    </select>
  
    <input type="submit" value="Submit">
  </form>
</div>