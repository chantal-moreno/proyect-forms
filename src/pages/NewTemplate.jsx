import NavbarForms from '../components/NavbarForms';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Image from 'react-bootstrap/Image';
import OrangeImg from '../assets/orange.jpg';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import Badge from 'react-bootstrap/Badge';

function NewTemplate() {
  return (
    <>
      <NavbarForms />
      <Container className="mt-5">
        <h1>New Template</h1>
        <Row className="mt-3">
          <Col xs={12} md={8} lg={3}>
            <Form>
              <Form.Group
                className="mb-3"
                controlId="TemplateForm.ControlInput1"
              >
                <Form.Label>Template title</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your template title"
                  required
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="TemplateForm.ControlTextarea1"
              >
                <Form.Label>Description</Form.Label>
                <Form.Control as="textarea" rows={10} required />
              </Form.Group>
              <Form.Group controlId="formFile" className="mb-3">
                <Form.Label>Change image</Form.Label>
                <Form.Control type="file" />
              </Form.Group>
            </Form>
          </Col>
          <Col xs={12} md={8} lg={6}>
            <Image
              src={OrangeImg}
              thumbnail
              style={{ height: '150px', width: '100%' }}
            />
            <h3 className="mt-2">Questions</h3>
            <Card className="mb-3">
              <Card.Body>
                <div className="d-flex justify-content-end">
                  <Button variant="danger" className="mb-3">
                    <i className="bi bi-trash3-fill"></i>
                  </Button>
                </div>
                <InputGroup className="mb-3">
                  <InputGroup.Text id="inputGroup-sizing-default">
                    Description
                  </InputGroup.Text>
                  <Form.Control
                    aria-label="Default"
                    aria-describedby="inputGroup-sizing-default"
                  />
                </InputGroup>
                <InputGroup className="mb-3">
                  <InputGroup.Text id="inputGroup-sizing-default">
                    Title
                  </InputGroup.Text>
                  <Form.Control
                    aria-label="Default"
                    aria-describedby="inputGroup-sizing-default"
                  />
                </InputGroup>
              </Card.Body>
            </Card>
            <hr />
            <Container className="text-center mb-3">
              <Row>
                <Col>
                  <Form.Label>Add another question</Form.Label>
                </Col>
              </Row>
              <Row>
                <Col xs={12} md={8} lg={10}>
                  <Form.Select aria-label="Question type select">
                    <option>Question type</option>
                    <option value="text">Text</option>
                  </Form.Select>
                </Col>
                <Col xs={12} md={3} lg={2}>
                  <Button variant="secondary" className="w-100">
                    <i className="bi bi-plus-lg"></i> Add
                  </Button>
                </Col>
              </Row>
            </Container>
          </Col>
          <Col xs={12} md={8} lg={3}>
            <Form className="mb-3">
              <Form.Label>Template Topic</Form.Label>
              <Form.Select aria-label="Template topic select" required>
                <option>Select template topic</option>
                <option value="Education">Education</option>
                <option value="Personal">Personal</option>
                <option value="Work">Work</option>
                <option value="Other">Other</option>
              </Form.Select>
            </Form>
            <div className="mb-3">
              <p>Tags</p>
              <Badge bg="primary">Primary</Badge>
              <Badge bg="secondary">Secondary</Badge>
              <Badge bg="success">Success</Badge>
              <Badge bg="danger">Danger</Badge>
              <Badge bg="warning" text="dark">
                Warning
              </Badge>
              <Badge bg="info">Info</Badge>
              <Badge bg="light" text="dark">
                Light
              </Badge>
              <Badge bg="dark">Dark</Badge>
            </div>
            <div className="mb-3 text-center">
              <p className="">
                This form will be public unless you want it to be private, so
                only certain users can access it.
              </p>
              <Form>
                <Form.Check
                  defaultChecked
                  inline
                  type="radio"
                  label="Public"
                  name="group1"
                  id="radio-public"
                />
                <Form.Check
                  inline
                  type="radio"
                  label="Private"
                  name="group1"
                  id="radio-private"
                />
              </Form>
            </div>
            <Button variant="secondary" type="submit" className="w-100">
              Submit
            </Button>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default NewTemplate;
