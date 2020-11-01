import React, { useState } from "react";
import "../styles/TriviaQuestion.css";

const TriviaQuestion = ({ questionObj, submitSelected }) => {
  const [selected, setSelected] = useState("");
  const options = questionObj.incorrect.concat(questionObj.correct);
  // if no option is selected, disable the answer submit button
  const submitDisabled = Boolean(!selected);

  const handleSelect = (e) => {
    const option = e.target.innerText;

    if (option === selected) {
      setSelected("");
    } else {
      setSelected(option);
    }
  };

  const handleSubmit = () => {
    submitSelected(selected);
  };
console.log(submitDisabled)
  return (
    <div className="questionContainer">
      <h2 className="title">{questionObj.question}</h2>
      <div className="optionsContainer">
        {options.map((option, idx) => {
          return (
            <div
              className={option === selected ? "option selected" : "option"}
              key={`option-${idx}`}
              onClick={handleSelect}
            >
              {option}
            </div>
          );
        })}
      </div>
      <button onClick={handleSubmit} disabled={submitDisabled}>
        Submit answer
      </button>
    </div>
  );
};

export default TriviaQuestion;
