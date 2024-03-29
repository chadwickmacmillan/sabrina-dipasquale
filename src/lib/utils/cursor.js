const mouseCoords = { x: 0, y: 0 };
const throttle = (interval, fn) => {
	let lastTime = performance.now() - interval;
	return (...args) => {
		const time = performance.now();
		if (time - lastTime < interval) return;
		lastTime = time;
		fn(...args);
	};
};
export default function createCursor(node) {
	const cursorElement = document.createElement("div");
	cursorElement.classList.add("cursor");
	cursorElement.style.setProperty("--x", mouseCoords.x + "px");
	cursorElement.style.setProperty("--y", mouseCoords.y + "px");
	cursorElement.style.display = "none";
	node.appendChild(cursorElement);

	const changeCursorSvg = (direction) => {
		if (direction === 1) {
			cursorElement.innerHTML = `<svg width="100%" height="100%"
			version="1.1"
			viewBox="0 0 1200 1200"
			xmlns="http://www.w3.org/2000/svg"
		>
			<g
				stroke="var(--color)"
				stroke-miterlimit="10"
				stroke-width="2.5"
			>
				<path
					transform="scale(12)"
					d="m24.5 49.9h50.4"
				/>
				<path
					transform="scale(12)"
					d="m59.9 35.3 15.6 15.6"
				/>
				<path
					transform="scale(12)"
					d="m59.9 64.7 15.6-15.6"
				/>
			</g>
		</svg>`;
		} else {
			cursorElement.innerHTML = `<svg
				width="100%"
				height="100%"
				version="1.1"
				viewBox="0 0 1200 1200"
				xmlns="http://www.w3.org/2000/svg"
			>
				<g 
				stroke="var(--color)" stroke-miterlimit="10" stroke-width="2.5">
					<path transform="scale(12)" d="m75.5 50.1h-50.4" />
					<path transform="scale(12)" d="m40.1 64.7-15.6-15.6" />
					<path transform="scale(12)" d="m40.1 35.3-15.6 15.6" />
				</g>
			</svg>`;
		}
	};

	const changeCursor = (e) => {
		if (
			e.target === node.querySelector(".scroller-controls > .prev-page-btn")
		) {
			changeCursorSvg(-1);
		} else if (
			e.target === node.querySelector(".scroller-controls > .next-page-btn")
		) {
			changeCursorSvg(1);
		} else {
			hideCursor();
		}
	};

	const showCursor = (e) => {
		cursorElement.style.display = "block";
		changeCursor(e);
	};

	const handleCursor = (e) => {
		mouseCoords.x = e.clientX;
		mouseCoords.y = e.clientY;
		cursorElement.style.setProperty("--x", `${mouseCoords.x}px`);
		cursorElement.style.setProperty("--y", `${mouseCoords.y}px`);
		changeCursor(e);
	};

	const hideCursor = () => {
		cursorElement.style.display = "none";
	};

	node.addEventListener("mousemove", handleCursor);
	node.addEventListener("mouseover", showCursor);
	node.addEventListener("mouseleave", hideCursor);

	return {
		destroy() {
			node.removeEventListener("mousemove", handleCursor);
			node.removeEventListener("mouseover", showCursor);
			node.removeEventListener("mouseleave", hideCursor);
			cursorElement.remove();
		},
	};
}
