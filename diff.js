function myers(stra, strb) {
  let n = stra.length
  let m = strb.length

  let v = {
    '1': 0
  }
  let vs = {
    '0': { '1': 0 }
  }
  let d

  loop:
  for (d = 0; d <= n + m; d++) {
    let tmp = {}

    for (let k = -d; k <= d; k += 2) {
      let down = k == -d || k != d && v[k + 1] > v[k - 1]
      let kPrev = down ? k + 1 : k - 1

      let xStart = v[kPrev]
      let yStart = xStart - kPrev

      let xMid = down ? xStart : xStart + 1
      let yMid = xMid - k

      let xEnd = xMid
      let yEnd = yMid

      while(xEnd < n && yEnd < m && stra[xEnd] === strb[yEnd]) {
        xEnd++
        yEnd++
      }
      
      v[k] = xEnd
      tmp[k] = xEnd

      if (xEnd == n && yEnd == m) {
        vs[d] = tmp
        let snakes = solution(vs, n, m, d)
        printRes(snakes, stra, strb)

        break loop
      }
    }

    vs[d] = tmp
  }
}

function solution(vs, n, m, d) {
  let snakes = []
  let p = { x: n, y: m }
  
  for (; d > 0; d--) {
    let v = vs[d]
    let vPrev = vs[d-1]
    let k = p.x - p.y

    let xEnd = v[k]
    let yEnd = xEnd - k
    
    let down = k == -d || k != d && vPrev[k + 1] > vPrev[k - 1]
    let kPrev = down ? k + 1 : k - 1
    
    let xStart = vPrev[kPrev]
    let yStart = xStart - kPrev
    
    let xMid = down ? xStart : xStart + 1
    let yMid = xMid - k
    
    snakes.unshift([xStart, xMid, xEnd])

    p.x = xStart
    p.y = yStart
  }

  return snakes
}

function printRes(snakes, stra, strb) {
  let grayColor = 'color: gray'
  let redColor = 'color: red'
  let greenColor = 'color: green'
  let consoleStr = ''
  let args = []
  let yOffset = 0
  
  snakes.forEach((snake, index) => {
    let s = snake[0]
    let m = snake[1]
    let e = snake[2]
    let large = s
    
    if (index === 0 && s !== 0) {
      for (let j = 0; j < s; j++) {
        consoleStr += `%c${stra[j]}`
        args.push(grayColor)
        yOffset++
      }
    }
    
    // 删除
    if (m - s == 1) {
      consoleStr += `%c${stra[s]}`
      args.push(redColor)
      large = m
    // 添加
    } else {
      consoleStr += `%c${strb[yOffset]}`
      args.push(greenColor)
      yOffset++
    }
    
    // 不变
    for (let i = 0; i < e - large; i++) {
      consoleStr += `%c${stra[large+i]}`
      args.push(grayColor)
      yOffset++
    }
  })

  console.log(consoleStr, ...args)
}

let s1 = 'AB'
let s2 = 'CB'
myers(s1, s2)

