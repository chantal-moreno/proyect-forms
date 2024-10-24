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
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';

function AddQuestion({ onQuestionsChange }) {
  const [questions, setQuestions] = useState([]);
  const [newType, setNewType] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newTitle, setNewTitle] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const addQuestion = (e) => {
    e.preventDefault();

    if (!newType || !newDescription || !newTitle) {
      setErrorMessage('All fields are required.');
      return;
    }

    const updatedQuestions = [
      ...questions,
      {
        id: uuidv4(),
        description: newDescription,
        title: newTitle,
        type: newType,
      },
    ];
    setQuestions(updatedQuestions);
    onQuestionsChange(updatedQuestions);

    // Clear fields
    setNewType('');
    setNewDescription('');
    setNewTitle('');
    setErrorMessage('');
  };

  const handleDeleteQuestion = (id) => {
    // console.log(id);
    const updatedQuestions = questions.filter((question) => question.id !== id);
    setQuestions(updatedQuestions);
    onQuestionsChange(updatedQuestions);
  };

  const handleUpdateQuestion = (id, newDescription, newTitle) => {
    const updatedQuestions = questions.map((question) =>
      question.id === id
        ? { ...question, description: newDescription, title: newTitle }
        : question
    );
    setQuestions(updatedQuestions);
    onQuestionsChange(updatedQuestions);
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

      const updatedQuestions = arrayMove(
        questions,
        originalPosition,
        newPosition
      );
      setQuestions(updatedQuestions);
      onQuestionsChange(updatedQuestions);

      return updatedQuestions;
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
    <>
      <h3 className="mt-2">Questions</h3>
      <DndContext
        sensors={sensors}
        onDragEnd={handleDragEnd}
        collisionDetection={closestCorners}
      >
        <Column
          questions={questions}
          onDelete={handleDeleteQuestion}
          onUpdate={handleUpdateQuestion}
        />
      </DndContext>

      <hr />
      <Container className="text-center mb-3">
        <Form.Label>Add question</Form.Label>
        <InputGroup className="mb-3">
          <InputGroup.Text id="inputGroup-sizing-default">
            Title
          </InputGroup.Text>
          <Form.Control
            aria-label="Question title"
            aria-describedby="inputGroup-sizing-default"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
          />
        </InputGroup>
        <InputGroup className="mb-3">
          <InputGroup.Text id="inputGroup-sizing-default">
            Description
          </InputGroup.Text>
          <Form.Control
            aria-label="Question description"
            aria-describedby="inputGroup-sizing-default"
            value={newDescription}
            onChange={(e) => setNewDescription(e.target.value)}
          />
        </InputGroup>
        <Form.Select
          aria-label="Question type select"
          value={newType}
          onChange={(e) => setNewType(e.target.value)}
          className="mb-3"
        >
          <option>Question type</option>
          <option value="text">Single line text</option>
          <option value="textarea">Multiple line text</option>
          <option value="number">Single number</option>
        </Form.Select>
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        <Button variant="secondary" className="w-50" onClick={addQuestion}>
          <i className="bi bi-plus-lg"></i> Add
        </Button>
      </Container>
    </>
  );
}

AddQuestion.propTypes = {
  onQuestionsChange: PropTypes.func,
};

export default AddQuestion;
