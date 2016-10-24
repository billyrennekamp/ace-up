<template>
    <li class='list-group-item {{card.suit}}' @click="moveCard(card)" >
      {{card.face}} {{card.suit}}
    </li>
</template>

<script>
export default {

  name: 'Card',
  props: ['card'],
  data () {
    return {

    }
  },
  methods: {
    moveCard: function (card) {
      this.$parent.game.moveCard(card)
    }
  }
}
</script>

<style lang="css" scoped>
  .♥, .♦{
    color: red;
  }
  li:last-of-type{
    height:0px;
    padding-bottom:130%;
  }
</style>