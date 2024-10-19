import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import Spinner from 'react-bootstrap/Spinner';
import Alert from 'react-bootstrap/Alert';
import Stack from 'react-bootstrap/Stack';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Badge from 'react-bootstrap/Badge';
import OrangeImg from '../assets/orange.jpg';
import NavbarForms from '../components/NavbarForms';
import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from '../api/axios';

function Template() {
  const { templateId } = useParams();
  const [template, setTemplate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchTemplate = async () => {
      try {
        const res = await axios.get(`/template/${templateId}`);
        setTemplate(res.data);
        setLoading(false);
        if (res.data.readOnly) {
          setShowModal(true);
        }
      } catch (err) {
        setError('Something went wrong');
        setLoading(false);
        console.log(err);
      }
    };

    fetchTemplate();
  }, [templateId]);

  const handleCloseModal = () => setShowModal(false);

  if (error) {
    return (
      <>
        <NavbarForms />
        <Container className="mt-5">
          <Alert variant="danger">{error}</Alert>
        </Container>
      </>
    );
  }

  if (loading) {
    return (
      <>
        <NavbarForms />
        <Container className="mt-5 d-flex justify-content-center">
          <Spinner animation="border" />
        </Container>
      </>
    );
  }
  console.log(template);
  return (
    <>
      <NavbarForms />
      <Container className="mt-5">
        <Row>
          <Col xs={12} md={8} lg={3}>
            <h2>{`Title: ${template.template.title}`}</h2>
            <h4>Description:</h4>
            <p className="text-muted">{template.template.description}</p>
          </Col>
          <Col xs={12} md={8} lg={6}>
            <Image
              src={OrangeImg}
              thumbnail
              style={{ height: '150px', width: '100%' }}
            />
            <h4>Questions</h4>
            <Stack gap={1} className="mx-auto">
              {template.template?.questions?.map((question, index) => (
                <Card key={index} className="mb-3">
                  <Card.Body>
                    <Form>
                      <Form.Group className="mb-3">
                        <Form.Label>{question.questionTitle}</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter your answer"
                          required
                          readOnly={template.readOnly === true}
                        />
                        <Form.Text className="text-muted">
                          {question.questionDescription}
                        </Form.Text>
                      </Form.Group>
                    </Form>
                  </Card.Body>
                </Card>
              ))}
            </Stack>
            <Button variant="secondary" type="submit">
              Submit
            </Button>
          </Col>
          <Col xs={12} md={8} lg={3}>
            <p>{`Topic: ${template.template.topic}`}</p>

            <p>Tags:</p>
            <Stack direction="horizontal" gap={2}>
              {template.template.tags.map((tag, index) => (
                <Badge bg="secondary" key={index}>
                  {tag}
                </Badge>
              ))}
            </Stack>
            <p>social</p>
          </Col>
        </Row>
      </Container>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Read-Only Mode</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          This template is in read-only mode. If you want to answer it you need
          to <Link to="/"> Sign Up</Link> or <Link to="/sign-in">Sign In</Link>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Template;
