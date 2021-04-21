<template>
  <q-page padding>
    <q-list bordered separator>
      <q-item v-for="project in projects" :key="project.title" :to="project.path" clickable v-ripple>
        <q-item-section>{{ project.title }}</q-item-section>
      </q-item>
    </q-list>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import { usePageFrontmatter } from "@vuepress/client";

export default defineComponent({
  name: "DetailList",
  setup() {
    const frontmatter = usePageFrontmatter();

    const projects = frontmatter.value.projects;

    return {
      projects,
    };
  }
})
</script>

<style lang="scss" scoped></style>
