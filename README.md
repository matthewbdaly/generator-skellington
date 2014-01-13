generator-skellington
=====================

A Yeoman generator for a Skeleton web page, with automated FTP deployment. Lets you quickly start work on a Skeleton-based website.

Usage
-----

Install it with:

`npm install -g generator-skellington`

Create a directory for your new project:

`mkdir new-project && cd new-project`

Run the generator

`yo skellington`

Tasks
-----

The following Grunt tasks will be created:

* `grunt build` - will clean up, run JSHint, concatenate and minify your JS and CSS, and place the compiled app in the `app/` directory.
* `grunt server` - will run the build task, and start up the development server. On any change, it will re-trigger the build task and reload the page automatically.
* `grunt deploy` - will build the app and deploy it to the server via FTP

The following third-party libraries are included:

* jQuery
* Modernizr
