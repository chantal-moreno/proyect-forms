import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/useAuth';
import { useEffect } from 'react';
import Logo from '../assets/logo.svg';

function SignIn() {
  const { register, handleSubmit } = useForm();
  const { signin, isAuthenticated, errors: signinErrors } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) navigate('/home');
  }, [isAuthenticated, navigate]);

  const sendData = handleSubmit((data) => {
    signin(data);
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
      <h1 className="mb-5">Sign In</h1>
      {signinErrors.map((error, i) => {
        return (
          <Alert key={i} variant={'danger'}>
            {error}
          </Alert>
        );
      })}
      <Form onSubmit={sendData}>
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
        Don&apos;t have an account? <Link to="/">Sign Up</Link>
      </Form.Text>
      <Form.Text className="mt-3">
        <Link to="/home">Continue without an account</Link>
      </Form.Text>
    </Container>
  );
}

export default SignIn;
