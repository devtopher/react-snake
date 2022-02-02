import React, { useEffect, useState } from "react";
import Grid from "../components/Grid";

const width = 10;
const INITIAL_GAME_STATE = {
  direction: 1,
  snake: [0,1,2],
  score: 0,
  apple: 27,
  born: false,
  isDead: true
}


export default function Home() {
  const [gameState, setGameState] = useState(INITIAL_GAME_STATE);
  const [gameLoopId, setGameLoopId] = useState(-1);

  const gameLoop = () => {
    setGameState((currentGameState) => {
      const { snake, direction, score } = currentGameState;
      console.log("Looping", direction, snake, score);

      const currentSnakeHead = snake[snake.length - 1];
      const nextSnakeHead = currentSnakeHead + direction;
      const nextSnake = snake;

      let isDead = currentGameState.isDead;
      let apple = currentGameState.apple;
      function generateApples() {
        console.log("generating new apple")
        let newApple = -1;
      
        do {newApple = Math.floor(Math.random() * 100)}
        while (snake.includes(newApple))
        
        apple = newApple;
      }
      

      if (((direction === 1) && (currentSnakeHead % width === width - 1)) ||
          ((direction === -1) && (currentSnakeHead % width === 0)) ||
          ((direction === width) && (currentSnakeHead + width >= (width * width))) ||
          ((direction === -width) && (currentSnakeHead - width <= 0)) ||
           (snake.includes(nextSnakeHead))
      ) {
        console.log("snake is dead");
        isDead = true
      } else {//need to write the logic for whether I ate the apple and remember to change it back to false after the snake updates once.
        
        const iAteTheApple = false;
        if (snake.includes(apple)){
          iAteTheApple = true
        }
        if (iAteTheApple) {
          generateApples()
          score ++
          // moar score
          // new apple
          // this line below and through 71 determines what to do if the apple was eaten versus if it was not eaten.
        } if (iAteTheApple){
            nextSnake = [];

          for (let i = 0; i <= snake.length - 1; i++) {
            nextSnake.push(snake[i]);
          }
    
          nextSnake.push(nextSnakeHead);
          }
          else {
                nextSnake = [];

            for (let i = 1; i <= snake.length - 1; i++) {
              nextSnake.push(snake[i]);
            }
      
            nextSnake.push(nextSnakeHead);
              }
          
          
      }

      return {
        ...currentGameState,
        apple,
        isDead,
        snake: nextSnake,
        score
      };
    });
  };

  function startGameLoop() {
    console.log("Starting");
    setGameState({
      ...INITIAL_GAME_STATE,
      born: true,
      isDead: false
    });
  }

  

  function setDirection(direction) {
    setGameState((currentGameState) => {
      return {
        ...currentGameState,
        direction
      }
    })
  }

  useEffect(() => {
    const keyHandler = (e) => {
      if (e.key === "ArrowLeft") {
        setDirection(-1);
      } else if (e.key === "ArrowUp") {
        setDirection(-width);
      } else if (e.key === "ArrowRight") {
        setDirection(1);
      } else if (e.key === "ArrowDown") {
        setDirection(width);
      }
    };

    document.addEventListener("keydown", keyHandler);

    if (!gameState.isDead && gameLoopId === -1) {
      const newGameLoopId = setInterval(gameLoop, 1000);

      setGameLoopId(newGameLoopId);
    } else if (gameState.isDead && gameLoopId !== -1) {
      console.log("game loop done")
      clearInterval(gameLoopId);
      setGameLoopId(-1);
    }

    return () => {
      document.removeEventListener("keydown", keyHandler);
    }
  }, [gameState.isDead, gameState.gameLoopId]);

  return <>
    {gameState.direction} - {JSON.stringify(gameState.snake)} - Is dead: {gameState.isDead}
    <br />
    <Grid 
      snake={gameState.snake} 
      score={gameState.score} 
      dead={gameState.isDead} 
      apple={gameState.apple}
      born={gameState.born}
      width={width} 
      startGame={startGameLoop} />
  </>
}