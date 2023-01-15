import React, { useEffect, useState } from 'react';

import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";







const Checkout = () => {

A
    return (

      <Form onChange={this.handleChange} onSubmit={this.handleSubmit}>
        <Row className='mb-3'>
          <h2>SHIPPING</h2>
        </Row>
        <Form.Group className='mb-3' controlId='email'>
          <Form.Label>Email</Form.Label>
          <Form.Control type='email' placeholder='Enter email' />
        </Form.Group>

        <Form.Group className='mb-3' controlId='address1'>
          <Form.Label>Address</Form.Label>
          <Form.Control placeholder='1234 Main St' />
        </Form.Group>

        <Form.Group className='mb-3' controlId='address2'>
          <Form.Label>Address 2</Form.Label>
          <Form.Control placeholder='Apartment, studio, or floor' />
        </Form.Group>

        <Row className='mb-3'>
          <Form.Group as={Col} controlId='city'>
            <Form.Label>City</Form.Label>
            <Form.Control />
          </Form.Group>

          <Form.Group as={Col} controlId='state'>
            <Form.Label>State</Form.Label>
            <Form.Select defaultValue='Choose...'>
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

          <Form.Group as={Col} controlId='zip'>
            <Form.Label>Zip</Form.Label>
            <Form.Control />
          </Form.Group>
        </Row>
        <Row className='mb-3'>
          <h2>PAYMENT</h2>
        </Row>
        <Form.Group className='checkout-select-grp' controlId='cardType'>
          <Form.Label>Type</Form.Label>
          <Form.Select defaultValue='Choose...'>
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
        <Form.Group className='mb-3' controlId='name'>
          <Form.Label>Name</Form.Label>
          <Form.Control placeholder='Enter Name On Card' />
        </Form.Group>
        <Form.Group className='mb-3' controlId='cardNumber'>
          <Form.Label>Card Number</Form.Label>
          <Form.Control placeholder='Enter Card Number' />
        </Form.Group>
        <Form.Group className='mb-3' controlId='CSC'>
          <Form.Label>CSC</Form.Label>
          <Form.Control placeholder='Enter Security Code' />
        </Form.Group>
        <Row className='checkout-btn-grp'>
          <Button variant='success' type='submit'>
            Checkout
          </Button>
          <Button onClick={toggleCheckout} variant='warning'>
            Exit Checkout
          </Button>
        </Row>
      </Form>
    );
  }


  export default Checkout;
