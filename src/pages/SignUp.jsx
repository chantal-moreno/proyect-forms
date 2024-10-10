import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/useAuth';
import { useEffect } from 'react';
import Logo from '../assets/logo.svg';

function SignUp() {
  const { register, handleSubmit } = useForm();
  const { signup, isAuthenticated, errors: signupErrors } = useAuth();
  const navigate = useNavigate();
  const handleToSignIn = (e) => handleNavigationClick(e, '/sign-in');
  const handleToHome = (e) => handleNavigationClick(e, '/home');

  const handleNavigationClick = (e, path) => {
    e.preventDefault();
    navigate(path);
  };

  useEffect(() => {
    if (isAuthenticated) navigate('/home');
  }, [isAuthenticated, navigate]);

  const sendData = handleSubmit(async (values) => {
    signup(values);
  });

  return (
    <Container
      className="text-center d-flex justify-content-center align-items-center flex-column"
      style={{ height: '100vh' }}
    >
      <img
        alt=""
        src={Logo}
        width="80"
        height="80"
        className="d-inline-block align-top mb-4"
      />
      <h1 className="mb-5">Sign Up</h1>
      {signupErrors.map((error, i) => {
        return (
          <Alert key={i} variant={'danger'}>
            {error}
          </Alert>
        );
      })}
      <Form onSubmit={sendData}>
        <Row>
          <Col xs={12} md={6} lg={6}>
            <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon1">First Name</InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Enter firts name"
                aria-label="First Name"
                aria-describedby="basic-addon1"
                {...register('firstName', { required: true })}
              />
            </InputGroup>
          </Col>
          <Col xs={12} md={6} lg={6}>
            <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon2">Last Name</InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Enter last name"
                aria-label="Lats Name"
                aria-describedby="basic-addon2"
                {...register('lastName', { required: true })}
              />
            </InputGroup>
          </Col>
        </Row>

        <InputGroup className="mb-3">
          <InputGroup.Text id="basic-addon3">Email</InputGroup.Text>
          <Form.Control
            type="email"
            placeholder="Enter email"
            aria-label="Email"
            aria-describedby="basic-addon3"
            {...register('email', { required: true })}
          />
        </InputGroup>
        <InputGroup className="mb-3">
          <InputGroup.Text id="basic-addon4">Password</InputGroup.Text>
          <Form.Control
            type="password"
            placeholder="Enter password"
            aria-label="Password"
            aria-describedby="basic-addon4"
            {...register('password', { required: true })}
          />
        </InputGroup>
        <Button className="w-50 mb-4" variant="secondary" type="submit">
          Submit
        </Button>
      </Form>
      <Form.Text className="mb-3">
        Already have an account?{' '}
        <a href="#" onClick={handleToSignIn}>
          Sign In
        </a>
      </Form.Text>
      <Form.Text className="mt-3">
        <a href="#" onClick={handleToHome}>
          Continue without an account
        </a>
      </Form.Text>
    </Container>
  );
}

export default SignUp;
