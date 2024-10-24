import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import Spinner from 'react-bootstrap/Spinner';
import Alert from 'react-bootstrap/Alert';
import Stack from 'react-bootstrap/Stack';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Badge from 'react-bootstrap/Badge';
import OrangeImg from '../assets/orange.jpg';
import NavbarForms from '../components/NavbarForms';
import DynamicModal from '../components/DynamicModal';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from '../api/axios';
import { useForm } from 'react-hook-form';
import { useAuth } from '../context/useAuth';

function TemplateForm() {
  const { register, handleSubmit, reset } = useForm();
  const { user } = useAuth();
  const { templateId } = useParams();
  const [template, setTemplate] = useState(null);
  const [readOnly, setReadOnly] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTemplateAndResponses = async () => {
      try {
        // Get Template
        const templateRes = await axios.get(`/template/${templateId}`);
        setTemplate(templateRes.data.template);
        setReadOnly(templateRes.data.readOnly);
        setLoading(false);

        //User authenticated get answers
        if (user) {
          const answersRes = await axios.get(
            `/templates/${templateId}/user-form-responses`
          );
          if (answersRes.data.answers) {
            setIsUpdating(true);
            const prefilledAnswers = answersRes.data.answers.reduce(
              (acc, answer, index) => {
                acc[`answers.${index}.answerText`] = answer.answerText;
                acc[`answers.${index}.questionId`] = answer.questionId;
                return acc;
              },
              {}
            );
            reset(prefilledAnswers); //Fill template with answers
          }
        }

        if (templateRes.data.readOnly) {
          setShowModal(true);
        }
      } catch (err) {
        console.log(err.response.data);
        setLoading(false);
        setError(err.response.data.error);
      }
    };

    fetchTemplateAndResponses();
  }, [templateId, user, reset]);

  if (error) {
    return (
      <>
        <NavbarForms />
        <Container className="mt-5">
          <Alert variant="danger" className="text-center">
            {error} - <Link to="/home-page">Go back</Link>
          </Alert>
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
      let res;
      if (isUpdating) {
        //Update answers
        res = await axios.put(`/templates/${templateId}/update-form-response`, {
          templateId,
          userId: user.id,
          answers: data.answers,
        });
      } else {
        //Submit answers first time
        res = await axios.post(`/template/${templateId}/submit-answers`, {
          templateId,
          userId: user.id,
          answers: data.answers,
        });
      }

      console.log('Responses saved:', res.data);
      setShowSuccessModal(true);
    } catch (error) {
      console.error('Error saving responses:', error);
      setShowErrorModal(true);
    }
  };
  return (
    <>
      <NavbarForms />
      <Container className="mt-5 bg-light p-0">
        <Image
          src={template.image ? template.image : OrangeImg}
          thumbnail
          style={{ height: '150px', width: '100%', objectFit: 'cover' }}
        />
        <div className="p-3">
          <h2>{template.title}</h2>
          <p className="text-muted">
            {template.topic} - {template.description}
          </p>
          <Stack direction="horizontal" gap={2} className="mb-3">
            {template.tags.map((tag, index) => (
              <Badge bg="secondary" key={index}>
                {tag.name}
              </Badge>
            ))}
          </Stack>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Stack gap={1} className="mx-auto">
              {template.questions?.map((question, index) => (
                <Card key={index} className="mb-3">
                  <Card.Body>
                    <Form.Group className="mb-3">
                      <Form.Label>{question.title}</Form.Label>
                      <Form.Control
                        as={question.type === 'textarea' ? 'textarea' : 'input'}
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
            <Stack direction="horizontal" gap={2}>
              <Button
                variant="outline-danger"
                className="mb-3 w-50"
                onClick={() => navigate('/home-page')}
              >
                Cancel
              </Button>
              <Button
                variant="secondary"
                disabled={readOnly === true}
                type="submit"
                className="mb-3 w-50"
              >
                Submit
              </Button>
            </Stack>
          </Form>
        </div>
      </Container>

      {/* ReadOnly */}
      <DynamicModal
        show={showModal}
        handleClose={() => setShowModal(false)}
        title="Read-Only Mode"
        body={
          <>
            This template is in read-only mode. If you want to answer it you
            need to <Link to="/">Sign Up</Link> or{' '}
            <Link to="/sign-in">Sign In</Link>.
          </>
        }
      />
      {/* Success */}
      <DynamicModal
        show={showSuccessModal}
        handleClose={() => {
          setShowSuccessModal(false);
          navigate('/home-page');
        }}
        title="Success"
        body="Your answers were submitted successfully!"
      />
      {/* Error */}
      <DynamicModal
        show={showErrorModal}
        handleClose={() => setShowErrorModal(false)}
        title="Error"
        body="There was an error submitting your answers. Please try again."
      />
    </>
  );
}

export default TemplateForm;
