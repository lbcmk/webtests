setInterval(setClock, 1)

const hourHand = document.querySelector('[data-hour-hand]')
const minuteHand = document.querySelector('[data-minute-hand]')
const secondHand = document.querySelector('[data-second-hand]')
const millisecondHand = document.querySelector('[data-millisecond-hand]')

let millisecondHandRotation = 0.0


function setClock() {
  const currentDate = new Date()
  const secondsRatio = currentDate.getSeconds() / 60
  const minutesRatio = (secondsRatio + currentDate.getMinutes()) / 60
  const hoursRatio = (minutesRatio + currentDate.getHours()) / 12
	setRotation(millisecondHand, millisecondHandRotation)
  setRotation(secondHand, secondsRatio)
  setRotation(minuteHand, minutesRatio)
  setRotation(hourHand, hoursRatio)
	millisecondHandRotation += 3.6

	millisecondHandRotation = millisecondHandRotation%360
}

function setMs() {
	const millisecondsRatio = currentDate.getMilliseconds() / 100
	setRotation(millisecondHand, millisecondsRatio)
}

function setRotation(element, rotationRatio) {
  element.style.setProperty('--rotation', rotationRatio * 360)
}

setClock()