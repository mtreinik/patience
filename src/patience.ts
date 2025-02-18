const width = 300
const timeStep = 1000
let value = 0
const delta = 5

function initProgressBar(id: string) {
  function progressBarOnValueChange(mutationsList: MutationRecord[]) {
    for (const mutation of mutationsList) {
      if (
        mutation.type === 'attributes' &&
        mutation.attributeName === 'value'
      ) {
        console.log(`value = ${progressBar?.getAttribute('value')}`)
        drawProgressBar(id, value)
      }
    }
  }

  const observer = new MutationObserver(progressBarOnValueChange)
  const progressBar = document.getElementById(id) as HTMLDivElement
  observer.observe(progressBar, { attributes: true })
}

function updateNativeProgressBar(id: string) {
  const progress = document.getElementById(id) as HTMLProgressElement
  progress.value = value
  console.log(`value=${value}`)
}

function updateProgressBar(id: string) {
  const prevValue = value
  value += delta
  const change = value - prevValue
  console.log(`value=${value}, change=${change}`)
  const element = document.getElementById(id) as HTMLDivElement
  element.setAttribute('value', `${value}`)
}

function drawProgressBar(id: string, value: number) {
  const leftElement = document.querySelector(`#${id} .left`) as HTMLSpanElement
  const midElement = document.querySelector(`#${id} .mid`) as HTMLSpanElement
  const rightElement = document.querySelector(
    '#patience2 .right',
  ) as HTMLSpanElement

  const leftValue = Math.min(value, 5)
  const midValue = value - leftValue
  const rightValue = 100 - leftValue - midValue

  const leftWidth = (leftValue * width) / 100
  const midWidth = (midValue * width) / 100
  const rightWidth = (rightValue * width) / 100

  leftElement.style.width = `${leftWidth}px`
  midElement.style.width = `${midWidth}px`
  rightElement.style.width = `${rightWidth}px`
}

function updateProgress() {
  updateNativeProgressBar('patience1')
  updateProgressBar('patience2')
}

initProgressBar('patience2')
setInterval(updateProgress, timeStep)
