import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import {
  closestCorners,
  DndContext,
  KeyboardSensor,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { useState } from 'react';
import Column from './Column';
import { arrayMove, sortableKeyboardCoordinates } from '@dnd-kit/sortable';

function AddQuestion() {
  const [questions, setQuestions] = useState([
    {
      id: 1,
      description: 'Educación',
      title: 'Donde estudiaste?',
      type: 'Texto',
    },
  ]);
  const [newType, setNewType] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newTitle, setNewTitle] = useState('');

  const addQuestion = (e) => {
    e.preventDefault();

    setQuestions((questions) => [
      ...questions,
      {
        id: questions.length + 1,
        description: newDescription,
        title: newTitle,
        type: newType,
      },
    ]);

    // Clear fields
    setNewType('');
    setNewDescription('');
    setNewTitle('');
  };

  const getQuestionPosition = (id) => {
    return questions.findIndex((question) => question.id === id);
  };
  const handleDragEnd = (e) => {
    const { active, over } = e;
    if (active.id === over.id) return;
    setQuestions((questions) => {
      const originalPosition = getQuestionPosition(active.id);
      const newPosition = getQuestionPosition(over.id);

      return arrayMove(questions, originalPosition, newPosition);
    });
  };

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  return (
    <Container>
      <h3 className="mt-2">Questions</h3>
      <DndContext
        sensors={sensors}
        onDragEnd={handleDragEnd}
        collisionDetection={closestCorners}
      >
        <Column questions={questions} />
      </DndContext>

      <hr />
      <Container className="text-center mb-3">
        <Form onSubmit={addQuestion}>
          <Form.Label>Add another question</Form.Label>
          <Form.Select
            aria-label="Question type select"
            value={newType}
            onChange={(e) => setNewType(e.target.value)}
            required
            className="mb-3"
          >
            <option>Question type</option>
            <option value="text">Single line text</option>
            <option value="textarea">Multiple line text</option>
            <option value="number">Single number</option>
          </Form.Select>
          <InputGroup className="mb-3">
            <InputGroup.Text id="inputGroup-sizing-default">
              Description
            </InputGroup.Text>
            <Form.Control
              aria-label="Question description"
              aria-describedby="inputGroup-sizing-default"
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              required
            />
          </InputGroup>
          <InputGroup className="mb-3">
            <InputGroup.Text id="inputGroup-sizing-default">
              Title
            </InputGroup.Text>
            <Form.Control
              aria-label="Question title"
              aria-describedby="inputGroup-sizing-default"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              required
            />
          </InputGroup>
          <Button variant="secondary" className="w-50" type="submit">
            <i className="bi bi-plus-lg"></i> Add
          </Button>
        </Form>
      </Container>
    </Container>
  );
}

export default AddQuestion;
