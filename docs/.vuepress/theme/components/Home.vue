<template>
  <q-page padding class="column home">
    <q-img :src="$withBase(pageData.avatar)" :ratio="3/4" alt="Avatar" class="avatar" />

    <div class="row">
      <q-btn v-if="pageData.github" :icon="githubIcon" :href="pageData.github" type="a" round size="lg" />
      <q-btn v-if="pageData.gitlab" :icon="gitlabIcon" :href="pageData.gitlab" type="a" round size="lg" />
    </div>

    <div class="content">
      <Content />
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import { usePageFrontmatter } from "@vuepress/client";
import { ionLogoGithub, ionLogoGitlab } from "@quasar/extras/ionicons-v5";

export default defineComponent({
  name: "Home",
  setup() {
    const pageData = usePageFrontmatter();

    return {
      pageData,
      githubIcon: ionLogoGithub,
      gitlabIcon: ionLogoGitlab,
    };
  }
})
</script>

<style lang="scss" scoped>
.home {
  align-items: center;
}

.avatar {
  border-radius: 50%;
  max-width: 300px;
}

.content {
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
