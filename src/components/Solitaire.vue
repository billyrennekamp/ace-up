<template>
  <div class='container'>
    <div class="row">
      <button class='col-md-4 col-xs-4 btn btn-danger' @click="init">Reset</button>
      <button class='col-md-4 col-xs-4 btn btn-primary' @click="setFour" :disabled="disabled" >
      {{gameOver ? 'Good Game!' :  !clearable ? 'Not Cleared Yet' : disabled ? 'Fill the Empty' : 'Draw Four Cards'}}
      </button>
      <button class='col-md-4 col-xs-4 btn btn-success' @click="clearTops" :disabled="clearable" >Clear Tops</button>
    </div>
    <div class="row">
      <div class='col-md-2 col-xs-2 deck bg-success'>
        <h1>Deck</h1>
        <ul class='list-group '>
          <card v-for="card in game.deck" :card.sync="card"></card>
        </ul>
      </div>
      <div class='col-md-8 col-xs-8  bg-info'>
      <h1> Game</h1>
        <div class='col-md-3 col-xs-3 pile bg-default' v-for="pile in game.piles">
            <ul class='list-group'>
              <card v-for="card in pile" :card.sync="card" ></card>
            </ul>
        </div>  
      </div>
      <div class='col-md-2 col-xs-2 discard bg-danger'>
        <h1>Trash</h1>
        <ul class='list-group'>
          <card v-for="card in game.discard" :card.sync="card"></card>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import {Game} from '../game.js'
import Card from './Card'

export default {
  components: {
    Card
  },
  name: 'Solitaire',
  ready () {
    this.game = new Game()
    this.game.init()
  },
  data () {
    return {
      game: {}
    }
  },
  methods: {
    setFour: function () {
      this.game.setFour()
    },
    clearTops: function () {
      this.game.clearTops()
    },
    init: function () {
      this.game.init()
    }
  },
  computed: {
    emptyPile: function () {
      return this.game.emptyPile()
    },
    gameOver: function () {
      return this.game.deck.length === 0 && (!(this.game.deck.length === 0 && this.game.emptyPile()))
    },
    disabled: function () {
      return this.game.emptyPile() || this.game.deck.length === 0 || !this.clearable
    },
    clearable: function () {
      var pileCopy = JSON.parse(JSON.stringify(this.game.piles))
      var results = this.game.clearTops(pileCopy, [])
      return !results.discard.length > 0
    }
  }
}
</script>

<style lang="css" scoped>
.row{
    overflow: hidden; 
}

[class*="col-"]{
    margin-bottom: -99999px;
    padding-bottom: 99999px;
}
li{
  text-align:left;
}

.deck li{
  color: transparent;
}
.deck li, .discard li{
  height:0px;
  padding:3px 0px;
}
</style>