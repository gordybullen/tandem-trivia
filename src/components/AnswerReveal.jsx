import React from "react";

const AnswerReveal = ({ selected, correct, responses, handleNext }) => {
  return (
    <>
      <div>Correct answer: {correct}</div>
      <div>Your answer: {selected}</div>
      <div>
        {selected === correct ? "Great job!!!" : "You'll get it next time!"}
      </div>
      <button onClick={handleNext}>
        {responses < 9 ? "Next question!" : "Final score"}
      </button>
    </>
  );
};

export default AnswerReveal;
