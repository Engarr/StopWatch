const startBtn = document.querySelector('.start');
const pauseBtn = document.querySelector('.pause');
const stopBtn = document.querySelector('.stop');
const resetBtn = document.querySelector('.reset');
const historyBtn = document.querySelector('.history');
const stopwatch = document.querySelector('.stopwatch');
const time = document.querySelector('.time');
const timeList = document.querySelector('.time-list');

const infoBtn = document.querySelector('.info');
const modalShadow = document.querySelector('.modal-shadow');
const closeModalBtn = document.querySelector('.close');
let countTime;
let minutes = 0;
let seconds = 0;
let timesArr = [];

const colorBtn = document.querySelector('.colors');
const changingColorPanel = document.querySelector('.colors-panel');
const colorOne = document.querySelector('.color-one');
const colorTwo = document.querySelector('.color-two');
const colorThree = document.querySelector('.color-three');
let root = document.documentElement;

const colorPanel = () => {
	if (!(changingColorPanel.style.display === 'block')) {
		changingColorPanel.style.display = 'block';
	} else {
		changingColorPanel.style.display = 'none';
	}
	changingColorPanel.classList.add('color-animation');
};

const handleStart = () => {
	clearInterval(countTime);
	countTime = setInterval(() => {
		if (seconds < 9) {
			seconds++;
			stopwatch.textContent = `${minutes}:0${seconds}`;
		} else if (seconds >= 9 && seconds < 59) {
			seconds++;
			stopwatch.textContent = `${minutes}:${seconds}`;
		} else {
			minutes++;
			seconds = 0;
			stopwatch.textContent = `${minutes}:00`;
		}
	}, 1000);
};

const handlestop = () => {
	time.innerHTML = `Ostatni czas: ${stopwatch.textContent}`;

	if (stopwatch.textContent !== `0:00`) {
		time.style.visibility = 'visible';
		timesArr.push(stopwatch.textContent);
	}
	if (timeList.hasChildNodes()) {
		showHistory();
	}
	clear();
};

const handlePause = () => {
	clearInterval(countTime);
};

const handleReset = () => {
	time.style.visibility = 'hidden';
	timesArr = [];
	timeList.textContent = '';
	clear();
};

const clear = () => {
	clearInterval(countTime);
	stopwatch.textContent = `0:00`;
	seconds = 0;
	minutes = 0;
};

const showHistory = () => {
	timeList.textContent = '';
	let num = 1;
	timesArr.forEach((time) => {
		const newTime = document.createElement('li');
		newTime.innerHTML = `Pomiar nr ${num}: <span>${time}</span>`;

		timeList.appendChild(newTime);
		num++;
	});
};

const checkArch = () => {
	if (!timeList.hasChildNodes()) {
		showHistory();
	} else {
		if (timeList.style.display === 'none') {
			timeList.style.display = 'block';
		} else {
			timeList.style.display = 'none';
		}
	}
};

const showModal = () => {
	if (!(modalShadow.style.display === 'block')) {
		modalShadow.style.display = 'block';
	} else {
		modalShadow.style.display = 'none';
	}
	modalShadow.classList.add('modal-animation');
};

startBtn.addEventListener('click', handleStart);
pauseBtn.addEventListener('click', handlePause);
stopBtn.addEventListener('click', handlestop);
resetBtn.addEventListener('click', handleReset);
historyBtn.addEventListener(`click`, checkArch);
infoBtn.addEventListener(`click`, showModal);
closeModalBtn.addEventListener(`click`, showModal);
window.addEventListener('click', (e) =>
	e.target === modalShadow ? showModal() : false
);
colorBtn.addEventListener('click', colorPanel);
colorOne.addEventListener('click', () => {
	root.style.setProperty('--first-color', `#f1680c`);
});
colorTwo.addEventListener('click', () => {
	root.style.setProperty('--first-color', `#99f10c`);
});
colorThree.addEventListener('click', () => {
	root.style.setProperty('--first-color', `#157ada`);
});
