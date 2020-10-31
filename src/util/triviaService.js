import questionBank from "../assets/Apprentice_TandemFor400_Data.json"

const triviaService = (n = 10) => {
  return (
    // sort all questions randomly and then slice the first n questions
    Promise.resolve(questionBank.sort(() => 0.5 - Math.random()).slice(0, n))
  );
};

export default triviaService;
