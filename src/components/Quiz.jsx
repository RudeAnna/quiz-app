import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { saveAnswer, setResult } from "../redux/quizActions";
import { orange } from "@mui/material/colors";
import { deepOrange } from "@mui/material/colors";

const Quiz = () => {
  const [index, setIndex] = useState(0);
  const [value, setValue] = useState("");
  const [options, setOptions] = useState([]);
  //const [timer, setTimer] = useState(15);
  const [date, setDate] = useState(new Date());
  const [score, setScore] = useState(0);
  const [correctAnswer, setCorrectAnswer] = useState("");

  const questions = useSelector((state) => state?.quiz);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleAnswerClick = (e) => {
    e.preventDefault();
    setValue(e.target.value);
    setCorrectAnswer(questions?.[index]?.correct_answer);
    setScore(15000 - (new Date() - date));
    setDate(new Date());
    setIndex(index + 1);
  };

  const handleExitClick = () => {
    navigate("/");
  };
  function shuffle(array) {
    let currentIndex = array.length,
      randomIndex;
    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }
    return array;
  }

  useEffect(() => {
    value === correctAnswer && dispatch(saveAnswer(score));
  }, [value, score, dispatch, correctAnswer]);

  useEffect(() => {
    if (index === 10) {
      navigate("/result");
      dispatch(setResult());
    } else {
      setOptions(
        shuffle([
          ...questions?.[index].incorrect_answers,
          questions?.[index]?.correct_answer,
        ])
      );
      play();
    }
  }, [index, navigate, dispatch, questions]);

  const play = () => {
    document.querySelector(".progress").className = "progress";
    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        document.querySelector(".progress").className =
          "progress play-animation";
      });
    });
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex(index + 1);
    }, 15000);

    return () => {
      clearInterval(timer);
    };
    
  }, [index]);

  return (
    <div className="quiz-box">
      <div className="progress" />
      <div className="box">
        <div className="question-card">
          <div className="quiz-box-left">
            <p className="question-num"> Question {index + 1}/10</p>
            <p className="question-text">{questions?.[index]?.question}</p>
          </div>

          <div className="quiz-box-right">
            {options.map((option) => (
              <Button
                key={Math.random()}
                style={{
                  background: deepOrange[400],
                }}
                variant="contained"
                onClick={handleAnswerClick}
                value={option}
                className="answers"
              >
                {option}
              </Button>
            ))}
          </div>
        </div>

        <Button
          style={{
            color: orange[900],
            borderColor: orange[900],
          }}
          sx={{ mt: 1, mr: 1, width: "200px" }}
          type="submit"
          variant="outlined"
          onClick={handleExitClick}
        >
          Exit
        </Button>
      </div>
    </div>
  );
};

export default Quiz;
