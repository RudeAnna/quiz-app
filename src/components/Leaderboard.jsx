import React from "react";
import { useSelector } from "react-redux";
import { orange } from "@mui/material/colors";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router";

const Leaderboard = () => {
  const allResults = useSelector((state) => state?.listOfResults);
  const score = useSelector((state) => state?.result?.score);
  const navigate = useNavigate();

  function sortArray(a, b) {
    if (a.score < b.score) return 1;
    if (a.score === b.score) return 0;
    if (a.score > b.score) return -1;
  }

  allResults.sort(sortArray);

  const handleExitClick = () => {
    navigate("/");
  };

  return (
    <div className="box results">
      <h3 className="header-text">BEST of the best</h3>
      {allResults.map(
        (result, index) =>
          index <= 4 && (
            <div key={Math.random()} className="user-result">
              <p className="num">{index + 1}</p>
              <p className="text">{result.user}</p>
              <p className="text">{result.score}</p>
            </div>
          )
      )}
      <p className="header-text">Your place</p>
      {allResults.map(
        (el, index) =>
          el.score === score && (
            <h3 className="header-text" key={index}>
              {index + 1}
            </h3>
          )
      )}
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
  );
};

export default Leaderboard;
