import React, { useState, useEffect } from "react";
import styles from "../styles/TriviaQuestion.module.scss";
import shuffleArray from "../util/shuffleArray";

const TriviaQuestion = ({
  questionObj: { question, incorrect, correct },
  submitSelected,
  submitResponse,
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
    setSubmitted(true);
    submitSelected(selected);
  };

  const handleNext = () => {
    setSelected("");
    setSubmitted(false);
    submitResponse();
  };

  const optionSelect = () => {
    return (
      <>
        <h2 className={styles.title}>{question}</h2>
        <div className={styles.optionsContainer}>
          {options.map((option, idx) => {
            return (
              <div
                className={
                  option === selected
                    ? `${styles.option} ${styles.selected}`
                    : styles.option
                }
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
        <button onClick={handleNext}>Next question!</button>
      </>
    );
  };

  return (
    <div className={styles.questionContainer}>
      {/* if no answer has been submitted, show options to select, else show answer */}
      {!submitted ? optionSelect() : answerReveal()}
    </div>
  );
};

export default TriviaQuestion;
