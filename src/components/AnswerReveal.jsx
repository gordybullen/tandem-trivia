import React from "react";

const AnswerReveal = ({ selected, correct, handleNext }) => {
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

export default AnswerReveal;
