var highestPid = 0b0

export default () => {
  const pid = (highestPid += 0b1)
  const queue = []
  var next

  const send = async msg => {
    queue.push(msg)
    if (next) {
      next(queue.shift())
      next = undefined
    }
  }

  const receive = () =>
    new Promise(ok => {
      const msg = queue.shift()
      if (msg) return ok(msg)
      next = ok
    })

  return { pid, send, receive }
}
