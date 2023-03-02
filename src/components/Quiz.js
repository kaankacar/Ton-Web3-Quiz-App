import { React, useState } from "react";
import { quiz } from "../questions.js";
import { TonConnectButton } from "@tonconnect/ui-react";

const Quiz = () => {
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [result, setResult] = useState({
    score: 0,
    correctAnswers: 0,
    wrongAnswers: 0,
  });

  const onClickNext = () => {
    if (selectedAnswer === quiz.questions[activeQuestion].correctAnswer) {
      setResult({
        ...result,
        score: result.score + 1,
        correctAnswers: result.correctAnswers + 1,
      });
    } else {
      setResult({
        ...result,
        wrongAnswers: result.wrongAnswers + 1,
      });
    }
    setActiveQuestion((prev) => prev + 1);
    setSelectedAnswer("");
  };

  return (
    <>
      <div style={{justifyContent: "center", alignItems: "center",}}>
      <TonConnectButton />
    </div>
      {activeQuestion === quiz.questions.length ? (
        <div>
          <h2>Congratulations!</h2>
          <p>
            You have completed the quiz with a score of {result.score} out of{" "}
            {quiz.questions.length}.
          </p>
          <p>
            You got {result.correctAnswers} questions right and{" "}
            {result.wrongAnswers} questions wrong.
          </p>
        </div>
      ) : (
        <div>
          <h3>{quiz.questions[activeQuestion].question}</h3>
          <ul>
            {quiz.questions[activeQuestion].choices.map((choice) => (
              <li key={choice}>
                <input
                  type="radio"
                  value={choice}
                  checked={selectedAnswer === choice}
                  onChange={(e) => setSelectedAnswer(e.target.value)}
                />
                {choice}
              </li>
            ))}
          </ul>
          <button disabled={!selectedAnswer} onClick={onClickNext}>
            Next
          </button>
        </div>
      )}
    </>
  );
};

export default Quiz;
