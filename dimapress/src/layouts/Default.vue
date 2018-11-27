<template>
<div v-if='isMounted' ref='wrapper'>
  <app-head></app-head>
   <div class="content">
    <div class="layout">
        <div class="line" ref="navline"></div>
        <header class="layout__header" ref="header">
            <!-- <g-link :to="{ name: 'home' }">Gridsome</g-link> -->
          <nav class="layout__header__nav" ref='mainnav'>
            <a href="#visualdevelopment" v-smooth-scroll="{ duration: 1500}">
              <div class="layout__header__nav__brand" ref="navbrand">
                <h2 class="dima"><span class="underline">D</span>ima</h2>
                <h2 class="duchet"><span class="underline">D</span>uchet</h2>
              </div>
            </a>
            <ul class="layout__header__nav__desktopnav">
              <li class="layout__header__nav__desktopnav__navitem"
                  v-for='(n, index) in navItems'
                  :key='index'
                  ref="navitem"
                  @click="[selectNavItem(index), closeMobileNav()]">
                  <a :href="n.url" 
                      v-smooth-scroll="{ duration: 1500}"><span class='navitem-text'>{{ n.name }}</span></a>
                  <div :class="`expansion-div-${index} expansion-div`" :ref='`expansiondiv`'></div>
              </li>
            </ul>
            <ul class="layout__header__nav__subnav">
              <li class="layout__header__nav__subnav__subitem"
                  v-for="(s,index) in subNavItems"
                  :key="index"
                  ref="navitem"
                  @click="[selectSubNavItem(index), closeMobileNav()]">
                   <a :href="s.url" v-smooth-scroll="{ duration: 1500}">
                     <span class='navitem-text'>{{ s.name }}</span>
                    </a>
                  <div :class="`expansion-div ${index}`" :ref='`expansiondiv`'></div>
              </li>
            </ul>
            <!-- <g-link class="nav__link" :to="{ name: 'home' }">Home</g-link>
            <g-link class="nav__link" :to="{ name: 'about' }">About</g-link> -->
          </nav>
        </header>
          <button class='mobilenavbutton' @click="expandMobileNav">
            <span class="line1"></span>
            <span class="line2"></span>
            <span class="line3"></span>
          </button>
        <div class="pages">
          <slot/>
        </div>
      </div>
  </div>
</div>
 
</template>

<script>
import Head from "./Base/Head.vue";

export default {
  props: ["layoutSectionArray", "loadNav"],
  components: {
    appHead: Head
  },
  data() {
    return {
      isMounted: false,
      isOnPhone: false,
      lastSectionTargeted: "",
      windowHeight: 0,
      percentArray: [],
      positionArray: [0],
      startEndArray: [],
      totalSectionHeight: 0,
      navItems: [
        {
          name: "Visual Development",
          url: "#visualdevelopment",
          alt: ""
        },
        {
          name: "Illustrations",
          url: "#illustration",
          alt: ""
        },
        {
          name: "Sketches",
          url: "#sketches",
          alt: ""
        },
        {
          name: "Social & Mobile",
          url: "#socialmobile",
          alt: ""
        },
        {
          name: "Marketing Posters",
          url: "#marketingposters",
          alt: ""
        }
      ],
      subNavItems: [
        {
          name: "about",
          url: "#about",
          alt: ""
        },
        {
          name: "cv",
          url: "#cv",
          alt: ""
        },
        {
          name: "contact",
          url: "#contact",
          alt: ""
        },
        {
          name: "top",
          url: "#visualdevelopment",
          alt: ""
        }
      ]
    };
  },
  methods: {
    loadFullNav() {},
    buildNavUrl(str) {
      const urlPath = `#${str.replace(/\s/g, "").toLowerCase()}`;
      return urlPath;
    },
    measureWindow() {
      this.windowHeight = document.body.clientHeight;
    },
    calculatePercents() {
      let testArray = this.layoutSectionArray.map(percent => percent.height);
      this.percentArray = testArray.map(
        percent =>
          (100 * Math.round((10000 * percent) / this.windowHeight)) / 10000
      );
      this.sectionStartEnd(this.percentArray);
    },
    sectionStartEnd(array) {
      let index = 0;
      let totalElementHeights = 0;
      for (var i = 0; i < array.length; i++) {
        let sectionEndPoint = totalElementHeights + array[i];
        this.startEndArray.push({
          id: i,
          start: totalElementHeights,
          end: sectionEndPoint
        });
        totalElementHeights = sectionEndPoint;
        sectionEndPoint += totalElementHeights;
      }
    },
    determineScrollLocation() {
      const totalHeight = this.totalSectionHeight;
      let scrolledDistance =
        -1 * this.$refs.wrapper.getBoundingClientRect().top;
      let viewportHeight = window.innerHeight;
      let scrollableDistance = totalHeight;
      let percentScrolled = 100 * (scrolledDistance / scrollableDistance);
      this.sectionLocation(percentScrolled);
    },
    sectionLocation(p) {
      if (p >= this.startEndArray[0].start && p <= this.startEndArray[0].end) {
        let targetExpansionDiv = this.$refs.expansiondiv[0];
        // let currentSectionPercent = this.percentArray[0];
        // let differenceOfPercent = 100 / currentSectionPercent;
        // let adjustedScrollPosition = p * differenceOfPercent;
        // targetExpansionDiv.style.width = `${adjustedScrollPosition}%`;
        targetExpansionDiv.style.width = `100%`;
      } else if (
        p >= this.startEndArray[1].start &&
        p <= this.startEndArray[1].end
      ) {
        let targetExpansionDiv = this.$refs.expansiondiv[1];
        let currentSectionPercent = this.percentArray[1];
        // let startingPoint = this.startEndArray[1].start;
        // let differenceOfPercent = 100 / currentSectionPercent;
        // let adjustedScrollPosition =
        //   p * differenceOfPercent - startingPoint * differenceOfPercent;
        // targetExpansionDiv.style.width = `${adjustedScrollPosition}%`;
        targetExpansionDiv.style.width = `100%`;
      } else if (
        p >= this.startEndArray[2].start &&
        p <= this.startEndArray[2].end
      ) {
        let targetExpansionDiv = this.$refs.expansiondiv[2];
        let currentSectionPercent = this.percentArray[2];
        // let startingPoint = this.startEndArray[2].start;
        // let differenceOfPercent = 100 / currentSectionPercent;
        // let adjustedScrollPosition =
        //   p * differenceOfPercent - startingPoint * differenceOfPercent;
        // targetExpansionDiv.style.width = `${adjustedScrollPosition}%`;
        targetExpansionDiv.style.width = `100%`;
      } else if (
        p >= this.startEndArray[3].start &&
        p <= this.startEndArray[3].end
      ) {
        let targetExpansionDiv = this.$refs.expansiondiv[3];
        // let currentSectionPercent = this.percentArray[3];
        // let startingPoint = this.startEndArray[3].start;
        // let differenceOfPercent = 100 / currentSectionPercent;
        // let adjustedScrollPosition =
        //   p * differenceOfPercent - startingPoint * differenceOfPercent;
        // targetExpansionDiv.style.width = `${adjustedScrollPosition}%`;
        targetExpansionDiv.style.width = `100%`;
      } else if (
        p >= this.startEndArray[4].start &&
        p <= this.startEndArray[4].end
      ) {
        let targetExpansionDiv = this.$refs.expansiondiv[4];
        // let currentSectionPercent = this.percentArray[4];
        // let startingPoint = this.startEndArray[4].start;
        // let differenceOfPercent = 100 / currentSectionPercent;
        // let adjustedScrollPosition =
        //   p * differenceOfPercent - startingPoint * differenceOfPercent;
        // targetExpansionDiv.style.width = `${adjustedScrollPosition}%`;
        targetExpansionDiv.style.width = `100%`;
      }
    },
    throttle(fn, wait) {
      let time = Date.now();
      return function() {
        if (time + wait - Date.now() < 0) {
          fn();
          time = Date.now();
        }
      };
    },
    expandMobileNav() {
      const el = this.$refs.header;
      el.classList.toggle("header-expanded");
      if (el.classList.contains("header-expanded")) {
        document.body.style.height = "100vh";
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.height = "auto";
        document.body.style.overflow = "auto";
      }
    },
    closeMobileNav() {
      const el = this.$refs.header;
      if (el.classList.contains("header-expanded")) {
        el.classList.remove("header-expanded");
      } else {
        return;
      }
    },
    loadLine() {
      this.$refs.navline.classList.add("line-loaded");
    },
    loadHeader() {
      if (window.matchMedia("(max-width: 680px)").matches) {
      } else {
        this.$refs.header.classList.add("header-loaded");
      }
    },
    loadFullNav() {
      setTimeout(() => {
        this.$refs.mainnav.classList.add("mainnav-full");
        this.$refs.navbrand.classList.add("navbrand-full");
      }, 250);
    },
    selectNavItem(i) {
      const limit = this.$refs.expansiondiv.length;
      for (let x = 0; x < limit; x++) {
        const expansion = this.$refs.expansiondiv[x];
        expansion.style.width = "0%";
      }
      const el = (this.$refs.expansiondiv[i].style.width = "100%");
    },
    selectSubNavItem(i) {
      const numberOfNav = this.navItems.length;
      const index = i + numberOfNav;
      const limit = this.$refs.expansiondiv.length;
      for (let x = 0; x < limit; x++) {
        const expansion = this.$refs.expansiondiv[x];
        expansion.style.width = "0%";
      }
      const el = (this.$refs.expansiondiv[index].style.width = "100%");
    }
  },
  watch: {
    layoutSectionArray: function() {
      this.totalSectionHeight = this.layoutSectionArray
        .map(element => element.height)
        .reduce((a, b) => a + b, 0);
      this.calculatePercents();
    },
    loadNav: function() {
      this.loadFullNav();
    }
  },
  mounted() {
    this.isMounted = true;
    this.$nextTick(this.measureWindow);
    // this.$nextTick(
    //   window.addEventListener("scroll", this.determineScrollLocation)
    //   //this.throttle(this.determineScrollLocation, 25)
    // );
    this.$nextTick(this.loadLine);
    setTimeout(() => {
      this.$nextTick(this.loadHeader);
    }, 1500);
  }
};
</script>

<style scoped lang="sass">
@import '../base.sass'

html
  body
    margin: 0 !important
    display: flex 
    justify-content: center
    .content
      margin: 0px auto
      display: flex 
      flex-direction: column
      width: 1200px
      @include edgesnap 
        width: 100%

.line-loaded
  height: 100vh !important

.line 
  display: flex
  background: black
  width: 5px 
  height: 0px
  position: sticky
  top: 0
  transition: all 1.5s ease-in-out
  @include navsnap 
    display: none

.header-expanded 
  // display: flex !important
  transform: rotateY(0deg) !important
  top: 0 !important
  margin-left: 0px !important
  position: fixed !important
.layout
  display: flex
  height: 100%
  width: 100%
  .header-loaded 
    transform: translateX(0) !important
  &__header 
    display: block
    flex-direction: column
    background: white
    position: sticky
    top: 0
    width: 225px 
    height: 100vh
    transition: all 1s ease
    transform: rotateY(90deg)
    transform-origin: top left
    oveflow-x: hidden
    @include tablet-portrait 
      width: 180px
    @include navsnap 
      transform: rotateY(90deg)
      z-index: 999
      position: fixed
      margin: auto
      top: 0
    .mainnav-full 
      justify-content: space-between
    &__nav 
      //main container for nav
      display: flex 
      justify-content: space-between
      width: 100% 
      flex-direction: column
      height: 100%
      transition: all .3s ease
      //padding and margins for both lists of navitems
      a, a:visited
        color: black
        text-decoration: none 
        cursor: pointer
      .navbrand-full 
        // opacity: 1
      &__brand
        margin-left: 20px
        font-size: 2rem
        margin-top: 15px
        .underline 
          text-decoration: underline 
          text-decoration-color: $accent
      &__desktopnav, &__subnav
        list-style: none 
        .navitem-text 
          margin-left: 20px
        &__navitem, &__subitem
          margin: 12px 0px
        .expansion-div
          background: $accent
          height: 2px
          width: 0%
          transition: all 0.2s ease 
      &__desktopnav
        display: flex 
        flex-direction: column
        .navitem-text 
          margin-left: 20px
        &__navitem, a, &__:visited, .navitem-text
          display: flex 
          flex-direction: column
          align-self: flex-start
          font-family: $sans-serif
          text-decoration: none
          font-size: 1.1rem
          color: black
          &:nth-child(1)
            color: black
          &:nth-last-child(1)
            color: black
          @include tablet-portrait 
            font-size: 11pt
          @include phone
            font-size: 0.85rem
          @include phone-small 
            font-size: 0.8rem
      &__subnav
        display: flex 
        flex-direction: column 
        font-family: $sans-serif
        font-size: 0.9rem 
        color: $grey
        margin-bottom: 15px
        &__subitem, a, &__subitem:visited
          text-decoration: none
          display: flex 
          flex-direction: column 
          align-self: flex-start
          color: black
          &:nth-child(1)
            color: black
          &:nth-last-child(1)
            color: black
          @include tablet-portrait
            font-size: 0.85rem
          @include phone 
            font-size: 0.775rem
          @include phone-small 
            font-size: 0.725rem
  .mobile__nav__expander
    display: flex 
    flex-direction: column
    height: 100%
    width: 10px 
    background: $accent
  .pages
    display: flex 
    flex-direction: column 
    flex: 1
    @include navsnap 
      width: 100%
  .mobilenavbutton
    display: none
    flex-direction: column 
    justify-content: center
    align-items: flex-end 
    margin-right: 10px
    background: white
    height: 45px 
    width: 90px 
    position: fixed
    top: 0 
    right: 0
    z-index: 999
    @include navsnap 
      display: flex
    .line1, .line2, .line3
      display: flex
      background: black
      height: 1px 
      width: 30px
    .line1 
      margin-top: 3px
    .line2 
      margin: 6px 0px
  
</style>
