export default function Options({ currentQuestion, dispatch, answer }) {
  const hasAnswered = answer !== null;
  console.log(hasAnswered);

  return (
    <div className="options">
      {currentQuestion.options.map((option, index) => (
        <button
          className={`btn btn-option ${index === answer && "answer"} ${
            hasAnswered && (index === currentQuestion.correctOption ? "correct" : "wrong")
          }`}
          key={option}
          disabled={hasAnswered}
          onClick={() => dispatch({ type: "newAnswer", payload: index })}
        >
          {option}
        </button>
      ))}
    </div>
  );
}
