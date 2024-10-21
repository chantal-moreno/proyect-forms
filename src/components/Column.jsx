import PropTypes from 'prop-types';
import '../styles.css';
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import Question from './Question';

function Column({ questions, onDelete }) {
  return (
    <>
      <div className="column">
        <SortableContext
          items={questions}
          strategy={verticalListSortingStrategy}
        >
          {questions.map((question) => (
            <Question
              id={question.id}
              title={question.title}
              description={question.description}
              type={question.type}
              key={question.id}
              onDelete={onDelete}
            />
          ))}
        </SortableContext>
      </div>
    </>
  );
}

Column.propTypes = {
  questions: PropTypes.array.isRequired,
  onDelete: PropTypes.func,
};

export default Column;
