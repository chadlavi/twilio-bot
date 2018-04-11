var chance = require("chance").Chance();
module.exports = {
  message: function(sender, body) {
    var reply = "";
    
    // reply with menu instruactions when incoming text is "menu"
    if(/^menu/i.test(body)) {
      var menu = require("./menu")
      reply = menu;
    } 
    
    // reply with a deep thought if incoming text is "deep thought"
    else if (/deep\ thought/i.test(body)){
      var thoughts = require("./thoughts");
      var thought = thoughts[Math.floor(Math.random()*thoughts.length)];
      reply = "🤔 "+thought;
    } 
    
    // reply with a dice roll if incoming text is dX where X is an integer
    else if (/d\d+/i.test(body)){
      var roll = require("./roll");
      reply = "🎲 "+roll(body);
    } 
    
    // reply with wedding info if incoming text is "wedding"
    else if(/wedding/i.test(body)||/lavipalooza/i.test(body)) {
      var wedding = require("./wedding");
      reply = wedding;
    }
    
    // reply with some origin info
    else if (/what\ is\ this/i.test(body) || /what\ are\ you/i.test(body) || /who\ is\ this/i.test(body) || /who\ are\ you/i.test(body)) {
      reply = "I'm a chatbot 🤖💬"; 
    }
    else if (/made\ this/i.test(body) || /created\ this/i.test(body) || /made\ you/i.test(body) || /created\ you/i.test(body)) {
      reply = "I was built by Chad Lavimoniere";
    }
    
    // reply with a tarot card when incoming text includes "tarot"
    else if (/tarot/i.test(body)) {
      var tarot = require("./tarot")
      var reading = tarot[Math.floor(Math.random()*tarot.length)];
      reply = "🃏 "+reading;
    }
    
    // reply with magic 8ball answer when incoming text ends with a question mark and starts with a verb that makes it likely to be a yes/no question
    else if (/\?/.test(body) && /^am|^are|^is|^will|^should|^would|^did|^can|^aren't|^isn't|^shouldn't|^won't|^do|^don't|^doesn't/i.test(body)) {
      var answers = require("./answers");
      var answer = answers[Math.floor(Math.random()*answers.length)];
      reply = "🔮 "+answer;
      var maybe = chance.d20();
      if(maybe == 20) {
        reply = reply+"!";
      }
    } 
    
    // default reply if none of the above
    else {
      var randomReplies = require("./randomReplies");
      var randomReply = randomReplies[Math.floor(Math.random()*randomReplies.length)];
      reply = randomReply;
      var tip = chance.d6();
      if(tip == 6) {
        reply = reply+" \n(say \"menu\" for more options)";
      }
    }
    
    // following line is for wedding text autoresponder use
    //var reply = "This is just an automated number. Text Chad at 860-208-0450 with questions."
      
    // following line is for roll-your-own message use
    // var reply ="";
    
    console.log(">> "+sender+" said: \""+body+"\"");
    console.log(">> I replied: \""+reply+"\"")
    return reply;
  }
}