import React, { useState, useEffect } from "react";
import AnswerReveal from "./AnswerReveal";
import shuffleArray from "../util/shuffleArray";

// styles
import styles from "../styles/TriviaQuestion.module.scss";

const TriviaQuestion = ({
  questionObj: { question, incorrect, correct },
  submitSelected,
  submitResponse,
  responses,
  answerTime,
  timerOn,
  setMultiplier,
}) => {
  const [selected, setSelected] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [options, setOptions] = useState([]);
  const [time, setTime] = useState(answerTime);

  // combine the array of incorrect answers and the correct answer to get all
  // the options and then shuffle after initial render so correct answer isn't
  // always last option
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
    submitSelected(selected, time);
  };

  const handleNext = () => {
    setSelected("");
    setSubmitted(false);
    setTime(answerTime);
    submitResponse();
  };

  useEffect(() => {
    if (timerOn) {
      const interval = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);

      if (time < 0) {
        setMultiplier(1);
        clearInterval(interval);
      }

      return () => clearInterval(interval);
    }
  }, [time, timerOn, clearInterval]);

  const optionSelect = () => {
    return (
      <div className={styles.optionSelectContainer}>
        {timerOn ? (
          <div className={styles.timerContainer}>
            <div className={styles.timeRemaining}>Timer: {time}</div>
          </div>
        ) : null}
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
      </div>
    );
  };

  return (
    <div className={styles.questionContainer}>
      {/* if no answer has been submitted, show options to select, else reveal answer */}
      {!submitted && time >= 0 ? (
        optionSelect()
      ) : (
        <AnswerReveal
          selected={selected}
          correct={correct}
          responses={responses}
          timeRemaining={time}
          handleNext={handleNext}
        />
      )}
    </div>
  );
};

export default TriviaQuestion;
