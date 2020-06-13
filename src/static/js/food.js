import { getRandomGridPosition } from "./grid.js";
import { expandSnake } from "./snake.js";
let food = getRandomGridPosition();
let lastPos = {}

export function updateFood() {
	if (expandSnake) {
		food = getRandomGridPosition();

	}
}

export function drawFood(gameBoard) {
	if(food !== lastPos) {
		lastPos = food
		let ele = document.createElement("div");
		ele.classList.add("food");
		ele.style.gridRowStart = food.y;
		ele.style.gridColumnStart = food.x;
		gameBoard.appendChild(ele);
	}

}

export const getFoodPosition = () => {
	return food;
};