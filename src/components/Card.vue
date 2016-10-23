<template>
    <li class='list-group-item' @click="moveCard(card)" >
      {{{card.face}}} {{card.suit}}
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
  li:last-of-type{
    height:0px;
    padding-bottom:130%;
  }
</style>