import React, { useState } from "react";
import "../styles/TriviaQuestion.css";

const TriviaQuestion = ({
  questionObj: { question, incorrect, correct },
  submitSelected,
}) => {
  const [selected, setSelected] = useState("");
  const [submitted, setSubmitted] = useState(false);

  // combine the array of incorrect answers and the correct answer to get all
  // the options
  const options = incorrect.concat(correct);

  // if no option is selected, disable the answer submit button using a boolean
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
    setSelected("");
    setSubmitted(false);
    submitSelected(selected);
  };

  const optionSelect = () => {
    return (
      <>
        <h2 className="title">{question}</h2>
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
        <button onClick={() => setSubmitted(true)} disabled={submitDisabled}>
          Submit answer
        </button>
      </>
    );
  };

  const answerReveal = () => {
    return (
      <>
        <div>Correct answer: {correct}</div>
        <div>Your answer: {selected}</div>
        <div>
          {selected === correct ? "Great job!!!" : "You'll get it next time!"}
        </div>
        <button onClick={handleSubmit}>Next question!</button>
      </>
    );
  };

  return (
    <div className="questionContainer">
      {!submitted ? optionSelect() : answerReveal()}
    </div>
  );
};

export default TriviaQuestion;
