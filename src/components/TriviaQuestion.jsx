import React, { useState, useEffect } from "react";
import "../styles/TriviaQuestion.css";
import shuffleArray from "../util/shuffleArray";

const TriviaQuestion = ({
  questionObj: { question, incorrect, correct },
  submitSelected,
}) => {
  const [selected, setSelected] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [options, setOptions] = useState([]);

  // combine the array of incorrect answers and the correct answer to get all
  // the options and then shuffle after initial render so correct answer isn't always last
  useEffect(() => {
    setOptions(shuffleArray(incorrect.concat(correct)));
  }, [incorrect, correct, setOptions]);

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
      {/* if no answer has been submitted, show options to select, else show answer */}
      {!submitted ? optionSelect() : answerReveal()}
    </div>
  );
};

export default TriviaQuestion;
