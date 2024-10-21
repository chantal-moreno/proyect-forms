import Card from 'react-bootstrap/Card';
import Stack from 'react-bootstrap/Stack';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import PropTypes from 'prop-types';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

function Question({ id, description, title, type }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };
  return (
    <>
      <Card
        ref={setNodeRef}
        {...attributes}
        {...listeners}
        style={style}
        className="mb-3"
      >
        <Card.Body>
          <Stack direction="horizontal" gap={3}>
            <p className="text-muted">Type: {type}</p>
            <div className="ms-auto">
              <Button variant="danger" className="mb-3">
                <i className="bi bi-trash3-fill"></i>
              </Button>
            </div>
          </Stack>
          <InputGroup className="mb-3">
            <InputGroup.Text id="inputGroup-sizing-default">
              Description
            </InputGroup.Text>
            <Form.Control
              aria-label="Question description"
              aria-describedby="inputGroup-sizing-default"
              value={description}
            />
          </InputGroup>
          <InputGroup className="mb-3">
            <InputGroup.Text id="inputGroup-sizing-default">
              Title
            </InputGroup.Text>
            <Form.Control
              aria-label="Question title"
              aria-describedby="inputGroup-sizing-default"
              value={title}
            />
          </InputGroup>
        </Card.Body>
      </Card>
    </>
  );
}

Question.propTypes = {
  id: PropTypes.number.isRequired,
  description: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

export default Question;
