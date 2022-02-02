import React from "react";

export default function Grid(props) {
    const centeredFlexContainer = {display: "flex", justifyContent: "center"}
    const buttonStyle = {width: "90px", height: "90px", backgroundColor: "green"}
    const gridSquares = [];

    for (let i=0; i<props.width*props.width; i++){
        const squareStyle = {backgroundColor: "blue", height:60, width:60};
        

        if (props.snake.includes(i)) {
            squareStyle.backgroundColor = "green"
        }else if (i === props.apple){
            squareStyle.backgroundColor = "red"
        } else if (props.dead && props.born && props.snake.includes(i)) {
            squareStyle.backgroundColor = "red"
        } 
        let square = <div key={i} style={squareStyle}></div>
        
        gridSquares.push(square);
    }

    return <>
        <div style={centeredFlexContainer}>
            <button onClick={props.startGame} style={buttonStyle}>Start Game</button>
        </div>
        
        <div style={{...centeredFlexContainer, padding: "3em"}}>Current Score: {props.score} </div>
        <div style={{width: 600, height: 600, display: "flex", flexWrap: "wrap", margin:"0 auto"}}>
            {gridSquares}
        </div>
    </>;
}