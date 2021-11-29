import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { orange } from "@mui/material/colors";
import Button from "@mui/material/Button";

const Results = () => {
  const result = useSelector((state) => state?.result);
  const allResults = useSelector((state) => state?.listOfResults);
  const navigate = useNavigate();

  const handleLeaderClick = (e) => {
    e.preventDefault();
    navigate("/leaderboard");
  };
  
useEffect(() => {
 localStorage.setItem("allResults", JSON.stringify(allResults))
}, [allResults])

  return (
    <div className="box">
      {result.score > 0 ? (
        <div className="box">
          <h3 className="header-text">CONGRATULATIONS, {result.user}!</h3>
          <span className="text">you've earned</span>
          <span className="score">{result.score}</span>
          <span className="text">points!</span>
        </div>
      ) : (
        <div className="box">
          <h3 className="header-text">OOPS!</h3>
          <span className="text">you've earned</span>
          <span className="score">0</span>
          <span className="text">points:(</span>
        </div>
      )}
      <Button
        style={{
          background: orange[900],
        }}
        variant="contained"
        onClick={handleLeaderClick}
      >
        Show the leaderboard
      </Button>
    </div>
  );
};

export default Results;
