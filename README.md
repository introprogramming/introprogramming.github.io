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
After that, you should be ready to go. Note that NodeJS and gulp is **only needed in order to compile Sass code**. Writing plain HTML is done as usual.

## Fetching and packaging exercises from GitHub

The site shows the READMEs of the exercises on the front page. To update and fetch new READMEs, an import script exists. The script will additionally create a downloadable archive containing all exercises (for printing, sharing, etc.).

The import of exercises from the exercise repo is done through a Python script. It downloads the latest available exercises on the `master` branch. To begin, make sure you have the `markdown2` package installed on your system. If it's not, it can be installed by running:

```
pip install markdown2
```

(Remember to prepend with `sudo` if you are not running with elevated privileges on a Unix-like system.)

The import script needs to be run from inside the `scripts/` directory. In that directory, start the import by running:

```
python import.py
```

If successful, exercise files have been extracted to the `exercises/` directory in the website directory. The files have also been packed into `exercises.zip` found in the same directory as `exercises/`.

## Host locally

During development, it can be useful to host the site locally on your machine. (The site will not work properly if you only open `index.html` as a file.) A simple way to host, with Python installed, is running this while in the website directory:

```
python -m SimpleHTTPServer
```

You should now be able to test the site by visiting `localhost:8000` in your browser.

## Deploying

The site uses GitHub Pages, so you can deploy to [introprogramming.github.io](http://introprogramming.github.io/) with a simple `git push`:
```
git push origin master
```
