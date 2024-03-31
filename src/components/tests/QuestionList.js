import React from 'react';
import Question from './Question';

const QuestionList = ({ questions, onSelect }) => {
  return (
    <div>
      {questions.map((question, index) => (
        <Question
        index={index +1}
          key={index}
          question={question.question}
          options={question.options}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
};

export default QuestionList;
