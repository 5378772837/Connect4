
import { Await } from "react-router"
import "../../css/pages/PlayConnect4.css"

import { useEffect, useState } from "react"

function PlayConnect4() {

	const [turn,setTurn] = useState (1)
	const [donePlaying,setDonePlaying] = useState(false)
	let showMessage = false
	const [won,setWon] = useState(0)
	const[row,setRow] = useState(0)
	const[col,setCol] = useState(0)
	const [ message, setMessage] = useState ("")
	const [winner,setWinner] = useState(false)
	const [turnMessage, setTurnMessage] = useState("Red, please enter the column to drop your checker:")

	const [board,setBoard] = useState([
		[null, null, null, null, null, null],
		[null, null, null, null, null, null],
		[null, null, null, null, null, null],
		[null, null, null, null, null, null],
		[null, null, null, null, null, null],
		[null, null, null, null, null, null],
		[null, null, null, null, null, null],
]);


	const setNewBoard =()=>{
		setCol(0);
		setRow(0);
		setBoard([
			[null, null, null, null, null, null],
			[null, null, null, null, null, null],
			[null, null, null, null, null, null],
			[null, null, null, null, null, null],
			[null, null, null, null, null, null],
			[null, null, null, null, null, null],
			[null, null, null, null, null, null],
		]);
	}

	useEffect(()=>{
		if(row!==0||col!==0){
		checkForWin();}
	},[board])

	useEffect(()=>{
		if(row===0&&col===0){
			if(won===2){setTurn(1);setTurnMessage("Red, please enter the column to drop your checker:");}
			else {setTurn(2); setTurnMessage("Yellow, please enter the column to drop your checker:");}
		}else{changeTurnMessage()}
	},[board])


	  const changeTurnMessage =()=>{
		if(turn === 2) {setTurn(1); setTurnMessage("Red, please enter the column to drop your checker:");}
		else {setTurn(2); setTurnMessage("Yellow, please enter the column to drop your checker:");}
	  }



	  const tryAnotherColumn =()=>{
		setMessage("Try another Column")
		console.log(message)
		showMessage=true

	  }


	  const updateBoard = (rowIndex,colIndex)=>{
		setMessage("");
		showMessage=false;
		setBoard(prevBoard=>{

			const newBoard = [...prevBoard];
			newBoard[rowIndex] = [...prevBoard[rowIndex]];
			newBoard[rowIndex][colIndex]=turn;
			return newBoard;
		});
		setRow(rowIndex);
		setCol(colIndex)
	  }


	  const handleDropCol = (column) =>{
		showMessage = false
		setWon(turn)

		if (board[6][column] === null) { updateBoard(6, column);} 
		else if (board[5][column] === null) { updateBoard(5, column);} 
		else if (board[4][column] === null) { updateBoard(4, column);} 
		else if (board[3][column] === null) { updateBoard(3, column);} 
		else if (board[2][column] === null) { updateBoard(2, column);} 
		else if (board[1][column] === null) { updateBoard(1, column);} 
		else if (board[0][column] === null) { updateBoard(0, column);} 
		else { tryAnotherColumn()} 

	}


	  const showBoard = (cellValue,index) => {
			let className;
			switch (cellValue) {
			  case null:
				className = 'whitecircle';
				break;
			  case 1:
				className = 'redcircle';
				break;
			  case 2:
				className = 'yellowcircle';
				break;
			  default:
				className = 'whitecircle';
				break;
			}
			return (
				<div key={index} className="gamebox center">
				  <div className={className + ' center'}></div>
				</div>
			  );
			};



		
		
		const wrongColumn = () => {
			if(showMessage=true){
			return(
				<div>{message}</div>)
			}else{		
				return(
				<div>{message}</div>)}
		}




		const checkForWin =()=> {
			let rowIndex = row;
			let colIndex= col;
			checkRows(rowIndex,colIndex);
			checkColumns(rowIndex,colIndex);
			checkDiagonals(rowIndex,colIndex);
		  }
		  


		  function checkRows(rowIndex,colIndex) {
			//four in a row
			let count = 1
			for(let i = 0;i<=5;i++){
				if(board[rowIndex][i] === board[rowIndex][i+1]&&board[rowIndex][i]!==null){
					count++;
					if(count===4){setWinner(true);break;}
				}else{count=1}
			}
		  }
		  


		  function checkColumns(rowIndex,colIndex) {
			//four in a column
			let colCount = 1;
			for(let i = 0;i<6;i++){
				if(board[i][colIndex] === board[i+1][colIndex]&&board[i][colIndex]!==null){
					colCount++;
					if(colCount===4){setWinner(true);break;}
				}else{colCount = 1}
			}
		
		  }
		  

			
		  function checkDiagonals(rowIndex,colIndex) {
			var topLeft = 0;
			var topRight = topLeft + 3;
			var thisBoard = board.flat();
			for(var i = 0; i < 4; i++) {
				for(var j = 0; j < 3; j++) {
					if (thisBoard[topLeft] === thisBoard[topLeft+7]
						&& thisBoard[topLeft] === thisBoard[topLeft+14]
						&& thisBoard[topLeft] === thisBoard[topLeft+21]
						&& thisBoard[topLeft] !== null) {
						setWinner(true);
					}
		
					if ( thisBoard[topRight] === thisBoard[topRight+5]
						&& thisBoard[topRight] === thisBoard[topRight+10]
						&& thisBoard[topRight] === thisBoard[topRight+15]
						&& thisBoard[topRight] !== null) {
						setWinner(true);
					}
		
					topLeft++;
					topRight = topLeft + 3;
				}
				topLeft = i * 6 + 6;
				topRight = topLeft + 3;
			}
		  }


	  const playAgain = ()=>{
		setWinner(false);
		setNewBoard();
	  }



	  const endGame = ()=>{
	    setDonePlaying(true);
	  }

		


if(winner===false){
	return (
    
		<div className='flex-col background fill center'>
			<div className='flex-row center fill'>
				<div className="sidecolumn fill"></div>
					<div className="centercolumn fill">

						{ <><div className="droprow center">
						<div className="dropbox center">
							<button className="button" onClick={()=>handleDropCol(0)}>Drop</button>
						</div>
						<div className="dropbox center">
							<div className="button" onClick={()=>handleDropCol(1)}>Drop</div>
						</div>
						<div className="dropbox center">
							<div className="button" onClick={()=>handleDropCol(2)}>Drop</div>
						</div>
						<div className="dropbox center">
							<div className="button" onClick={()=>handleDropCol(3)}>Drop</div>
						</div>
						<div className="dropbox center">
							<div className="button" onClick={()=>handleDropCol(4)}>Drop</div>
						</div>
						<div className="dropbox center">
							<div className="button" onClick={()=>handleDropCol(5)}>Drop</div>
						</div>
					     </div>
						
							{board.map((row, rowIndex) => (
								<div key={rowIndex} className="gamerow center">
									{row.map((cell, cellIndex) => showBoard(cell, cellIndex))}
								</div>
							))}
						</>
						

						}
						<h3 className="gamerow center">{turnMessage}</h3>
						<h3 className="gamerow center">{wrongColumn()}</h3>

					</div>
				<div className="sidecolumn fill back2"></div>
			</div>
		</div>
	
	
	  )}else if(winner===true&&donePlaying===false){
		return(
			<div className='flex-col background fill center'>
			<div className='flex-row center fill'>
				<div className="sidecolumn fill"></div>
					<div className="centercolumn fill">
			<>
				<div>
					<h3 className="gamerow center">Winner is Player {won}</h3>
				</div>
				<div>
					<h3 className="gamerow center">Would you like to Play Again?</h3>
				</div>
				<div className="gamerow center">
					<div className="flexcol halfwidth">
						<button className="button" onClick={()=>playAgain()}>Play Again</button>
					</div>
					<div className="flexcol halfwidth">
						<button className="button" onClick={()=>endGame()}>End Game</button>
					</div>
				</div>
			</>
			</div>
				<div className="sidecolumn fill back2"></div>
			</div>
		</div>
		)
	} else {
		return(

		<div className='flex-col background fill center'>
		  <div className='flex-row center fill'>
			<div className="sidecolumn fill"></div>
				<div className="centercolumn fill">

					<>
						<div>
							<h3 className="gamerow center">Thank you for Playing</h3>
						</div>
						<div>
							<h3 className="gamerow center">Have a blessed day!</h3>
						</div>
					</>
			  </div>
     	    <div className="sidecolumn fill back2"></div>
	      </div>
		</div>


		)
		}


}

export default PlayConnect4