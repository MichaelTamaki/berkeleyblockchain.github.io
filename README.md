# Blockchain at Berkeley Website

## Install Dependencies

```bash
npm install 
```

## Compile Sass/HTML/JS & Run Dev Server

```bash
npm start
```

## File Structure of `src`

The `html` folder holds `pages` and `templates`. `pages` holds all webpages that will eventually be served. `templates` holds HTML templates and partials that will be extended or used by the webpages in `pages`. Nunjucks parses this information and compiles it into HTML that the browser can read.

The `scss` folder holds `_base.scss`, which is the base scss file for the website. Specific pages will have their own scss files that import `base`.

## Workflow

The files to edit are in the `src` folder. After running npm start, it will automatically compile the scss and html files into CSS/HTML and compile the appropriate Javascript files into a bundle. BrowserSync hot reloads your browser everytime you save a change to scss, njk or js files.

The files from the `src` folder are compiled into the root folder, such that it can be deployed via Github Pages.

## Resources
[bs4starter](https://github.com/bradtraversy/bs4starter) - The boilerplate used.

[Bootstrap 4 Theming](https://getbootstrap.com/docs/4.0/getting-started/theming/) - How to override Bootstrap variables/classes using Sass.

[Nunjucks + Gulp tutorial](https://bonfacemunyoki.com/post/2017-07-23-modularizing-html/) - Nunjucks is the njk files that we use to modularize HTML elements. This way, we do not have to rewrite the navbar/footer for every page.

[IBM Plex Sans](https://github.com/IBM/type) - The font used
