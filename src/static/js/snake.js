import { getUserDirection } from "./userInput.js";
import { getFoodPosition } from "./food.js";
import { getRandomGridPosition } from "./grid.js";

export const SNAKE_SPEED = 10;
// snakeBody[0] = snakeHead
const snakeBody = [getRandomGridPosition()];
let scorePointEle = document.querySelector(".scorepoints");
export let score = 0;
export let expandSnake = false;

export const updateSnake = () => {
	expandSnake = false;
	for (let i = snakeBody.length - 2; i >= 0; i--) {
		snakeBody[i + 1] = { ...snakeBody[i] };
	}
	snakeBody[0].x += getUserDirection().x;
	snakeBody[0].y += getUserDirection().y;
	checkExpandSnake();
};

export const drawSnake = (gameBoard) => {
	snakeBody.forEach((el) => {
		let ele = document.createElement("div");
		ele.classList.add("snake");
		ele.style.gridRowStart = el.y;
		ele.style.gridColumnStart = el.x;
		gameBoard.appendChild(ele);
	});
	let head = document.querySelectorAll(".snake")[0];
	let transformation = getUserDirection().transform;
	if (head) {
		head.classList.add("head");
		let tongue = document.createElement("div");
		tongue.classList.add("tongue");
		head.appendChild(tongue);
		head.style.transform = transformation;
		let hotArea = createHotArea(getFoodPosition(), 3)
		let intersectionHotArea = hotArea.map((pos) => equalPositions(pos, snakeBody[0]))
		if(intersectionHotArea.includes(true)) {
			let mouth = document.createElement("div");
			mouth.classList.add("mouth");
			head.appendChild(mouth);
		}
	}
};

const checkExpandSnake = () => {
	expandSnake = equalPositions(snakeBody[0], getFoodPosition());
	if (expandSnake) {
		snakeBody.push({ ...(snakeBody.length - 1) });
		score += 1;
		scorePointEle.innerHTML = score;
		new Audio('static/audio/eat.mp3').play()
		document.querySelectorAll('.food').forEach(e => e.remove());
	}
};

export const snakeIntersection = () => {
	let intersect = false;
	for (let i = 1; i < snakeBody.length; i++) {
		if (equalPositions(snakeBody[0], snakeBody[i])) {
			intersect = true;
			break;
		}
	}
	return intersect;
};

export const getSnakeHead = () => {
	return snakeBody[0];
};

const equalPositions = (pos1, pos2) => {
	return pos1.x === pos2.x && pos1.y === pos2.y;
};

const createHotArea = (target, radius) => {
	let arr = []
	for(let i = 1; i < radius; i++ ) {
		arr.push({x: target.x, y: target.y + i })
		arr.push({x: target.x, y: target.y - i })
		arr.push({x: target.x + i, y: target.y})
		arr.push({x: target.x - i, y: target.y})
		arr.push({x: target.x - i, y: target.y - i})
		arr.push({x: target.x + i, y: target.y + i})
		arr.push({x: target.x - i, y: target.y + i})
		arr.push({x: target.x + i, y: target.y - i})
	}
	return arr
}