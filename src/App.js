import { useEffect, useReducer } from "react";

import { questionsArray } from "./questionsArray";

import Main from "./components/Main";
import Header from "./components/Header";
import Loader from "./components/Loader";
import Error from "./components/Error";
import StartScreen from "./components/StartScreen";
import Question from "./components/Question";
import NextQuestion from "./components/NextQuestion";
import Progress from "./components/Progress";
import FinishedScreen from "./components/FinishedScreen";
import Timer from "./components/Timer";
import Footer from "./components/Footer";

// console.log(questionsArray);

const SECS_PER_QUESTION = 20;

const initialState = {
  // the different status of the app would be
  // loading, error, ready, active, and finished

  /*this was how it used to be when i was loadding
  the data from local port:8000*/
  // status: "loading",
  // questions: [],

  /* this is how it is now i'm loading it from the imported questionsArray */
  status: "ready",
  questions: questionsArray,
  //
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
  secondsRemaining: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return { ...state, questions: action.payload, status: "ready" };

    // case "dataFailed":
    //   return { ...state, status: "error" };

    case "start":
      return {
        ...state,
        status: "active",
        secondsRemaining: state.questions.length * SECS_PER_QUESTION,
      };

    case "newAnswer":
      const question = state.questions.at(state.index);
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption ? state.points + question.points : state.points,
      };

    case "nextQuestion":
      return { ...state, index: state.index + 1, answer: null };

    case "tick":
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining === 0 ? "finished" : state.status,
        highscore: state.points > state.highscore ? state.points : state.highscore,
      };

    case "finish":
      return {
        ...state,
        status: "finished",
        highscore: state.points > state.highscore ? state.points : state.highscore,
      };

    case "restart":
      return {
        ...initialState,
        status: "ready",
        questions: state.questions,
        highscore: state.highscore,
      };

    default:
      throw new Error("Unknown Action");
  }
}

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { questions, status, index, answer, points, highscore, secondsRemaining } = state;

  const numQuestions = questions.length;
  const maxPossiblePoints = questions.reduce((prev, cur) => prev + cur.points, 0);

  //THIS WAS THE UseEffect FUNCTION THAT CALLED THE FAKE API
  //FROM LOCAL PORT:8000 BUT IT COULDN'T BE USED IN PRODUCTION
  //SO I HAD TO STORE THE DATA IN ANOTHER ARRAY AND IMPORT IT
  //TO THIS FILE. (check the initialState.questions)

  // useEffect(function () {
  //   fetch("http://localhost:8000/questions")
  //     .then((res) => res.json())
  //     .then((data) => dispatch({ type: "dataReceived", payload: data }))
  //     .catch((err) => dispatch({ type: "dataFailed" }));
  // }, []);

  return (
    <div className="app">
      <Header />

      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && <StartScreen numQuestions={numQuestions} dispatch={dispatch} />}
        {status === "active" && (
          <>
            <Progress
              index={index}
              numQuestions={numQuestions}
              points={points}
              maxPossiblePoints={maxPossiblePoints}
              answer={answer}
            />
            <Question currentQuestion={questions[index]} dispatch={dispatch} answer={answer} />

            <Footer>
              <Timer dispatch={dispatch} secondsRemaining={secondsRemaining} />
              <NextQuestion
                dispatch={dispatch}
                answer={answer}
                index={index}
                numQuestions={numQuestions}
              />
            </Footer>
          </>
        )}

        {status === "finished" && (
          <FinishedScreen
            points={points}
            maxPossiblePoints={maxPossiblePoints}
            highscore={highscore}
            dispatch={dispatch}
          />
        )}
      </Main>
    </div>
  );
}
