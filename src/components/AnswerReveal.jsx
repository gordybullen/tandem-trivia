import React from "react";

// styles
import styles from "../styles/AnswerReveal.module.scss";

const AnswerReveal = ({
  selected,
  correct,
  responses,
  timeRemaining,
  handleNext,
}) => {
  const timeLeft = timeRemaining >= 0;

  return (
    <div className={styles.answerContainer}>
      <div className={styles.correct}>Correct answer: {correct}</div>
      <div className={timeLeft && selected === correct ? styles.correct : styles.incorrect}>
        Your answer: {timeLeft ? selected : ""}
      </div>
      <div>
        {timeLeft && selected === correct
          ? "Great job!"
          : "You'll get it next time!"}
      </div>
      <button onClick={handleNext}>
        {responses < 9 ? "Next question!" : "Final score"}
      </button>
    </div>
  );
};

export default AnswerReveal;
