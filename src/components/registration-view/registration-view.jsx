import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import { Form, Button, Card, CardGroup, Container, Col, Row, Navbar, Nav } from 'react-bootstrap';

export function RegistrationView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');
  const [values, setValues] = useState({
    usernameErr: '',
    passwordErr: '',
    emailErr: '',
    birthdayErr: '',
  });

  const validate = () => {
    let isReq = true;
    if (!username) {
      setValues({ ...values, usernameErr: 'Username Required' });
      isReq = false;
    } else if (username.length < 4) {
      setValues({ ...values, usernameErr: 'Username must be 4 characters long' });
      isReq = false;
    }
    if (!password) {
      setValues({ ...values, passwordErr: 'Password Required' });
      isReq = false;
    } else if (password.length < 6) {
      setValues({ ...values, passwordErr: 'Password must be 6 characters long' });
      isReq = false;
    }
    if (!email) {
      setValues({ ...values, emailErr: 'Email required' });
      isReq = false;
    } else if (email.indexOf('@') === -1) {
      setValues({ ...values, emailErr: 'Email must contain @' });
      isReq = false;
    }
    if (!birthday) {
      setValues({ ...values, birthdayErr: 'Birthday is required' });
      isReq = false;
    }

    return isReq;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isReq = validate();
    if (isReq) {
      axios
        .post('https://melsflix.herokuapp.com/users', {
          Username: username,
          Password: password,
          Email: email,
          Birthday: birthday,
        })
        .then((response) => {
          const data = response.data;
          console.log(data);
          alert('Registration successful, you may now login');
          window.open('/', '_self'); // '_self' is necassary to the page to open in the current tab
        })
        .catch((e) => {
          console.log('Error in registration process');
          alert('It seems something went wrong');
        });
    }
  };

  return (
    <Container fluid className="registerContainer text-center my-3 mx-12">
      <Row>
        <Col>
          <CardGroup>
            <Card>
              <Card.Body>
                <Card.Title className="text-center">Please Register</Card.Title>
                <Form>
                  <Form.Group className="mb-3" controlId="'formBasicUsername'">
                    <Form.Label>Username: </Form.Label>
                    <Form.Control
                      type="text"
                      defaultValue={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="Enter Username"
                      minLength="4"
                      required
                    />
                    {values.usernameErr && <p>{values.usernameErr}</p>}
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label> Password:</Form.Label>
                    <Form.Control
                      type="password"
                      defaultValue={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter Password"
                      minLength="8"
                      required
                    />
                    {values.passwordErr && <p>{values.passwordErr}</p>}
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email: </Form.Label>
                    <Form.Control
                      type="email"
                      defaultValue={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="example@email.com"
                      required
                    />
                    {values.emailErr && <p>{values.emailErr}</p>}
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicBirthday">
                    <Form.Label>Birthday: </Form.Label>
                    <Form.Control
                      type="date"
                      defaultValue={birthday}
                      onChange={(e) => setBirthday(e.target.value)}
                      placeholder="30.01.1990"
                      required
                    />
                    {values.birthdayErr && <p>{values.birthdayErr}</p>}
                  </Form.Group>
                  <Button type="submit" onClick={handleSubmit}>
                    Register
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </CardGroup>
        </Col>
      </Row>
    </Container>
  );
}

RegistrationView.propTypes = {
  register: PropTypes.shape({
    Username: PropTypes.string.isRequired,
    Password: PropTypes.string.isRequired,
    Email: PropTypes.string.isRequired,
  }),
};
