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
      <div className={styles.menuContainer}>
        <h1 className={styles.title}>
          Welcome to Tandem Trivia!
          <div className={styles.underline}></div>
        </h1>
        <p className={styles.instructions}>
          Test your trivia knowledge by answering 10 questions chosen at random
          from the question bank. <br></br>
          <br></br> Questions will be displayed one at a time. Each question has
          several options to choose from, but only one is correct! <br></br>
          <br></br> Click "Start" to begin. Then, select your best guess and
          click "Submit answer" to see if you got it right.
        </p>
        <button onClick={() => setStart(true)}>Start</button>
      </div>
    );
  };

  return (
    <div className={styles.container}>
      {/* <div className={styles.gameContainer}> */}
      {/* if start is false, show the menu, otherwise start the trivia */}
      {!start ? (
        menu()
      ) : responses < 10 ? (
        <>
          <div className={styles.stats}>
            <div>
              Round: {responses + 1}/{questions.length}
            </div>
            <div>
              Score: {score}
            </div>
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
      {/* </div> */}
    </div>
  );
};

export default TandemTrivia;
