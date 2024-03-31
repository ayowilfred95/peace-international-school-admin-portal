import { Box } from '@mui/material';
import React from 'react';

const Question = ({ question, options, onSelect, index }) => {
  return (
    <div style={{
      display:"flex",
      gap:"10px",
      marginBottom:"10px"

    }}>
     <Box style={{
    fontWeight:"600"
   }}>
      {index}.
     </Box>
   <Box>
   <div style={{
    fontWeight:"600"
   }} >{question}</div>
      {options.map((option, index) => (
        <div key={index}>
          <input
            type="radio"
            id={option}
            name={question}
            value={option}
            onChange={() => onSelect(option)}
          />
          <label htmlFor={option}>{option}</label>
        </div>
      ))}
   </Box>
    </div>
  );
};

export default Question;
