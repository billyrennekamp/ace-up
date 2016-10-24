export let Game = function () {
  var suits = ['♠', '♥', '♦', '♣']
  this.piles = this.deck = this.discard = {}

  this.init = function () {
    this.piles = [[], [], [], []]
    this.deck = []
    this.discard = []
    this.initDeck()
  }

  var getVal = function (i) {
    i++
    switch (i) {
      case (1):
        return 'A'
      case (11):
        return 'J'
      case (12):
        return 'Q'
      case (13):
        return 'K'
      default:
        return i
    }
  }
  this.initDeck = function () {
    for (var i = 0; i < 52; i++) {
      var card = {suit: suits[Math.floor(i / 13)], face: getVal(i % 13)}
      this.deck.push(card)
    }
    this.deck = shuffleArray(this.deck)
  }
  var shuffleArray = function (array) {
    for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1))
      var temp = array[i]
      array[i] = array[j]
      array[j] = temp
    }
    return array
  }

  this.setFour = function () {
    for (var i = 0; i < 4; i++) {
      this.piles[i].push(this.deck.pop())
    }
  }

  var faceToValue = function (value) {
    switch (value) {
      case ('A'):
        return 14
      case ('K'):
        return 13
      case ('Q'):
        return 12
      case ('J'):
        return 11
      default:
        return parseInt(value)
    }
  }

  this.clearTops = function (piles, discard) {
    if (typeof (piles) === 'undefined') {
      piles = this.piles
    }
    if (typeof (discard) === 'undefined') {
      discard = this.discard
    }
    var i = 0
    while (i < 4) {
      var currPile = piles[i]
      var currentTopCard = currPile[currPile.length - 1]
      for (var j = i + 1; j < 4; j++) {
        var focusPile = piles[j]
        var focusTopCard = typeof (focusPile[focusPile.length - 1]) !== 'undefined' && focusPile[focusPile.length - 1]
        if (!focusTopCard) { continue }
        if (!currentTopCard) { continue }
        if ((currentTopCard.suit === focusTopCard.suit)) {
          if (faceToValue(currentTopCard.face) > faceToValue(focusTopCard.face)) {
            var popped = piles[j].pop()
          } else {
            popped = piles[i].pop()
          }
          discard.push(popped)
          i = -1
          j = 0
          break
        }
      }
      i++
    }
    return {piles: piles, discard: discard}
  }

  this.mostDiscards = function () {
    var options = []
    for (var i = 0; i < 4; i++) {
      var pileCopy = JSON.parse(JSON.stringify(this.piles))
      if (pileCopy[i].length === 0) {
        continue
      }

      var movedCard = pileCopy[i][pileCopy[i].length - 1]
      pileCopy = this.moveCard(movedCard, pileCopy)
      var discard = []
      var results = this.clearTops(pileCopy, discard)

      var j = 0
      while (this.emptyPile(pileCopy)) {
        results = this.clearTops(pileCopy, discard)
        pileCopy = results.piles
        discard = results.discard
        j++
        if (j > 5) {
          break
        }
      }
      if (discard.length > 0) {
        options.push({card: movedCard, discard: discard})
      }
    }
    options.sort(function (a, b) {
      return a.discard.length < b.discard.length
    })
    var bestOption = options[0]

    return typeof (bestOption) !== 'undefined' && bestOption.card
  }

  this.largestStart = function () {
    var largestCard = false
    for (var i = 0; i < 4; i++) {
      var pileCopy = JSON.parse(JSON.stringify(this.piles))
      if (pileCopy[i].length <= 1) {
        continue
      }
      var movedCard = pileCopy[i][pileCopy[i].length - 1]
      if (!largestCard || faceToValue(movedCard.face) > faceToValue(largestCard.face)) {
        largestCard = movedCard
      }
    }
    return largestCard
  }

  this.decideMove = function () {
    var bestOption = false
    bestOption = this.mostDiscards()
    if (!bestOption) {
      bestOption = this.largestStart()
    }
    // console.log(bestOption)
    return bestOption
  }

  this.emptyPile = function (piles) {
    if (typeof (piles) === 'undefined') {
      piles = this.piles
    }
    var emptyListLength = piles.filter(function (val) { return val.length === 0 }).length
    var stacked = false
    for (var i = 0; i < 4; i++) {
      // stacked = stacked ? stacked : (piles[i].length > 1 ? true : false)
      stacked = stacked || (piles[i].length > 1)
    }
    // there's an empty pile
    // and there's another pile with more than one
    return emptyListLength > 0 && stacked
  }

  // var cardsMatch = function(a, b){
  //  return (a.face == b.face && a.suit == b.suit)
  // }

  this.clearCard = function (card) {

  }

  this.moveCard = function (card, piles) {
    if (typeof (piles) === 'undefined') {
      piles = this.piles
    }
    if (!this.emptyPile(piles)) {
      return false
    }
    var popped = false
    for (var i = 0; i < piles.length; i++) {
      var pile = piles[i]
      // console.log(card)

      var inspect = pile[pile.length - 1]
      if (typeof (inspect) !== 'undefined' && popped === false && this.emptyPile(piles) && (card.suit === inspect.suit && card.face === inspect.face)) {
        popped = piles[i].pop()
        i = -1
        continue
      }
      if (popped !== false && pile.length === 0) {
        piles[i].push(popped)
        break
      }
    }
    return piles
  }

  this.doSomething = function () {
    if (this.emptyPile()) {
      var move = this.decideMove()
      this.piles = this.moveCard(move)
    } else {
      this.setFour()
    }
  }

  this.won = function () {
    var singles = this.piles.filter(function (val) {
      return val.length === 1
    })
    // console.log(this.piles)
    return singles.length === 4
  }

  this.init()
  // this.setFour()
  // this.clearTops()
}
