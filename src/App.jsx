import { useState } from "react";
import { CardContainer } from "./components/Cards";
import "./App.css";
import { getRandomIDs, DECK_SIZE } from "./utils";


function App() {
  //pass to children an onComplete functipon for resetting App?
  const [highScore, setHighScore] = useState(0);
  // const [score, setScore] = useState(0);
  const [randomIDs, setRandomIDs] = useState(getRandomIDs(DECK_SIZE));
  // let randomIDs = getRandomIDs(DECK_SIZE);
  function handleGameEnd(newScore) {
    // setScore(score + 1);
    if (newScore > highScore) {
      setHighScore(newScore);
      newScore = 0;
    }
    setRandomIDs(getRandomIDs(DECK_SIZE));
  }
  
  return (
    <>
      <h1>Pokemon Memory Game</h1>
      <CardContainer ids={randomIDs} onGameEnd={handleGameEnd} highScore={highScore}></CardContainer>
    </>
  );
}

export default App;

//a reset function that calls getRandomIDs again to reset them?  another Score component to store score so that App doesnn't ever reseg unless reset() is called? or just cardcontainer does that

//an idea: app generates the IDs in its body. it is never updated until the game ends and then palyer's high score is updated. THIS IS IN FACT HOW THE EXAMPLE SEEMINGLY WORKS. however, need a way to update when score < maxScore