<template>
  <section class="contact" id="contact">
      <h2 class="section--header">Contact</h2>
      <div class="contact__container">
        <div class="contact__container__left">
          <div class="contact__container__left__brand">{{ brandName }}</div>
          <div class="contact__container__left__pronunciation">{{ pronunciation }}</div>
          <div class="contact__container__left__blurb"></div>
          <div class="contact__container__left__subcategory">
            <div class="contact__container__left__subcategory--subheader">
               <h3>Email</h3>
            </div>
            <div class="contact__container__left__subcategory--content">
                <a :href="`mailto:${email}?subject=Email from Website`">
                  {{ email }}
                </a>
            </div>
           </div>
          <div class="contact__container__left__subcategory">
            <div class="contact__container__left__subcategory--subheader">
               <h3>Blog</h3>
            </div>
            <div class="contact__container__left__subcategory--content">
                <a :href="`${blog}`" target="_blank">
                  {{ blog }}
                </a>
            </div>
           </div>
           <div class="contact__container__left__subcategory">
            <div class="contact__container__left__subcategory--subheader">
               <h3>Social</h3>
            </div>
            <div class="contact__container__left__subcategory--content">
                <a v-for="(social, index) in socialLinks"
                   :key="index" 
                   :href="social.url">
                  <img :src="social.image.src" :alt="social.image.alt" target="_blank">
                </a>
            </div>
           </div>
        </div>
        <div class="contact__container__right">
          <form :action="`https://formspree.io/${email}`" method="POST">
            <label for="name">Your Name</label>
            <input class="input" type="text" name="name">
            <label for="_replyto">Your Email</label>
            <input class="input" type="email" name="_replyto">
            <label for="message">Message</label>
            <textarea name="message" id="" cols="30" rows="5"></textarea>
            <input class="button" type="submit" value="Send">
          </form>
        </div>
      </div>
  </section>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      brandName: "Dima Duchet",
      pronunciation: "(deema ; du-shay)",
      email: "dimaduchet@gmail.com",
      blog: "blogspot.com/dimaduchet",
      socialLinks: [
        {
          name: "Behance",
          url: "https://www.behance.net/dimaduchet",
          image: {
            src: require("../../assets/behance-icon.svg"),
            alt: "Link to Behance artist portfolio page"
          }
        },
        {
          name: "LinkedIn",
          url: "https://www.linkedin.com/in/dima-duchet/",
          image: {
            src: require("../../assets/linkedin-icon.svg"),
            alt: "Link to LinkedIn profile"
          }
        },
        {
          name: "Instagram",
          url: "https://www.instagram.com/dimaduchet/",
          image: {
            src: require("../../assets/instagram-icon.svg"),
            alt: "Link to Instagram profile"
          }
        }
      ]
    };
  },
  mounted() {
    axios
      .get("/pages/118")
      .then(res => {
        console.log(res);
        this.email = res.data.acf.email;
        this.blog = res.data.acf.blog_link;
        this.socialLinks[0].url = be_link;
        this.socialLinks[1].url = linkedin;
        this.socialLinks[2].url = insta;
      })
      .catch(err => console.log(err));
  }
};
</script>

<style scoped lang="sass">
@import '../../base.sass'

.contact 
  &__container 
    display: flex
    width: 80%
    @include edgesnap 
      width: 100%
      // padding: 0px 15px
      padding-right: 15px
    @include navsnap 
      padding-right: 0px 
      padding: 0px 10px
    @include phone-max 
      flex-direction: column
    &__left 
      @include tablet-portrait 
        font-size: 0.9rem
      @include phone-max 
        width: 100%
      &__brand, &__pronunciation
        font-family: $sans-serif 
      &__brand
        margin-top: 18px
        font-size: 1.55rem 
        font-weight: bold
      &__pronunciation 
        font-size: 1.1rem
        color: grey
      &__blurb 
      &__subcategory
        margin-top: 18px
        &--subheader 
          font-family: $sans-serif
          font-size: 1.4rem
          margin-top: 25px
          @include phone-large 
            margin-top: 15px 
          h3
            font-size: 1.5rem
            font-weight: 300
            @include tablet-portrait 
              font-size: 1.35rem
        &--content, a, a:visited
          text-decoration: none
          color: black
          font-family: $sans-serif
          img 
            height: 30px
            margin-right: 7px
    &__right 
      margin-top: 18px
      width: 100%
      //background: red 
      margin-left: 40px
      @include phone-max 
        margin-left: 0px
      form 
        display: flex
        width: 100%
        flex-direction: column 
        height: 100%
        .input 
          display: flex
          width: 100%
          border: 1px solid black 
          font-family: $sans-serif 
          @include phone-large 
            height: 30px
        .button 
          width: 25% 
          //background: orange 
          align-self: flex-end 
          margin-top: 10px 
          height: 28px 
          font-family: $sans-serif 
          border: 1px solid black
          &:hover 
            color: $accent
          @include tablet-portrait 
            font-size: 0.9rem
        label 
          font-family: $sans-serif
          font-size: 1.1rem
          margin-top: 10px
          &:nth-child(1)
            margin-top: 5px
          @include tablet-portrait 
            font-size: 1rem
        textarea 
          resize: none 
          font-family: $sans-serif
          border: 1px solid black
          flex: 1



</style>