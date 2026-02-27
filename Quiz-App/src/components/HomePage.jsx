import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div>
      <nav>
        <ul>
          <li>Home</li>
          <li>Quiz</li>
          <li>Contact</li>
        </ul>
      </nav>
      <img src="logo" />
      <h1>QUIZZIE</h1>
      <p>Test your knowledge across different topics with a quick quiz!</p>
      <Link to="/quiz">Take a Quiz</Link>
    </div>
  );
};

export default HomePage;
