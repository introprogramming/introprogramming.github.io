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
After than you should be ready to go. Note that NodeJS and gulp is **only needed in order to compile Sass code**. Writing plain HTML is done as usual.

## Fetching and packaging exercises from GitHub

The site shows the `README`s of all pushed exercises on the front page. But apart from that, it might nice neat to have the exercises as files on disk as well (for printing, sharing, etc.). Thus an `import` script exists.

### Import

By running the `import` script in the `scripts` directory, all exercises pushed to `master` at `exercises` will be downloaded as HTML and Markdown and put in an `exercises` directory.

```bash
node scripts/import
```

We're using OAuth to authenticate with GitHub (otherwise we'll hit the ceiling for how many requests per day you can do). Therefore the script needs an access token available as an environment variable in `GH_TOKEN`. You can do this with:

```bash
GH_TOKEN="ce7c5b2150374a20aeeaa799867d0d50ae638d28" node scripts/import
```

### Packaging

The main website links to a file `exercises.zip`. To generate this, either do it by hand (duh) or use the `package` script. The script takes one argument – the input directory to create the zip file from.

```bash
node scripts/package ./exercises
```
This script might seen redundant, but stay with me: it's used *inside* the import script as well. By passing a `--zip` option to `import`, the directory is zipped as well.

```bash
GH_TOKEN="ce7c5b2150374a20aeeaa799867d0d50ae638d28" node scripts/import --zip
```
All in one command. Neat?

## Deploying

The site uses GitHub Pages, so you can deploy to [introprogramming.github.io](http://introprogramming.github.io/) with a simple `git push`:
```
git push origin master
```
