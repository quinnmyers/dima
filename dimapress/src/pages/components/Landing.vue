<template>
  <div class="landing">
    <div class="landing__container">
      <div class="landing__container__text" ref='text'>
        <h1 class="dima" ref="dima"><span class="underline" ref="firstletter">D</span><span class="after" ref="aftertext">ima</span></h1>
        <h1 class="duchet" ref="duchet"><span class="underline" ref="firstletter">D</span><span class="after" ref="aftertext">uchet</span></h1>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    loadText() {
      this.$refs.text.classList.add("text-loaded");
    },
    outroText() {
      this.$refs.text.classList.add("text-out");
    },
    loadFullNav() {
      this.$emit("loadnav");
    }
  },
  mounted() {
    this.loadText();
    setTimeout(() => {
      this.outroText();
      this.loadFullNav();
    }, 1800);

    setTimeout(() => {
      window.scroll({
        top: window.innerHeight,
        behavior: "smooth"
      });
    }, 3000);
  }
};
</script>

<style scoped lang="sass">
@import '../../base.sass'

.landing 
  display: flex 
  justify-content: flex-end
  height: 100vh 
  width: 100% 
  &__container 
    display: flex 
    justify-content: flex-end
    .text-out 
      transform: translateX(1000px) !important
    .text-loaded 
      transform: translateY(0)
    &__text
      display: flex 
      flex-direction: column 
      //background: pink
      transition: all 1.5s ease-in-out
      transform: translateY(100%)
      overflow: hidden
      font-size: 5rem
      .underline 
        text-decoration: underline 
        text-decoration-color: $accent
      h1 
        margin: 0 
        padding: 0
        font-family: $sans-serif
</style>