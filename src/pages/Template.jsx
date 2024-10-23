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
import { useForm } from 'react-hook-form';
import { useAuth } from '../context/useAuth';

function Template() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { user } = useAuth();
  const { templateId } = useParams();
  const [template, setTemplate] = useState(null);
  const [readOnly, setReadOnly] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchTemplate = async () => {
      try {
        const res = await axios.get(`/template/${templateId}`);
        setTemplate(res.data.template);
        setReadOnly(res.data.readOnly);
        setLoading(false);
        if (readOnly) {
          setShowModal(true);
        }
      } catch (err) {
        setError('Something went wrong');
        setLoading(false);
        console.log(err);
      }
    };

    fetchTemplate();
  }, [templateId, readOnly]);

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
  const onSubmit = async (data) => {
    console.log(data);
    try {
      const res = await axios.post(`/template/${templateId}/submit-answers`, {
        templateId,
        userId: user.id,
        responses: data,
      });
      console.log('Responses saved:', res.data);
    } catch (error) {
      console.error('Error saving responses:', error);
    }
  };

  return (
    <>
      <NavbarForms />
      <Container className="mt-5">
        <Row>
          <Col xs={12} md={8} lg={3}>
            <h2>{template.title}</h2>
            <h4>Description:</h4>
            <p className="text-muted">{template.description}</p>
            <p>{`Topic: ${template.topic}`}</p>
          </Col>
          <Col xs={12} md={8} lg={6}>
            <Image
              src={template.image ? template.image : OrangeImg}
              thumbnail
              style={{ height: '150px', width: '100%' }}
            />
            <h4>Questions</h4>
            <Form onSubmit={handleSubmit(onSubmit)}>
              <Stack gap={1} className="mx-auto">
                {template.questions?.map((question, index) => (
                  <Card key={index} className="mb-3">
                    <Card.Body>
                      <Form.Group className="mb-3">
                        <Form.Label>{question.title}</Form.Label>
                        <Form.Control
                          as={
                            question.type === 'textarea' ? 'textarea' : 'input'
                          }
                          type={
                            question.type !== 'textarea'
                              ? question.type
                              : undefined
                          }
                          placeholder="Enter your answer"
                          required
                          disabled={readOnly === true}
                          {...register(`answers.${index}.answerText`, {
                            required: true,
                          })}
                        />
                        <input
                          type="hidden"
                          value={question._id}
                          {...register(`answers.${index}.questionId`)}
                        />
                        <Form.Text className="text-muted">
                          {question.description}
                        </Form.Text>
                      </Form.Group>
                    </Card.Body>
                  </Card>
                ))}
              </Stack>
              <Button variant="secondary" type="submit">
                Submit
              </Button>
            </Form>
          </Col>
          <Col xs={12} md={8} lg={3}>
            <p>Tags:</p>
            <Stack direction="horizontal" gap={2}>
              {template.tags.map((tag, index) => (
                <Badge bg="secondary" key={index}>
                  {tag.name}
                </Badge>
              ))}
            </Stack>
            <p>like</p>
            <p>comments</p>
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
