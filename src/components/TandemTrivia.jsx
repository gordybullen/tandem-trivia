import React, { useState, useEffect } from "react";
import styles from "../styles/TandemTrivia.module.scss";
import TriviaQuestion from "./TriviaQuestion";
import triviaService from "../util/triviaService";

const TandemTrivia = () => {
  const [questions, setQuestions] = useState([]);
  const [responses, setResponses] = useState(0);
  const [score, setScore] = useState(0);
  const [start, setStart] = useState(false);

  // responses is also the index of the next question to be answered */
  const questionObj = questions[responses];

  const checkAnswer = (answer, correctAnswer) => {
    if (answer === correctAnswer) {
      setScore(score + 1);
    }
  };

  const restartGame = () => {
    setResponses(0);
    setScore(0);
    setStart(false);
    getQuestions();
  };

  const getQuestions = () => {
    triviaService().then((questionSet) => setQuestions(questionSet));
  };

  useEffect(getQuestions, [setQuestions]);

  const menu = () => {
    return (
      <>
        <h1 className={styles.title}>Welcome to Tandem Trivia!!!</h1>
        <button onClick={() => setStart(true)}>Start</button>
      </>
    );
  };

  return (
    <div className={styles.container}>
      {/* if start is false, show the menu, otherwise start the trivia */}
      {!start ? (
        menu()
      ) : responses < 10 ? (
        <>
          <div className={styles.currentScore}>
            Current score: {score}/{questions.length}
          </div>
          <TriviaQuestion
            questionObj={questionObj}
            submitSelected={(answer) =>
              checkAnswer(answer, questionObj.correct)
            }
            submitResponse={() =>
              setResponses(responses < 10 ? responses + 1 : 10)
            }
          />
        </>
      ) : (
        // once all questions have been responded to, display the score
        <>
          <div>
            You scored: {score}/{questions.length}
          </div>
          <button onClick={restartGame}>Try again?</button>
        </>
      )}
    </div>
  );
};

export default TandemTrivia;
