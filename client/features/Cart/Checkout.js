import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UsaStates } from "usa-states";
import { useSelector, useDispatch } from "react-redux";
import { emptyCart } from "./cartSlice";

import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";

const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const states = Object.values(new UsaStates().states).map(
    ({ abbreviation }) => abbreviation
  );

  const cardTypes = ["VISA", "Mastercard", "American Express"];

  const [order, setOrder] = useState({});

  const validateData = ({
    email,
    address1,
    address2,
    city,
    state,
    zip,
    cardType,
    name,
    cardNumber,
    CSC,
  }) => {
    if (
      !email.length ||
      !address1.length ||
      !address2.length ||
      !city.length ||
      !zip.length ||
      !name.length ||
      !cardNumber.length ||
      !CSC.length ||
      state === null ||
      cardType === null
    ) {
      alert("FILL IN ALL REQUIRED FIELDS");
      return false;
    } else {
      const shippingInfo = `${address1} \n ${address2}\n ${city}, ${state} ${zip}`;
      const billingInfo = `${cardType}: ${cardNumber}, ${name}, ${CSC}`;

      setOrder({
        shippingInfo: shippingInfo,
        billingInfo: billingInfo,
        contactInfo: email,
        completed: true,
      });
    }
    return true;
  };

  function handleChange(e) {
    e.preventDefault();
  }

  function handleSubmit(e) {
    e.preventDefault();
    // dispatch(submitOrder(order));
    alert("Order Submitted");
    dispatch(emptyCart());
    navigate("/home");
  }

  return (
    <Form onChange={handleChange} onSubmit={handleSubmit}>
      <Row className="mb-3">
        <h2 style={{fontSize:50, fontWeight:"bolder", textDecoration:"underline"}}>SHIPPING</h2>
      </Row>
      <Form.Group className="mb-3" controlId="email">
        <Form.Label>Email</Form.Label>
        <Form.Control type="email" placeholder="Enter email" style={{ width: 350, border: "2px solid black" }} />
      </Form.Group>

      <Form.Group className="mb-3" controlId="address1">
        <Form.Label>Address</Form.Label>
        <Form.Control placeholder="1234 Main St" style={{ width: 350, border: "2px solid black" }}/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="address2">
        <Form.Label>Address 2</Form.Label>
        <Form.Control placeholder="Apartment, studio, or floor" style={{ width: 350, border: "2px solid black" }}/>
      </Form.Group>

      <Row className="mb-3">
        <Form.Group as={Col} controlId="city">
          <Form.Label>City</Form.Label>
          <Form.Control style={{ width: 350, border: "2px solid black" }}/>
        </Form.Group>

        <Form.Group as={Col} controlId="state">
          <Form.Label>State</Form.Label>
          <Form.Select defaultValue="Choose...">
            <option value={null} key={0}>
              Choose...
            </option>
            {states.map((state, i) => (
              <option value={state} key={i + 1}>
                {state}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <Form.Group as={Col} controlId="zip">
          <Form.Label>Zip</Form.Label>
          <Form.Control style={{ width: 350, border: "2px solid black" }}/>
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <h2 style={{fontSize:50, fontWeight:"bolder", textDecoration:"underline"}}>PAYMENT</h2>
      </Row>
      <Form.Group className="checkout-select-grp" controlId="cardType">
        <Form.Label>Type</Form.Label>
        <Form.Select defaultValue="Choose...">
          <option value={null} key={0}>
            Choose...
          </option>
          {cardTypes.map((type, i) => (
            <option value={type} key={i + 1}>
              {type}
            </option>
          ))}
        </Form.Select>
      </Form.Group>
      <Form.Group className="mb-3" controlId="name">
        <Form.Label>Name</Form.Label>
        <Form.Control placeholder="Enter Name On Card" style={{ width: 350, border: "2px solid black" }}/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="cardNumber">
        <Form.Label>Card Number</Form.Label>
        <Form.Control placeholder="Enter Card Number" style={{ width: 350, border: "2px solid black" }}/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="CSC">
        <Form.Label>CSC</Form.Label>
        <Form.Control placeholder="Enter Security Code" style={{ width: 350, border: "2px solid black" }}/>
      </Form.Group>
      <Row className="checkout-btn-grp">
        <Button variant="success" type="submit" style={{border:"2px solid black", backgroundColor:"grey", padding:5, marginTop:10}}>
          Checkout
        </Button>
        {/* <Button onClick={toggleCheckout} variant="warning">
          Exit Checkout
        </Button> */}
      </Row>
    </Form>
  );
};

export default Checkout;
