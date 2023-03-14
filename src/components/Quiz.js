import { React, useState } from "react";
import { quiz } from "../questions.js";

const Quiz = () => {
  const [activeQuestion, setActiveQuestion] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [result, setResult] = useState({
    score: 0,
    correctAnswers: 0,
    wrongAnswers: 0,
  });
  const [walletAddress, setWalletAddress] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch(`https://testnet.toncenter.com/api/v2/getAddressInformation?address=${walletAddress}`)
      .then(res => res.json());
    if (response && response.addressInfo) {
      setActiveQuestion(0);
    }
    else {
      console.log("Address information not found or invalid");
      // setError("Invalid wallet address. Please enter a valid TON wallet address.");
    }
  };
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

  if (activeQuestion === null) {
    return (
      <form onSubmit={handleSubmit}>
        <label>
          Welcome to Edu Ton App
          <br></br>
          Answer 5 questions correctly and Win A Special NFT
          <br></br>
          Let's get started by copying your wallet address.
          <br></br>
          Wallet Address:
          <input
            type="text"
            value={walletAddress}
            onChange={(event) => setWalletAddress(event.target.value)}
          />
        </label>
        <input type="submit" value="Start Quiz" />
      </form>
    );
  }

  const isQuizCompleted = activeQuestion === quiz.questions.length;
  const isAllAnswersCorrect = result.correctAnswers === quiz.questions.length;

  return (
    <>
      {activeQuestion === quiz.questions.length ? (
        <>
          {result.correctAnswers === quiz.questions.length ? (
            <div>
              <h2>Congratulations!</h2>
              <p>
                You have completed the quiz with a score of {result.score} out
                of {quiz.questions.length}.
              </p>
              <p>
                You got {result.correctAnswers} questions right and{" "}
                {result.wrongAnswers} questions wrong.
              </p>
              <p>
                You've won a special NFT. It'll be airdropped to your wallet
                address shortly. <br></br>You can use your NFT to use various
                facilities in your campus.
              </p>
            </div>
          ) : (
            <div>
              <h2>Quiz completed</h2>
              <p>
                Because you didn't answer all the questions correctly, the
                special NFT that you can use in your campus won't be awarded.
              </p>
              <p>
                You have completed the quiz with a score of {result.score} out
                of {quiz.questions.length}.
              </p>
              <p>
                You got {result.correctAnswers} questions right and{" "}
                {result.wrongAnswers} questions wrong.
              </p>
            </div>
          )}
        </>
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
