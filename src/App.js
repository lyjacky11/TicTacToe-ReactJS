import React from 'react';
import logo from './logo.svg';
import './App.css';

function Square(props) {
	return (
	  <button
		className="square"
		onClick={() => props.onClick() }
	  >
		{props.value}
	  </button>
	);
}

class Board extends React.Component {
  renderSquare(i) {
	return (
		<Square
			value={this.props.squares[i]}
			onClick={ () => this.props.onClick(i) }
		/>
	);
  }
  
  render() {
    return (
      <div>
		<h2>Tic Tac Toe</h2>
		<br />
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

function calculateWinner(squares) {
  const winnerLines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < winnerLines.length; i++) {
    const [a, b, c] = winnerLines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

export default class Game extends React.Component {
  constructor(props) {
	  super(props);
	  this.state = {
		  history: [{
			  squares: Array(9).fill(null),
		  }],
		  stepNum: 0,
		  xIsNext: true,
	  };
  }
  
  handleClick(i) {
	  const history = this.state.history.slice(0, this.state.stepNum + 1);
      const current = history[history.length - 1];
	  const squares = current.squares.slice();
	  if (calculateWinner(squares) || squares[i]) {
		return;
	  }
	  squares[i] = this.state.xIsNext ? 'X' : 'O';
	  this.setState({
		  history: history.concat([{
			  squares: squares,
		  }]),
		  stepNum: history.length,
		  xIsNext: !this.state.xIsNext,
	  });
  }
  
  jumpTo(step) {
	  this.setState({
		 stepNum: step,
		 xIsNext: (step % 2) === 0,
	  });
  }
  
  render() {
	const history = this.state.history;
    const current = history[this.state.stepNum];
    const winner = calculateWinner(current.squares);
	
	const moves = history.map((step, move) => {
      const desc = move ?
        'View Move #' + move : 'Game Start';
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>
			{desc}
		  </button>
		  <br /><br />
        </li>
      );
    });
	
	let status;    
    if (winner) {
      status = 'Winner is: ' + winner + '!';
	  alert('Winner is: ' + winner + '!');
    } else {
	  status = 'Next Player: ' + (this.state.xIsNext ? 'X' : 'O');
	}
	
    return (
      <div className="game">
		<header className="App-header">
			<h2>React App</h2>
			<img src={logo} className="App-logo" alt="logo" />
			<p>Welcome to Tic Tac Toe! <br /> Get started by playing below.</p>
		</header>
		<div className="game-div">
			<div className="game-board">
			  <Board
				squares={current.squares}
				onClick={(i) => this.handleClick(i)}
			  />
			</div>
			<div className="game-info">
			  <div>{status}</div>
			  <div>Current Move: #{this.state.stepNum}</div>
			  <br />
			  <ol>{moves}</ol>
			</div>
		</div>
      </div>
    );
  }
}