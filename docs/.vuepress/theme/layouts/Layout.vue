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
      </q-header>

      <q-page-container>
        <Home v-if="page.path === '/'"/>

        <About v-else-if="page.path === '/about.html'" />

        <Projects v-else-if="page.path === '/projects'" />

        <Project v-else />
      </q-page-container>

      <q-footer class="bg-primary text-dark">
        <q-toolbar class="text-body1 footer">
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
import { usePageData, useSiteData } from "@vuepress/client";
import { useRouter } from "vue-router";
import { ionHomeOutline } from "@quasar/extras/ionicons-v5";
import Home from "../components/Home.vue";

export default defineComponent({
  name: "Layout",
  components: {
    Home,
    About: defineAsyncComponent(() => import("../components/About.vue")),
    Project: defineAsyncComponent(() => import(/* webpackChunkName: "projects" */ "../components/Project.vue")),
    Projects: defineAsyncComponent(() => import(/* webpackChunkName: "projects" */ "../components/Projects.vue"))
  },
  setup() {
    const data = useSiteData();
    const page = usePageData();
    const router = useRouter();

    const title = computed(() => page.value.path === '/' ? data.value.title : page.value.title);

    console.log(router.getRoutes());

    return {
      page,
      title,
      homeIcon: ionHomeOutline
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
}

.footer a {
    color: #3498db;
    text-decoration: none;
    -webkit-transition: all .25s ease-in;
    -moz-transition: all .25s ease-in;
    -ms-transition: all .25s ease-in;
    transition: all .25s ease-in;
    border-radius: 7px;
    padding: 0 3px;
}
</style>
