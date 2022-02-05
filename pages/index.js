import React, { useEffect, useState } from "react";
import Grid from "../components/Grid";

const width = 10;
const INITIAL_GAME_STATE = {
  direction: 1,
  snake: [0, 1, 2],
  score: 0,
  apple: 27,
  born: false,
  isDead: true,
  // speed: 1000
}
//tried everything I could think of to get the speed update to work but no dice
let speed = 1000
let speedToggle = false
if (speedToggle) {
  speed = speed * 0
}
export default function Home() {
  const [gameState, setGameState] = useState(INITIAL_GAME_STATE);
  const [gameLoopId, setGameLoopId] = useState(-1);

  const gameLoop = () => {
    setGameState((currentGameState) => {
      const { snake, direction, score, speed } = currentGameState;
      console.log("Looping", direction, snake, score, speed);

      const currentSnakeHead = snake[snake.length - 1];
      const nextSnakeHead = currentSnakeHead + direction;
      const nextSnake = snake;

      let isDead = currentGameState.isDead;
      let apple = currentGameState.apple;
      // let speed = currentGameState.speed;
      function generateApples() {
        console.log("generating new apple")
        let newApple = -1;
        speedToggle = true

        do { newApple = Math.floor(Math.random() * 100) }
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
      } else if (snake.includes(apple)) {
        generateApples()
        score++
        // setSpeed(speed*0)
        // speed = speed * 0
        console.log(speed)
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

      return {
        ...currentGameState,
        apple,
        isDead,
        snake: nextSnake,
        score,
        // speed
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

  // function setSpeed(speed) {
  //   setGameState((currentGameState) => {
  //     return {
  //       ...currentGameState,
  //       speed
  //     }
  //   })
  // }


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
      clearInterval(gameLoopId)
      const newGameLoopId = setInterval(gameLoop, speed);
      
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
      speed={gameState.speed}
      startGame={startGameLoop} />
  </>
}