import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Container from "../../design/Container/Container";
import ForgotPasswordForm from "./ForgotPasswordForm";
import "./ForgotPassword.css";
import axios from "axios";

export default function ForgotPassword(props) {
  const history = useHistory();
  const [displayResetMessage, setDisplayResetMessage] = useState(false);

  // const handleCancel = (event) => {
  //   event.preventDefault();
  //   props.onCancel();
  //   history.push(`/splashpage`);
  // };

  const forgotPassword = (email) => {
    axios
      .post("/api/forgot_password", { email: email })
      .then((response) => {
        alert(response.data.message);
        setDisplayResetMessage(true);
      })
      .catch((error) => console.error(error));
  };

  const handleSubmit = (email) => {
    console.log("You submitted a forgot password request");
    forgotPassword(email);
  };

  return (
    <>
      {/* <h1 className="forgot-password">Forgot Password</h1> */}
      <div className="forgot-password">
        <Container as="section" centered>
          <ForgotPasswordForm
            onSubmit={handleSubmit}
            // onCancel={handleCancel}
            toggleModalContents={props.toggleModalContents}
            displayResetMessage={displayResetMessage}
          />
        </Container>
      </div>
    </>
  );
}
// import React, { useState } from "react";
// import axios from "axios";
// import Form from "react-bootstrap/Form";
// import Card from "react-bootstrap/Card";
// import Button from "react-bootstrap/Button";

// export default function ForgotPassword() {
//   const [email, setEmail] = useState("");

//   const forgotPassword = (email) => {
//     axios
//       .post("/api/forgot_password", { email: email })
//       .then((response) => {
//         alert(response.data.message);
//       })
//       .catch((error) => console.error(error));
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     forgotPassword(email);
//     setEmail("");
//   };

//   return (
//     <div className="container">
//       <Card className="basic">
//         <Card.Header>
//           <p>
//             Enter the email address associated with your Boilerplate account
//           </p>
//         </Card.Header>
//         <Card.Body>
//           <Form onSubmit={handleSubmit}>
//             <Form.Group>
//               <Form.Label>Password reset request:</Form.Label>
//               <Form.Control
//                 required
//                 id="forgotpasswordemail"
//                 onChange={(event) => setEmail(event.target.value)}
//                 name="email"
//                 placeholder="email"
//                 type="email"
//                 value={email}
//               />
//               <Button type="submit" className="basic">
//                 Submit
//               </Button>
//             </Form.Group>
//           </Form>
//         </Card.Body>
//       </Card>
//     </div>
//   );
// }
