import React, { useState } from "react";
import questions from "../util/triviaService";
import "../styles/TriviaQuestion.css";

const TriviaQuestion = ({ questionObj, submitSelected }) => {
  const [selected, setSelected] = useState("");
  const options = questionObj.incorrect.concat(questionObj.correct);

  const handleSelect = (e) => {
    const option = e.target.innerText;

    if (option === selected) {
      setSelected("");
    } else {
      setSelected(option);
    }
  };

  const handleSubmit = () => {
    submitSelected(selected, questionObj.correct)
  }

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
      <button onClick={handleSubmit}>Submit answer</button>
    </div>
  );
};

export default TriviaQuestion;
