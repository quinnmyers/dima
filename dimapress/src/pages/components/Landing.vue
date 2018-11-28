<template>
<section v-if="isMounted" ref='landingsection'>
   <div class="landing" ref='landingpage'>
    <div class="landing__container">
      <div class="landing__container__text" ref='text'>
        <h1 class="dima" ref="dima"><span class="underline" ref="firstletter">D</span><span class="after" ref="aftertext">ima</span></h1>
        <h1 class="duchet" ref="duchet"><span class="underline" ref="firstletter">D</span><span class="after" ref="aftertext">uchet</span></h1>
      </div>
    </div>
  </div>
  <a href="#visualdevelopment" ref="scrollto" v-smooth-scroll="{ duration: 900}" aria-hidden="true"></a>
</section>
 
</template>

<script>
export default {
  data() {
    return {
      isMounted: false
    };
  },
  methods: {
    loadText() {
      this.$refs.text.classList.add("text-loaded");
    },
    outroText() {
      const el = this.$refs.text;
      el.classList.add("text-out");
      // setTimeout(() => {

      // }, 5000);
    },
    loadFullNav() {
      this.$emit("loadnav");
    },
    hideLanding() {
      this.showLanding = false;
      // setTimeout(() => {
      //   this.$refs.landingpage.style.height = "0px";
      // }, 3000);
    },
    reloadText() {
      const landingTop = this.$refs.landingsection.getBoundingClientRect().top;
      const el = this.$refs.text;
      if (landingTop === 0) {
        el.classList.remove("text-out");
      }
    }
  },
  mounted() {
    this.isMounted = true;
    this.$nextTick(this.loadText);
    setTimeout(() => {
      this.outroText();
      this.loadFullNav();
    }, 1800);

    setTimeout(() => {
      console.log(this.$refs.scrollto);

      this.$refs.scrollto.click();
      // window.scroll({
      //   top: window.innerHeight,
      //   behavior: "smooth"
      // });
      // this.hideLanding();
    }, 3000);
    window.addEventListener("scroll", this.reloadText);
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
      transform: translateX(1400px) !important
      @include phone-large 
        transform: translateX(600px) !important
    .text-loaded 
      transform: translateY(0)
    &__text
      display: flex 
      flex-direction: column 
      transition: all 1.5s ease-in-out
      transform: translateY(100%)
      //overflow: hidden
      font-size: 5rem
      @include edgesnap 
        font-size: 4rem
        margin-right: 50px
      @include tablet-portrait 
        font-size: 3.25rem
      @include phone-large 
        margin-top: 100px
        font-size: 2rem
      .underline 
        text-decoration: underline 
        text-decoration-color: $accent
      h1 
        margin: 0 
        padding: 0
        font-family: $sans-serif
</style>