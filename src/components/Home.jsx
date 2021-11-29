import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useDispatch} from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteScore, getQuiz, saveUsername, setAllResults } from "../redux/quizActions";
import { orange } from '@mui/material/colors';

const Home = () => {
  const [user, setUser] = useState("");
  const [isClick, setIsClick] = useState(false)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const allResults = JSON.parse(localStorage.getItem("allResults"));

  const handleUserChange = (e) => {
    e.preventDefault();
    setUser(e.target.value);
    setIsClick(true) 
  };

  useEffect(() => {
    dispatch(deleteScore())
    dispatch(getQuiz());
  });

  const handleSaveUser = (e) => {
    e.preventDefault();
    dispatch(saveUsername(user));
    setIsClick(false)
    navigate("/quiz")
    setUser("");
  };

  useEffect(() => {
    allResults && dispatch(setAllResults(allResults))
  }, [allResults, dispatch])

  return (
    
      <div className="box">
        <h3 className="quiz">Quiz</h3>
        <div className="rules"></div>
        
          <TextField
            helperText="Please enter your name"
            id="demo-helper-text-aligned"
            label="Name"
            sx={{ width: "400px" }}
            value={user}
            onChange={(e) => handleUserChange(e)}
          />
          <Button
          style={{
            background: orange[900],
          }}
          disabled={!isClick}
            variant="contained"
            onClick={(e) => handleSaveUser(e)}
          >
            Start Quiz
          </Button>
        
      </div>
    
  );
};

export default Home;
