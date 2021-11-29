import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Quiz from "./components/Quiz";
import Home from "./components/Home";
import Results from "./components/Results";
import Leaderboard from "./components/Leaderboard";

function App() {
  
  return (
    <div className='app'>
      <BrowserRouter>
        <Routes>
          <Route  path="/" index element={<Home />} />
          <Route path="quiz" element={<Quiz />} />
          <Route path="result" element={<Results />} />
          <Route path="leaderboard" element={<Leaderboard />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
