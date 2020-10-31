import React, { useState } from "react";
import questions from "../Apprentice_TandemFor400_Data.json";
import "../styles/TriviaQuestion.css";

function TriviaQuestion() {
  const [questionIdx, setQuestionIdx] = useState(0);
  const [selected, setSelected] = useState("");
  const question = questions[questionIdx];
  const options = question.incorrect.concat(question.correct);

  const handleSelect = (e) => {
    const option = e.target.innerText;

    if (option === selected) {
      setSelected("");
    } else {
      setSelected(option);
    }
  };

  const handleSubmit = () => {
    setQuestionIdx(questionIdx + 1);
  };

  return (
    <div className="question-container">
      <h2 className="question-title">{question.question}</h2>
      <div className="options-container">
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
}

export default TriviaQuestion;
