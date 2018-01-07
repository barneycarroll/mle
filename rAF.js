export default () =>
  new Promise(done =>
    requestAnimationFrame(done)
  )