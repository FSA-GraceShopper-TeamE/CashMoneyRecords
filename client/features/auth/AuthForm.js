import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { authenticate } from "../../app/store";
import {
  Box,
  Stack,
  Button,
  Grid,
  GridItem,
  Wrap,
  WrapItem,
  Input,
  Select,
  Center,
} from "@chakra-ui/react";
import { Link, useParams, useNavigate } from "react-router-dom";
/**
  The AuthForm component can be used for Login or Sign Up.
  Props for Login: name="login", displayName="Login"
  Props for Sign up: name="signup", displayName="Sign Up"
**/

const AuthForm = ({ name, displayName }) => {
  const { error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerAddress, setRegisterAddress] = useState("");

  useEffect(() => {
    // setRegisterEmail('')
    // setRegisterPassword('')
  });

  const handleSubmit = () => {
    // evt.preventDefault();
    const formName = "signup";
    const email = registerEmail;
    const password = registerPassword;
    const address = registerAddress;
    const isAdmin = false;

    dispatch(
      authenticate({ email, password, address, isAdmin, method: formName })
    );
    console.log("dispatch hit");
    console.log("testing---->", formName, email, password, address, isAdmin);
  };

  // return (
  //   <Box w='50%' color='black' border='2px'>
  //     <form onSubmit={handleSubmit} name={name}>
  //       <div>
  //         <label htmlFor="email">
  //           <small>Email</small>
  //         </label>
  //         <input name="email" type="text" />
  //       </div>
  //       <div>
  //         <label htmlFor="password">
  //           <small>Password</small>
  //         </label>
  //         <input name="password" type="password" />
  //       </div>
  //       <div>
  //         <button type="submit">{displayName}</button>
  //       </div>
  //       {/* {error && <div> {error} </div>} */}
  //     </form>
  //   </Box>
  // );

  return (
    <Center>
      <Box
        display="grid"
        w="75%"
        color="grey"
        // border="1px"
        // borderRadius="25px"
        // borderWidth="5px"
        // alignItems="right"
        // alignContent="right"
        // justifyContent="right"
      >
        <Center>
          <Box
            // display="grid"
            w="50%"
            // alignItems="center"
            // alignContent="center"
            // justifyContent="center"
          >
            {/* <Wrap spacing='5px' justify='center'> */}
            <Input
              size="md"
              name="email"
              type="text"
              placeholder="Enter Email"
              onChange={(e) => setRegisterEmail(e.target.value)}
            />
            <Input
              size="md"
              name="address"
              type="text"
              placeholder="Enter Address"
              onChange={(e) => setRegisterAddress(e.target.value)}
            />
            <Input
              size="md"
              name="password"
              type="password"
              placeholder="Enter Password"
              onChange={(e) => setRegisterPassword(e.target.value)}
            />

            <Button colorScheme="teal" size="md" onClick={handleSubmit}>
              Register
            </Button>
            {/* </Wrap> */}
          </Box>
        </Center>
      </Box>
    </Center>
  );
};

export default AuthForm;
