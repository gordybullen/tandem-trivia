import React, { useState, useEffect } from "react";
import styles from "../styles/TandemTrivia.module.scss";
import TriviaQuestion from "./TriviaQuestion";
import triviaService from "../util/triviaService";

const ANSWER_TIME = 15;

const TandemTrivia = () => {
  const [questions, setQuestions] = useState([]);
  const [responses, setResponses] = useState(0);
  const [score, setScore] = useState(0);
  const [multiplier, setMultiplier] = useState(1);
  const [answered, setAnswered] = useState(0);
  const [start, setStart] = useState(false);
  const [timerOn, setTimerOn] = useState(true);

  // responses is also the index of the next question to be answered
  const questionObj = questions[responses];

  const checkAnswer = (answer, correctAnswer, timeRemaining) => {
    if (answer === correctAnswer) {
      setAnswered(answered + 1);
      setMultiplier(multiplier + 1);
      const points = 100 - (ANSWER_TIME - timeRemaining) * 5;
      setScore(score + points * multiplier);
    } else {
      setMultiplier(1);
    }
  };

  const toggleTimer = () => {
    setTimerOn(!timerOn);
  };

  const restartGame = () => {
    setResponses(0);
    setScore(0);
    setMultiplier(1);
    setStart(false);
    setAnswered(0);
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
          click "Submit answer" before the timer runs out. You can turn the
          timer off as well if you want to take it easy.
        </p>
        <div className={styles.buttons}>
          <button onClick={() => setStart(true)}>Start</button>
          <button
            className={timerOn ? styles.timerOn : styles.timerOff}
            onClick={toggleTimer}
          >
            {timerOn ? "Turn timer off" : "Turn timer on"}
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className={styles.container}>
      {/* if start is false, show the menu, otherwise start the trivia */}
      {!start ? (
        menu()
      ) : responses < 10 ? (
        <>
          <div className={styles.stats}>
            <div className={styles.statItem}>
              Question: {responses + 1}/{questions.length}
              <div className={styles.shortUnderline}></div>
            </div>
            <div className={styles.statItem}>
              Score: {score}
              <div className={styles.shortUnderline}></div>
            </div>
            <div className={styles.statItem}>
              Multiplier: {multiplier}X
              <div className={styles.shortUnderline}></div>
            </div>
          </div>
          <TriviaQuestion
            questionObj={questionObj}
            submitSelected={(answer, timeRemaining) =>
              checkAnswer(answer, questionObj.correct, timeRemaining)
            }
            submitResponse={() =>
              setResponses(responses < 10 ? responses + 1 : 10)
            }
            responses={responses}
            answerTime={ANSWER_TIME}
            timerOn={timerOn}
            setMultiplier={(num) => setMultiplier(num)}
          />
        </>
      ) : (
        // once all questions have been responded to, display the score
        <div className={styles.gameOver}>
          <div className={styles.finalScore}>Your final score: {score}</div>
          <div className={styles.answered}>
            Questions answered correctly: {answered}/{questions.length}
          </div>
          <div className={styles.thanks}>Thanks for playing!</div>
          <button onClick={restartGame}>Try again?</button>
        </div>
      )}
    </div>
  );
};

export default TandemTrivia;
