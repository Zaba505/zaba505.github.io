<template>
  <div class="layout">
    <q-layout view="lhh LpR lff">
      <q-header reveal elevated class="bg-primary text-dark">
        <q-toolbar>
          <q-btn flat round :icon="homeIcon" :to="{ path: '/', force: true }"></q-btn>

          <q-toolbar-title>{{ title }}</q-toolbar-title>

          <q-btn flat to="/about.html">About</q-btn>
          <q-btn flat :to="{ path: '/projects', force: true }">Projects</q-btn>
        </q-toolbar>

        <q-toolbar v-if="page.path !== '/' && page.path.lastIndexOf('/') > 0" inset>
          <q-toolbar-title>{{ page.title }}</q-toolbar-title>

          <q-btn v-if="frontmatter.github" :icon="githubIcon" :href="frontmatter.github" type="a" flat round />
          <q-btn v-if="frontmatter.gitlab" :icon="gitlabIcon" :href="frontmatter.gitlab" type="a" flat round />
          <q-btn v-if="frontmatter.homepage" :icon="globeIcon" :href="frontmatter.homepage" type="a" flat round />
        </q-toolbar>
      </q-header>

      <q-page-container>
        <Home v-if="page.path === '/'"/>

        <About v-else-if="page.path === '/about.html'" />

        <DetailList v-else-if="page.path === '/projects'" />

        <Detail v-else />
      </q-page-container>

      <q-footer class="bg-primary text-dark">
        <q-toolbar class="footer">
          <p>
            © 2021 Carson Derr.
            <a href="https://creativecommons.org/licenses/by/3.0/" title="Creative Commons Attribution">Some rights reserved</a>
            ; please attribute properly and link back
            <br>
            Powered by
            <a href="https://next.quasar.dev">Quasar v2</a>,
            <a href="https://vuepress2.netlify.app">Vuepress v2</a>,
            and vuepress-theme-aboutme.
          </p>
        </q-toolbar>
      </q-footer>
    </q-layout>
  </div>
</template>

<script>
import { computed, defineComponent, defineAsyncComponent } from "vue";
import { usePageData, useSiteData, usePageFrontmatter } from "@vuepress/client";
import { useRoute, useRouter } from "vue-router";
import { ionGlobeOutline, ionHomeOutline, ionLogoGithub, ionLogoGitlab } from "@quasar/extras/ionicons-v5";
import Home from "../components/Home.vue";

export default defineComponent({
  name: "Layout",
  components: {
    Home,
    About: defineAsyncComponent(() => import("../components/About.vue")),
    Detail: defineAsyncComponent(() => import(/* webpackChunkName: "projects" */ "../components/Detail.vue")),
    DetailList: defineAsyncComponent(() => import(/* webpackChunkName: "projects" */ "../components/DetailList.vue"))
  },
  setup() {
    const data = useSiteData();
    const page = usePageData();
    const frontmatter = usePageFrontmatter();
    const router = useRouter();
    const route = useRoute();

    const routes = router.getRoutes();

    const title = computed(() => {
      const lpos = route.path.lastIndexOf("/");
      if (lpos === 0) return data.value.title;


      return routes.find(r => r.path === route.path.slice(0,lpos)).meta.title;
    });

    return {
      page,
      frontmatter,
      title,
      globeIcon: ionGlobeOutline,
      homeIcon: ionHomeOutline,
      githubIcon: ionLogoGithub,
      gitlabIcon: ionLogoGitlab,
    };
  }
})
</script>

<style lang="scss">
html, body {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
}

#app {
  width: 100%;
  height: 100%;
}

.layout {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
}

.footer {
  justify-content: center;
  align-items: center;
  color: var(--q-secondary);

  a {
      color: #3498db;
      text-decoration: none;
      -webkit-transition: all .25s ease-in;
      -moz-transition: all .25s ease-in;
      -ms-transition: all .25s ease-in;
      transition: all .25s ease-in;
      border-radius: 7px;
      padding: 0 3px;
  }

  p {
    margin: 0;
  }
}

</style>
