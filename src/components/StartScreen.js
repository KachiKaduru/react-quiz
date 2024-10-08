import { useQuiz } from "../contexts/QuizContext";

export default function StartScreen() {
  const { numQuestions, dispatch } = useQuiz();

  function callDispatch() {
    dispatch({ type: "start" });
  }

  return (
    <div className="start">
      <h2>Welcome to The React Quiz!</h2>
      <h3>{numQuestions} questions to test your React mastery </h3>

      <button className="btn btn-ui" onClick={callDispatch}>
        Let's start
      </button>
    </div>
  );
}
