import HomePage from "../src/components/HomePage";
import Preferences from "../src/components/Preferences";
import QuizPage from "../src/components/QuizPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/quiz" element={<Preferences />} />
          <Route path="/start" element={<QuizPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
