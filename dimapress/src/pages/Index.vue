<template>
  <Layout :layoutSectionArray="sectionArray" :loadNav="loadNav" v-if='isMounted'>
    <app-landing @loadnav='loadFullNav'></app-landing>
    <section v-for='(section,index) in sections' 
            :key="index"
            :class="createSectionClass(section.name)"
            :id="createSectionClass(section.name)"
            ref="section"
            :data-key="index"
            >
            <h2 class="section--header"
                ref='sectionheader'>{{ section.name }}</h2>
      <div class="image__container" 
           ref='imagecontainer'>
        <div v-for="(image, index) in section.image" :key="index">
              {{ index }}
            <img :src="image.url" :alt="image.alt">
              <hr>
            </div>
      </div>
            
    </section>
    <section class="about">
      <h2 class="section--header">About</h2>
      <p class="about--text content--section">Eu ullamco fugiat veniam anim id nostrud nostrud do eu aliquip. Tempor deserunt ex nisi dolore labore exercitation id id sit culpa cupidatat. Magna aliquip elit elit ea mollit amet voluptate. Adipisicing est in commodo consectetur. Tempor Lorem incididunt dolore commodo consequat. Eu ullamco fugiat veniam anim id nostrud nostrud do eu aliquip. Tempor deserunt ex nisi dolore labore exercitation id id sit culpa cupidatat. Magna aliquip elit elit ea mollit amet voluptate. Adipisicing est in commodo consectetur. Tempor Lorem incididunt dolore commodo consequat. Eu ullamco fugiat veniam anim id nostrud nostrud do eu aliquip. Tempor deserunt ex nisi dolore labore exercitation id id sit culpa cupidatat. Magna aliquip elit elit ea mollit amet voluptate. Adipisicing est in commodo consectetur. Tempor Lorem incididunt dolore commodo consequat. Eu ullamco fugiat veniam anim id nostrud nostrud do eu aliquip. Tempor deserunt ex nisi dolore labore exercitation id id sit culpa cupidatat. Magna aliquip elit elit ea mollit amet voluptate. Adipisicing est in commodo consectetur. Tempor Lorem incididunt dolore commodo consequat. Eu ullamco fugiat veniam anim id nostrud nostrud do eu aliquip. Tempor deserunt ex nisi dolore labore exercitation id id sit culpa cupidatat. Magna aliquip elit elit ea mollit amet voluptate. Adipisicing est in commodo consectetur. Tempor Lorem incididunt dolore commodo consequat.</p>
    </section>
    <app-curriculum-vitae></app-curriculum-vitae>
    <app-contact></app-contact>
  </Layout>
  
</template>

<page-query>query Home{
  allWordPressVisualDevelopment{
    		name:edges{node{path}}
    edges{
      node{
        featuredMedia{
          url
        }
      }
    }
  }
  allWordPressIllustration{
    		name:edges{node{path}}
       edges{
      node{
        featuredMedia{
          url
        }
      }
    }
  }
  allWordPressSketches{
    		name:edges{node{path}}

    edges{
  	    
    node{

      featuredMedia{
        url
      }
    }
  }
  }
   allWordPressSocialMobile{
		name:edges{node{path}} 
       edges{
      node{
        path
        featuredMedia{
          url
        }
      }
    }
  
  }
  allWordPressMarketingPosters{
    		name:edges{node{path}}
       edges{
      node{
        featuredMedia{
          url
        }
      }
    }
  
  }
}


</page-query>
<script>
import { Pager } from "gridsome";
import Contact from "./components/Contact.vue";
import CurriculumVitae from "./components/CurriculumVitae.vue";
import Landing from "./components/Landing.vue";

export default {
  components: {
    Pager,
    appContact: Contact,
    appCurriculumVitae: CurriculumVitae,
    appLanding: Landing
  },
  data() {
    return {
      isMounted: false,
      loadNav: false,
      sectionHeights: [],
      sectionArray: [],
      sections: []
    };
  },
  methods: {
    createSectionClass(str) {
      const className = str.replace(/\s/g, "").toLowerCase();
      return className;
    },
    measureSectionHeader() {
      const sectionHeaderHeight = this.$refs.sectionheader[0].scrollHeight;
      this.setImageSectionMargin(sectionHeaderHeight);
    },
    setImageSectionMargin(number) {
      this.$refs.imagecontainer.forEach(el => {
        el.style.paddingTop = `${number}px`;
      });
    },
    measureAllElements() {
      let counter = 0;
      this.$refs.section.forEach(e => {
        const style = e.currentStyle || window.getComputedStyle(e);
        const eHeight = e.scrollHeight;
        console.log(eHeight);
        const eMarginBottom = style.marginBottom;
        const eMarginTop = style.marginTop;
        const eTotalHeight = this.getTotal(eHeight, eMarginBottom, eMarginTop);
        console.log(eTotalHeight);
        this.sectionArray.push({
          id: counter,
          height: eTotalHeight
        });
        counter++;
      });
    },
    getTotal(h, b, t) {
      return h + parseInt(b, 10) + parseInt(t, 10);
    },
    pushPosts(page) {
      const mainobj = [];
      // console.log(page);

      Object.entries(page).forEach(set => {
        const tempObj = {
          name: set[0],
          image: []
        };
        set[1].edges.forEach(post => {
          const imageObj = {
            url: post.node.featuredMedia.url.src,
            alt: "a sick photo"
          };
          tempObj.image.push(imageObj);
          console.log("imageobj", imageObj);
        });
        console.log("tempobj", tempObj);
        console.log("obj", mainobj);

        mainobj.push(tempObj);
        console.log(set);
      });
      console.log("obj", mainobj);

      this.sections = mainobj;
      console.log("section", this.sections);
    },
    loadFullNav() {
      this.loadNav = true;
    }
  },
  mounted() {
    this.pushPosts(this.$page);
    console.log(this.$page);
    this.isMounted = true;
    this.$nextTick(this.measureSectionHeader);
    this.$nextTick(this.measureAllElements);
  }
};
</script>

<style scoped lang="sass">
@import '../base.sass'


section 
.section--header
.image__container
  @include navsnap 
    padding: 0px 10px
  img 
    width: 100%
.content--section 
  max-width: 80%
  @include edgesnap 
    max-width: 100%
    // padding: 0px 15px
    padding-right: 15px
  @include navsnap 
    padding-right: 0px 
    padding: 0px 10px
.about--text 
  margin-top: 25px
  font-family: $sans-serif

</style>

<!-- this was the original template layout-->
<!-- <Layout>
    <h1>Welcome to my blog :)</h1>
    <Pager :info="$page.allWordPressPost.pageInfo"/>
    <ul>
      <li v-for="{ node } in $page.allWordPressPost.edges" :key="node._id">
        <h2 v-html="node.title"/>
        <div v-html="node.fields.excerpt"/>
        <router-link :to="node.path">Read more</router-link>
      </li>
    </ul>
  </Layout> -->

<!-- this was underneath the template-->
<!--<page-query>
query Home ($page: Int) {
  allWordPressPost (perPage: 10, page: $page) @paginate {
    pageInfo {
      totalPages
      currentPage
    }
    edges {
      node {
        _id
        title
        path
        fields {
          excerpt
        }
      }
    }
  }
}
</page-query> -->