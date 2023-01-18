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

const AuthForm = ({ name, displayName }) => {
  const { error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerAddress, setRegisterAddress] = useState("");

  useEffect(() => {
    setRegisterEmail("");
    setRegisterPassword("");
    setRegisterAddress("");
  }, []);

  const handleSubmitSignUp = () => {
    console.log("NAME--->", name);
    const formName = name;
    const email = registerEmail;
    const password = registerPassword;
    const address = registerAddress;
    const isAdmin = false;
    console.log("SIGNUP---->", formName, email, password, address, isAdmin);
    dispatch(
      authenticate({ email, password, address, isAdmin, method: formName })
    );
    console.log("dispatch hit");
  };

  const handleSubmitLogin = () => {
    console.log("NAME--->", name);
    const formName = name;
    const email = registerEmail;
    const password = registerPassword;
    console.log("LOGIN---->", formName, email, password);
    dispatch(authenticate({ email, password, method: formName }));
    console.log("dispatch hit");
  };

  const switchTabs = () => {
    console.log("hello");
    navigate(0);
  };

  if (name === "signup") {
    return (
      <Center>
        <Box display="grid" w="75%" color="grey">
          <Center>
            <Box w="50%">
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

              <Button colorScheme="teal" size="md" onClick={handleSubmitSignUp}>
                Register
              </Button>
            </Box>
          </Center>
        </Box>
      </Center>
    );
  }
  if (name === "login") {
    return (
      <Center>
        <Box display="grid" w="75%" color="grey">
          <Center>
            <Box w="50%">
              <Input
                size="md"
                name="email"
                type="text"
                placeholder="Enter Email"
                onChange={(e) => setRegisterEmail(e.target.value)}
              />
              <Input
                size="md"
                name="password"
                type="password"
                placeholder="Enter Password"
                onChange={(e) => setRegisterPassword(e.target.value)}
              />

              <Button colorScheme="teal" size="md" onClick={handleSubmitLogin}>
                Login
              </Button>
            </Box>
          </Center>
        </Box>
      </Center>
    );
  }
};
export default AuthForm;
