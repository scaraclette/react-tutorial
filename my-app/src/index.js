import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// Function components
function Square(props) {
	return (
		<button className="square" onClick={props.onClick}>
			{props.value}
		</button>
	)
}

class Board extends React.Component {
	renderSquare(i) {
		return (
			<Square
				value={this.props.squares[i]}
				onClick={() => this.props.onClick(i)}
			/>
		);
	}

	render() {
		return (
			<div>
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

class Game extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			history: [{
				squares: Array(9).fill(null),
			}],
			stepNumber: 0,
			xIsNext: true,
		};
	}

	handleClick(i) {
		const history = this.state.history.slice(0, this.state.stepNumber + 1);
		const current = history[history.length - 1];
		// .slice() to create a copy of the squares array
		const squares = current.squares.slice();
		if (calculateWinner(squares) || squares[i]) {
			return;
		}
		squares[i] = this.state.xIsNext ? 'X' : 'O';
		this.setState({
			history: history.concat([{
				squares: squares,
			}]),
			stepNumber: history.length,
			xIsNext: !this.state.xIsNext,
		});
	}

	jumpTo(step) {
		this.setState({
			stepNumber: step,
			xIsNext: (step % 2) === 0,
		});
	}

	render() {
		const history = this.state.history;
		const current = history[this.state.stepNumber];
		const winner = calculateWinner(current.squares);

		const moves = history.map((step, move) => {
			const desc = move ?
				'Go to move #' + move : 'Go to game start';
			return (
				<li key={move}>
					<button onClick={() => this.jumpTo(move)}>{desc}</button>
				</li>
			);
		});

		let status;
		if (winner) {
			status = 'Winner: ' + winner;
		} else {
			status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
		}

		return (
			<div className="game">
				<div className="game-board">
					<Board
						squares={current.squares}
						onClick={(i) => this.handleClick(i)}
					/>
				</div>
				<div className="game-info">
					<div>{status}</div>
					<ol>{moves}</ol>
				</div>
			</div>
		);
	}
}

// Helper function
function calculateWinner(squares) {
	const lines = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6],
	];
	for (let i = 0; i < lines.length; i++) {
		const [a, b, c] = lines[i];
		if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
			return squares[a];
		}
	}
	return null;
}

// ========================================

// function tick() {
	// 	const element = (
	// 		<div>
	// 			<h1>Hello, Chonky!</h1>
	// 			<h2>It is {new Date().toLocaleTimeString()}</h2>.
	// 		</div>
	// 	);
	// 	ReactDOM.render(
	// 		element,
	// 		document.getElementById('root')
	// 	);
	// }
	
	// setInterval(tick, 1000);


// User-defined components
function Welcome(propsi) {
	return <h1>Hello, {propsi.name} {propsi.last}</h1>;
}
// const element = <Welcom name="Si" last="Chonky" />;

// Multiple user defined components
function App() {
	return (
		<dvi>
			<Welcome name="Si" last="Chonky" />
			<Welcome name="Adrian" last="Chonky" />
		</dvi>
	);
}

// Component extract
function formatDate(date) {
	return date.toLocaleDateString();
}

function Avatar(props) {
	return (
		<img className="Avatar" 
			src={props.user.avatarUrl}
			alt={props.user.name}
		/>
	);
}

function UserInfo(props) {
	return (
		<div className="UserInfo">
			<Avatar user={props.user} />
			<div className="UserInfo-name">
				{props.user.name}
			</div>
		</div>
	);
}

function Comment(props) {
	return (
		<div className="Comment">
			<UserInfo user={props.author} />
			<div className="Comment-text">{props.text}</div>
			<div className="Comment.date">
				{formatDate(props.date)}
			</div>
		</div>
	);
}

const comment = {
	date: new Date(),
	text: "Chonky boy so cute!",
	author: {
		name: 'Sibastian Sichonky',
		avatarUrl: 'https://placekitten.com/g/64/64',
	},
};

// STATES and LIFECYCLE
class Clock extends React.Component {
	// Class constructor that initializes state
	constructor(props) {
		super(props);
		this.state = {
			date: new Date(),
			name: 'Sichonky',
		};
	}	

	// It's important to free up resources taken by components when they are destroyed
	// 'Mounting' = set up a timer whenever the Clock is rendered to the DOM for the first time
	componentDidMount() {
		this.timerID = setInterval(
			() => this.tick(),
			1000
		);
	}
	// 'Unmounting' = clear the timer
	// If the Clock compoent is ever removed from the DOM, 
	// React calls the componentWillUnmount() lifecycle method so the timer is stopped
	componentWillUnmount() {
		clearInterval(this.timerID);
	}

	tick() {
		this.setState({
			date: new Date()
		});
	}

	render() {
		return (
			<div>
				<h1>Hello, {this.state.name}!</h1>
				{/* Add local state */}
				<h2>It is {this.state.date.toLocaleTimeString()}.</h2>
			</div>
		);
	}
}

function ActionLink() {
	function handleClick(e) {
		e.preventDefault();
		console.log('The link was clicked');
	}

	return (
		<a href="#" onClick={handleClick}>
			Click Si
		</a>
	);
}

class Toggle extends React.Component {
	constructor(props) {
		super(props);
		this.state = {isToggleOn: true};
		// This binding is necessary to make 'this' work in the callback
		this.handleClick = this.handleClick.bind(this);
	}

	handleClick() {
		this.setState(state => ({
			isToggleOn: !state.isToggleOn
		}));
	}

	render() {
		return (
			// Generally, if you refer to a method without () after it, such as this.handleClice, you should bind that method
			<button onClick={this.handleClick}>
				{this.state.isToggleOn ? 'ON' : 'OFF'}
			</button>
		)
	}
}

// class Greeting extends React.Component {
// 	constructor(props) {
// 		super(props);
// 	}

// 	UserGreeting(props) {
// 		return <h1>Welcome back!</h1>;
// 	}

// 	GuestGreeting(props) {
// 		return <h1>Please sign up.</h1>
// 	}

// 	render() {
// 		if(this.props.isLoggedIn) {
// 			return <userGreeting />;
// 		}
// 		return <GuestGreeting />;
// 	}
// }
function UserGreeting(props) {
	return <h1>Welcome back!</h1>;
}

function GuestGreeting(props) {
	return <h1>Please sign up.</h1>;
}

function Greeting(props) {
	const isLoggedIn = props.isLoggedIn;
	if (isLoggedIn) {
		return <UserGreeting />;
	} else {
		return <GuestGreeting />;
	}
}

// ELEMENT VARIABLES
function LoginButton(props) {
	return (
		<button onClick={props.onClicke}>
			Login
		</button>
	);
}

function LogoutButton(props) {
	return (
		<button onClick={props.onClicke}>
			Logout
		</button>
	)
}

class LoginControl extends React.Component {
	constructor(props) {
		super(props);
		this.handleLoginClick = this.handleLoginClick.bind(this);
		this.handleLogoutClick = this.handleLogoutClick.bind(this);
		this.state = {isLoggedIn: false};
	}

	handleLoginClick() {
		this.setState({isLoggedIn: true});
	}

	handleLogoutClick() {
		this.setState({isLoggedIn: false});
	}

	render() {
		const isLoggedIn = this.state.isLoggedIn;
		console.log(isLoggedIn);
		let button;
		if(isLoggedIn) {
			button = <LogoutButton onClicke={this.handleLogoutClick} />;
		} else {
			button = <LoginButton onClicke={this.handleLoginClick} />;
		}

		return (
			<div>
				<Greeting isLoggedIn={isLoggedIn} />
				{button}
			</div>
		);
	}
}

function Mailbox(props) {
	const unreadMessages = props.unreadMessages;
	return (
		<div>
			<h1>Hello!</h1>
			{unreadMessages.length > 0 && <h2>You have {unreadMessages.length} unread messages</h2>
			}
		</div>
	);
}

const messages = [];

ReactDOM.render(
	<Mailbox unreadMessages={messages} />,
	document.getElementById('root')
);


