window.addEventListener('load', function () {
  const canvas = document.getElementById('canvas')
  const ctx = canvas.getContext('2d')

  const rect = canvas.getBoundingClientRect()
  canvas.width = rect.width
  canvas.height = rect.height

  let currentState = 'start'

  window.setState = function setState (state) {
    currentState = state
    render()
  }

  const images = {}
  let loadedImages = 0
  let totalImages = 0

  function addImage (src) {
    totalImages++
    const img = new window.Image()
    img.src = 'images/' + src + '.png'
    img.onload = function () {
      console.log('loaded')

      loadedImages++

      if (loadedImages === totalImages) {
        render()
      } else {
        renderLoadingScreen()
      }
    }
    images[src] = img
  }

  for (let i = 0; i < 3; i++) {
    addImage('bottom_' + i)
  }
  for (let i = 0; i < 4; i++) {
    addImage('middle_' + i)
  }
  for (let i = 0; i < 5; i++) {
    addImage('top_' + i)
  }
  addImage('start')

  console.log(images, totalImages)

  function renderLoadingScreen () {
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    const progress = loadedImages / totalImages
    console.log(progress)

    ctx.fillStyle = 'black'
    ctx.textBaseline = 'bottom'
    ctx.textAlign = 'left'
    ctx.font = '20px monospace'
    ctx.fillText((progress * 100).toFixed(2) + '%', 10, canvas.height - 10)
  }

  function render () {
    ctx.drawImage(images[currentState], 0, 0, canvas.width, canvas.height)
  }
})
