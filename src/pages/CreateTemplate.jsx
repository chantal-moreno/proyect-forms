import NavbarForms from '../components/NavbarForms';
import ImageUpload from '../components/ImageUpload';
import AddQuestion from '../components/AddQuestion';
import TagsSelector from '../components/TagsSelector';
import AllowedUsers from '../components/AllowedUsers';
import DynamicModal from '../components/DynamicModal';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Image from 'react-bootstrap/Image';
import OrangeImg from '../assets/orange.jpg';
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';
import Alert from 'react-bootstrap/Alert';
import { useForm } from 'react-hook-form';
import axios from '../api/axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function CreateTemplate() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: {
      isPublic: true,
    },
  });
  const [uploadedImage, setUploadedImage] = useState('');
  const [questions, setQuestions] = useState([]);
  const [tags, setTags] = useState([]);
  const isPublic = watch('isPublic');
  const [allowedUsers, setAllowedUsers] = useState([]);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const navigate = useNavigate();

  const handleImageUpload = (imageUrl) => {
    setUploadedImage(imageUrl);
    setValue('image', imageUrl);
  };
  const handleQuestionsChange = (updatedQuestions) => {
    setQuestions(updatedQuestions);
    console.log(updatedQuestions);
    updatedQuestions.forEach((question, index) => {
      setValue(`questions.${index}.title`, question.title);
      setValue(`questions.${index}.description`, question.description);
      setValue(`questions.${index}.type`, question.type);
      setValue(`questions.${index}.order`, question.id);
    });
  };
  const handleTagsChange = (newTags) => {
    setTags(newTags);
    setValue('tags', newTags);
    console.log(newTags);
  };
  const handleAllowedUsersChange = (newAllowedUsers) => {
    setAllowedUsers(newAllowedUsers);
    setValue('allowedUsers', newAllowedUsers);
    console.log(newAllowedUsers);
  };
  const onSubmit = async (data) => {
    console.log(data);
    try {
      await axios.post('/new-template', data);
      setShowSuccessModal(true);
    } catch (error) {
      if (error.status == 400) {
        setAlertMessage(error.response.data.message);
        setShowAlert(true);
      } else {
        console.warn('Error creating template:', error);
        setShowErrorModal(true);
      }
    }
  };
  return (
    <>
      <NavbarForms />
      <Container className="mt-5">
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Row className="mt-3">
            <h1>New Template</h1>
            <Col sm={12} lg={3}>
              <Form.Group
                className="mb-3"
                controlId="TemplateForm.ControlInput1"
              >
                <Form.Label>Template title</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your template title"
                  required
                  {...register('title', { required: 'Title is required' })}
                />
                {errors.title && (
                  <p className="text-danger">{errors.title.message}</p>
                )}
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="TemplateForm.ControlTextarea1"
              >
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={10}
                  required
                  {...register('description', {
                    required: 'Description is required',
                  })}
                />
                {errors.description && (
                  <p className="text-danger">{errors.description.message}</p>
                )}
              </Form.Group>
              <ImageUpload onImageUpload={handleImageUpload} />
            </Col>
            <Col sm={12} lg={6}>
              <Image
                src={uploadedImage ? uploadedImage : OrangeImg}
                thumbnail
                style={{ height: '150px', width: '100%', objectFit: 'cover' }}
              />
              <AddQuestion onQuestionsChange={handleQuestionsChange} />
            </Col>
            <Col sm={12} lg={3}>
              <Form.Group className="mb-3">
                <Form.Label>Template Topic</Form.Label>
                <Form.Select
                  aria-label="Template topic select"
                  required
                  {...register('topic')}
                >
                  <option>Select template topic</option>
                  <option value="Education">Education</option>
                  <option value="Personal">Personal</option>
                  <option value="Work">Work</option>
                  <option value="Other">Other</option>
                </Form.Select>
              </Form.Group>
              <div className="mb-3">
                <p>Tags</p>
                <TagsSelector onTagsChange={handleTagsChange} />
              </div>
              <div className="mb-5 text-center">
                <p className="mt-4">
                  This template will be public unless you want it to be private,
                  so only certain users can access it.
                </p>
                <Form.Group>
                  <Form.Check
                    defaultChecked
                    inline
                    type="radio"
                    label="Public"
                    name="group1"
                    id="radio-public"
                    value={true}
                    {...register('isPublic')}
                  />
                  <Form.Check
                    inline
                    type="radio"
                    label="Private"
                    name="group1"
                    id="radio-private"
                    value={false}
                    {...register('isPublic')}
                  />
                </Form.Group>
                {!JSON.parse(isPublic) && (
                  <AllowedUsers
                    onAllowedUsersChange={handleAllowedUsersChange}
                  />
                )}
              </div>
              <Stack direction="horizontal" gap={2}>
                <Button variant="secondary" type="submit" className="mb-3 w-50">
                  Submit
                </Button>
                <Button
                  variant="outline-danger"
                  className="mb-3 w-50"
                  onClick={() => navigate('/all-templates')}
                >
                  Cancel
                </Button>
              </Stack>
              {showAlert && (
                <Alert variant="danger" onClose={() => setShowAlert(false)}>
                  {alertMessage}
                </Alert>
              )}
            </Col>
          </Row>
        </Form>
      </Container>

      {/* Success */}
      <DynamicModal
        show={showSuccessModal}
        handleClose={() => {
          setShowSuccessModal(false);
          navigate('/home-page');
        }}
        title="Success"
        body="Template created successfully!"
      />
      {/* Error */}
      <DynamicModal
        show={showErrorModal}
        handleClose={() => setShowErrorModal(false)}
        title="Error"
        body="There was an error creating your template. Please try again."
      />
    </>
  );
}

export default CreateTemplate;
