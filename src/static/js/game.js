import { SNAKE_SPEED, updateSnake, drawSnake, snakeIntersection, getSnakeHead, score } from "./snake.js";
import { updateFood, drawFood } from "./food.js";
import { outsideGrid } from "./grid.js";

let lastRenderTime = 0;
let gameBoard = document.querySelector(".board-game");
let gameOver = false;
let myStorage = window.localStorage;

document.addEventListener("DOMContentLoaded", () => {
	let highscore = 0;
	let highscoreStorage = myStorage.getItem("highscore");
	highscoreStorage ? (highscore = highscoreStorage) : null;
	document.querySelector(".highscore").innerHTML = highscore;
});

function main(currentTime) {
	if (gameOver) {
		gameBoard.innerHTML = "";
		new Audio("static/audio/dead.mp3").play();
		let highscore = 0;
		let highscoreStorage = myStorage.getItem("highscore");
		highscoreStorage ? (highscore = highscoreStorage) : "";
		if (score > parseInt(highscore)) {
			myStorage.setItem("highscore", score);
		}
		setTimeout(() => {
			if (confirm("You lost. Press ok to restart.")) {
				window.location = "/src";
			}
		}, 100);
		return;
	}
	window.requestAnimationFrame(main);
	let secondLastRenderTime = (currentTime - lastRenderTime) / 1000;
	if (secondLastRenderTime < 1 / SNAKE_SPEED) return;
	lastRenderTime = currentTime;
	mainUpdate();
	mainDraw();
}

const mainUpdate = () => {
	updateFood();
	updateSnake();
	checkifOver();
};

const mainDraw = () => {
    document.querySelectorAll('.snake').forEach(e => e.remove());
	drawFood(gameBoard);
	drawSnake(gameBoard);
};

const checkifOver = () => {
	gameOver = snakeIntersection() || outsideGrid(getSnakeHead());
};
window.requestAnimationFrame(main);
