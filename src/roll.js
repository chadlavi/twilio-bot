import { chance } from './chance'

export const roll = (body) => {
  let roll = 0, reply = 0
  if (body.match(/\d+d/i)) {
    const count = Number(body.match(/\d+d/).toString().split('d')[0])
    roll = Number(body.match(/d\d+/i).toString().substring(1))
    for (var i=0; i<count; i++) {
      reply = reply + chance.integer({min: 1, max: roll})
    }
  } else {
    roll = Number(body.match(/\d+/))
    reply = chance.integer({min: 1, max: roll})
  }
  
  if (body.match(/[\+\-]\d+/)) {
    const mod = Number(body.match(/[\+\-]\d+/).toString().substring(1))
    if (body.match(/[\+\-]\d+/).toString().substring(0,1) == '+') {
      reply = reply + mod
    } else {
      reply = reply - mod
    }
  }
  
  if (reply == roll && roll != 2 && count == 0) {
    return `${reply}!`
  } else if (reply == 1 && roll > 2) {
    return `${reply} 😵`
  } else {
    return reply
  }
}