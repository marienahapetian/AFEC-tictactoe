import "./App.css";
import { useState } from "react";

function Square({ value, onSquareClick }) {
	return (
		<button className="square" onClick={onSquareClick}>
			{value ? value : "-"}
		</button>
	);
}

function checkWinner(squares) {
	const winningCombinations = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6],
	];

	for (let i = 0; i < winningCombinations.length; i++) {
		const [a, b, c] = winningCombinations[i];
		if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
			return squares[a]; // returns X or O, based on the winner
		}
	}
	return null;
}

function Board({ xIsNext, squares, onPlay, onRestart }) {
	function handleClick(i) {
		if (squares[i] || winner) {
			return;
		}
		const nextSquares = squares.slice();
		if (xIsNext) {
			nextSquares[i] = "X";
		} else {
			nextSquares[i] = "O";
		}

		onPlay(nextSquares);
	}

	const winner = checkWinner(squares);
	let status;
	let restart = false;
	if (winner) {
		status = "Winner: " + winner;
		restart = true;
	} else if (!winner && !squares.filter((sq) => sq == null).length) {
		status = "Game over! Friendship won";
		restart = true;
	} else {
		status = "Next player: " + (xIsNext ? "X" : "O");
	}

	return (
		<>
			<h1>Tic Tac Toe</h1>
			<div className={"abs " + (winner ? "winner" : restart ? "restart" : "status")}>{status}</div>

			<div className="board-row">
				<Square value={squares[0]} onSquareClick={() => handleClick(0)} />
				<Square value={squares[1]} onSquareClick={() => handleClick(1)} />
				<Square value={squares[2]} onSquareClick={() => handleClick(2)} />
			</div>
			<div className="board-row">
				<Square value={squares[3]} onSquareClick={() => handleClick(3)} />
				<Square value={squares[4]} onSquareClick={() => handleClick(4)} />
				<Square value={squares[5]} onSquareClick={() => handleClick(5)} />
			</div>
			<div className="board-row">
				<Square value={squares[6]} onSquareClick={() => handleClick(6)} />
				<Square value={squares[7]} onSquareClick={() => handleClick(7)} />
				<Square value={squares[8]} onSquareClick={() => handleClick(8)} />
			</div>

			{restart && (
				<button className="restart" onClick={onRestart}>
					Restart Game
				</button>
			)}
		</>
	);
}

export default function Game() {
	const [history, setHistory] = useState([Array(9).fill(null)]);
	const [currentMove, setCurrentMove] = useState(0);
	const xIsNext = currentMove % 2 === 0;

	const currentSquares = history[currentMove];

	const moves = history.map((squares, move) => {
		let description;
		if (move > 0) {
			description = "Go to move #" + move;
		} else {
			description = "Go to game start";
		}
		return (
			<li key={move}>
				<button onClick={() => jumpTo(move)}>{description}</button>
			</li>
		);
	});

	function jumpTo(move) {
		setCurrentMove(move);
	}

	function handleRestart() {
		setCurrentMove(0);
		setHistory([Array(9).fill(null)]);
	}

	function handlePlay(nextSquares) {
		const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
		setHistory(nextHistory);
		setCurrentMove(nextHistory.length - 1);
	}

	return (
		<div className="game">
			<div className="game-board">
				<Board squares={currentSquares} xIsNext={xIsNext} onPlay={handlePlay} onRestart={handleRestart} />
			</div>
			<div className="game-info">
				<ol>{moves}</ol>
			</div>
		</div>
	);
}
