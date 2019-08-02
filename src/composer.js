import { answers } from './answers'
import { chance } from './chance'
import { emoji } from './emoji'
import { getRandom } from './helpers'
import { menu } from './menu'
import { okay } from './okay'
import { random } from './randomReplies'
import { roll } from './roll'
import { tarot } from './tarot'
import { thoughts } from './thoughts'
import { wedding } from './wedding'

const admins = process.env.privateNumbers.split(' ')

export const compose = (sender, body) => {
  
  const admin = Boolean(admins.includes(sender))

  if (/^emoji/i.test(body)) {
    return getRandom(emoji)
  }

  if(/^menu|\bhelp/i.test(body)) {
    return menu
  } 
  
  else if (/deep\ thought/i.test(body)){
    const thought = getRandom(thoughts)
    return `🤔 ${thought}`
  } 
  
  else if (/d\d+/i.test(body)){
    return `🎲 ${roll(body)}`
  } 
  
  else if(/wedding|lavipalooza/i.test(body)) {
    return admin ? wedding : getRandom(random)
  }
  
  else if (/what\ is\ this/i.test(body) || /what\ are\ you/i.test(body) || /who\ is\ this/i.test(body) || /who\ are\ you/i.test(body)) {
    reply = 'I\'m a chatbot 🤖💬' 
  }
  else if (/made\ this/i.test(body) || /created\ this/i.test(body) || /made\ you/i.test(body) || /created\ you/i.test(body)) {
    return 'I was built by Chad Lavimoniere'
  }
  
  else if (/tarot/i.test(body)) {
    const reading = getRandom(tarot)
    return `🃏 ${reading}`
  }
  
  else if (/\?/.test(body) && /^am|^are|^is|^will|^should|^would|^did|^can|^aren't|^isn't|^shouldn't|^won't|^do|^don't|^doesn't/i.test(body)) {
    const answer = getRandom(answers)
    const crit = Boolean(chance.d20() === 20)
    return `🔮 ${answer}${crit ? '!' : ''}`
  } 

  else if (/\bok(ay)?\b/i.test(body) || okay.includes(body.toLowerCase())) {
    return getRandom(okay)
  }
  
  else {
    const randomReply = getRandom(random)
    var tip = Boolean(chance.d6()===6 && !admin)
    return `${randomReply}${tip ? ' \n(say "menu" for more options)' : ''}`
  }
}