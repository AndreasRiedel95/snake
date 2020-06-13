export let direction = { x: 0, y: 0 };
console.log(direction);
window.addEventListener("keydown", (e) => {
	switch (e.keyCode) {
		case 37:
                  if (direction.x === 1) break;
                  new Audio('static/audio/left.mp3').play()
			direction = { x: -1, y: 0, transform: 'rotate(-90deg)' };
			break;
		case 38:
                  if (direction.y === 1) break;
                  new Audio('static/audio/down.mp3').play()
			direction = { x: 0, y: -1, transform: 'rotate(0deg)' };
			break;
		case 39:
                  if (direction.x === -1) break;
                  new Audio('static/audio/right.mp3').play()
			direction = { x: 1, y: 0, transform: 'rotate(90deg)' };
			break;
		case 40:
                  if (direction.y === -1) break;
                  new Audio('static/audio/up.mp3').play()
			direction = { x: 0, y: 1, transform: 'rotate(-180deg)' };
			break;
		default:
			break;
	}
});

export function getUserDirection() {
	return direction;
}
