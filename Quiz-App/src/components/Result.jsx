import React from "react";
import { useLocation, Link } from "react-router-dom";

const Result = () => {
  //   const [showScore, setShowScore] = useState(false);
  const { state } = useLocation();
  if (!state) {
    return (
      <div style={{ padding: "3rem", textAlign: "center" }}>
        <h2>Take a quiz to view your result!</h2>
        <Link to="/preferences">Choose Topic</Link>
      </div>
    );
  }
  const { score, questionLength, topic, difficulty, amount } = state;

  return (
    <div>
      <h1>RESULT</h1>
      <p>
        You scored {score}/{questionLength}
      </p>
      <Link to="/quiz" state={{ topic, difficulty, amount }}>
        Retake Quiz
      </Link>
      <Link to="/preferences">Select new Topic</Link>
    </div>
  );
};

export default Result;
