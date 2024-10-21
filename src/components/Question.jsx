import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import PropTypes from 'prop-types';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

function Question({ id, description, title, type, onDelete }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
    opacity: isDragging ? 0.5 : 1,
  };
  return (
    <>
      <Card>
        <Card.Body
          ref={setNodeRef}
          {...attributes}
          {...listeners}
          style={style}
        >
          <p className="text-muted">Type: {type}</p>
          <InputGroup className="mb-3">
            <InputGroup.Text id="inputGroup-sizing-default">
              Description
            </InputGroup.Text>
            <Form.Control
              aria-label="Question description"
              aria-describedby="inputGroup-sizing-default"
              defaultValue={description}
            />
          </InputGroup>
          <InputGroup>
            <InputGroup.Text id="inputGroup-sizing-default">
              Title
            </InputGroup.Text>
            <Form.Control
              aria-label="Question title"
              aria-describedby="inputGroup-sizing-default"
              defaultValue={title}
            />
          </InputGroup>
        </Card.Body>
        <Button
          variant="danger"
          className="m-1"
          onClick={() => {
            onDelete(id);
          }}
        >
          <i className="bi bi-trash3-fill"></i>
        </Button>
      </Card>
    </>
  );
}

Question.propTypes = {
  id: PropTypes.number.isRequired,
  description: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  onDelete: PropTypes.func,
};

export default Question;
