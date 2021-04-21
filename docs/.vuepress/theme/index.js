const path = require("path");
const { createPage } = require("@vuepress/core");

const re = /\/.*\/.*.html/;

module.exports = {
  name: 'vuepress-theme-personal',
  clientAppEnhanceFiles: path.resolve(__dirname, "clientAppEnhance.js"),
   onInitialized: async (app) => {
     const projects = app.pages.filter(({path}) => re.test(path)).map(({path, title, frontmatter}) => ({path, title, frontmatter}));

     const page = await createPage(app, {
       path: "/projects",
       title: "Projects",
       frontmatter: {
         title: "Projects",
         projects,
       },
     });
     app.pages.push(page);
   }
}
