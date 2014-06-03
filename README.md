# Course website

For news and information about the course.

## Developing

The Site uses [gulp](http://gulpjs.com/) for building the site's CSS, which is written in [Sass](http://sass-lang.com/).

Gulp is based on [NodeJS](http://nodejs.org/). The NodeJS website describes how to get Node. It is often available via package managers, like [Homebrew](http://brew.sh/) for OS X:
```
brew install node
```
[NPM](https://www.npmjs.org/) (Node Package Manager) is a service which lets you download small and large packages and libraries easily. NPM is bundled with the latest Node versions.

To install all dependencies, run this while in the website directory:
```
npm install
```
After than you should be ready to go.

## Deploying

The site uses GitHub Pages, so you can deploy to [introprogramming.github.io](http://introprogramming.github.io/) with a simple `git push`:
```
git push origin master
```
