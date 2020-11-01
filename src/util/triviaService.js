import questionBank from "../assets/Apprentice_TandemFor400_Data.json"
import shuffleArray from "./shuffleArray";

const triviaService = (n = 10) => {
  return (
    // sort all questions randomly and then slice the first n questions
    Promise.resolve(shuffleArray(questionBank).slice(0, n))
  );
};

export default triviaService;
