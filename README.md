# Tandem Trivia

### [Live Demo](https://gordybullen.github.io/tandem-trivia/)

Tandem Trivia is a fun and simple trivia app that I built using React. I challenged myself to only use function components with Hooks for this app. I recently started learning Hooks and have been loving their simplicity and versatility. Check out Tandem Trivia [here](https://gordybullen.github.io/tandem-trivia/).

<img src="https://soundup-seeds.s3-us-west-1.amazonaws.com/tandem_trivia_menu.png" width=450 />

## Instructions

Tandem Trivia is hosted using GitHub Pages, which allows you to play the game in your browser without downloading the project files. Just click on the link above to play.
If you would like to check out the code yourself and run the app locally, follow these steps:

1. Ensure that you have Node.js and npm installed and updated. If you don't, click [here](https://www.npmjs.com/get-npm) for instructions.
2. Download the repo and unzip it.
3. Open your terminal and cd into the project folder.
4. Run `npm install` to install the dependencies.
5. Run `npm start` to spin up the app and enjoy!

## Technologies

- React
- React Hooks
- Javascript (ES6)

## Trivia Gameplay

- Each round, 10 random trivia question will be pulled from the question bank provided for this code challenge, each with 3-4 potential answers to choose from.
- The player has 15 seconds to select their answer and submit it.
- Alternatively, the player may choose to to turn the timer off for a more leisurely experience. The useEffect hook checks if the timer should be set based on previous user input.

```javascript
// if timerOn is true based on user input, start the timer
useEffect(() => {
  if (timerOn) {
    const interval = setInterval(() => {
      setTime((prevTime) => prevTime - 1);
    }, 1000);

    // clear the interval once time is up or an answer is submitted
    if (time < 0) {
      setMultiplier(1);
      clearInterval(interval);
    } else if (submitted) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }
}, [setMultiplier, time, setTime, timerOn, submitted]);
```

- Once an answer has been submitted, the correct answer will be revealed to the player so that they may check their answer against it.

<img src="https://media.giphy.com/media/OewJCJDiXcVQ2ICKZR/giphy.gif" width="450"/>

- Scoring:
  - Running out of time and not submitting an answer will result in 0 points for that question.
  - For answering correctly, scoring is based on the player's Multiplier and how quickly they answerd the question, if the timer is on.

```javascript
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
```

- A round of trivia is over when all 10 questions have been finished, whether by submitting an answer or the timer running out.
- The player's final score and correct answer count will then be displayed with an option to play again with a new set of questions.

## Next Steps

- [ ] Add unit tests to provide documentation for other developers and prevent future regressions
- [ ] Optimize the UI experience for web and mobile with media queries and CSS
- [ ] Add music and sound effects
- [ ] Add functionality for the user to set the timer for questions
