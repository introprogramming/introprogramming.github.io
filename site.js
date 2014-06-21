;(function() {

// Convert base64 encoded string to UTF8
var base64ToUTF8 = function(str) {
  return decodeURIComponent(escape(window.atob(str)))
}

// Micro templating
var render = function(string, data) {
  for(var s in data) {
    string = string.replace(new RegExp('{'+s+'}', 'g'), data[s])
  }
  return string
}

// Create a template function bound to a
// template string ready for rendering data
// Usage: var tmpl = template('Hi {name}')
//        var rendered = tmpl({name: 'Johan'})
//        => 'Hi Johan'
var template = function(string) {
  return render.bind(this, string)
}

/*
  Main GitHub API wrapper
*/
GitHub = {
  // Details ..
  details: {
    url: "https://api.github.com",
    owner: "introprogramming",
    repo: "exercises"
  },
  readme: "README.md",
  token: "ce7c5b2150374a20aeeaa799867d0d50ae638d28",
  _base: function() {
    return render("{url}/repos/{owner}/{repo}/contents", this.details)
  },

  Helpers: {

    path: function(path) {
      return GitHub._base() + path
    },

    // GET url
    get: function(url) {
      return $.ajax({
        url: url,
        data: {
          access_token: GitHub.token
        },
        dataType: 'jsonp'
      });
    }
  },

  // GET /exercises

  getExercises: function() {
    return this.Helpers.get(this.Helpers.path("/exercises")).then(function(res) {
      return res.data.map(function(exercise) {
        return exercise.name
      })
    })
  },

  // GET /exercises/:exercise/README.md

  getReadmeForExercise: function(exercise) {
    return this.Helpers.get(this.Helpers.path("/exercises/"+ exercise +"/"+this.readme))
  }
}

// Matches:
//   Svårighetsgrad: <level>
//   **Svårighetsgrad: **<level>
//   Svårighetsgrad <level>
//   etc.
var extractLevel = function(content) {
  var matches = content.match(/Svårighetsgrad[\W\s]*(\d)/i)
  return matches ? matches[1] : false
}

// Create a plain object for templating
var transformExercise = function(exercise, i) {
  // Convert encoded README content to regular text
  var raw = base64ToUTF8(exercise.data.content),
      // Convert Markdown -> HTML with the Marked library
      content = marked(raw)

  return {
    order: i,
    level: extractLevel(raw) || 'Okänd',
    text: $(content).eq(0).text(),      // The first heading
    content: content
  }
}

// Comparator function for exercises
var sortByLevel = function(exercises) {
  return exercises.sort(function(e1, e2) {
    return (e1.level > e2.level) ? 1 :
      (e1.level < e2.level) ? -1 : 0
  })
}

// Build the list from an exercises object array
var renderReadmeList = function(exercises) {
  var $container = $(".exercises-list"),
      tmpl = template($("#exercise-template").html())

  // Render each exercise with 'tmpl', whose only argument
  // is a data object (given in Array.map).
  return $container.html( exercises.map(tmpl).join("") )
}

// Custom function mimicing Q.all():
// returns a promise whose argument is
// an array with all data objects. Takes
// and array of promises
var whenAll = function(promises) {
  var slice = Array.prototype.slice
  return $.when.apply($, promises).then(function() {
    return slice.call(arguments).map(function(r) {
      // The first element is the data object
      // The others are the status and the XHR promise itself.
      return r[0]
    })
  })
}

// Fetch READMEs and build list

var fetchReadmeas = function() {
  var self = this

  GitHub
    // Fetch exercises from the GitHub API
    .getExercises()
    // Then for each exercise, fetch its README
    .then(function(exercises){
      // Return a promise when all README-fetches have settled
      return whenAll( exercises.map(GitHub.getReadmeForExercise.bind(GitHub)) )
    })
    // Transform each exercise (parse out relevant data for templating)
    .then(function(exercises) {
      return exercises.map(transformExercise)
    })
    // Sort by difficulty level
    .then(sortByLevel)
    // Render the exercises with README content
    .then(renderReadmeList)

}

var buildNavigation = (function($) {

  var defaults = {
    container: "body",
    nodes: "h1",
    navigation: "[role='navigation'] ul"
  }

  return function(options) {
    options = $.extend({}, defaults, options)

    var headings = $(options.container).find(options.nodes),
        frag = []

    headings.each(function(i, item) {
      if(!item.id) return;

      var li = $("<li />"),

      a = $("<a />", {
        href: "#"+item.id,
        text: $(item).text(),
        "data-scroll": true
      })

      li.append(a)
      frag.push(li)
    })

    $(options.navigation).html(frag)
  }

})(jQuery)

$(function() {

  fetchReadmeas()

  buildNavigation({
    container: "[role='main']"
  })

  $("#accordion").on("shown.bs.collapse", function(evt) {
    var panel = $(evt.target)

    smoothScroll.animateScroll(null, "#"+panel.attr("id") , { offset: 40, speed: 300 })
  })

  // smooth scrolling for anchor links

  smoothScroll.init({
    offset: 50,
    easing: 'easeInOutQuad',
    callbackAfter: function() {
      $('[data-spy="scroll"]').scrollspy('refresh')
    }
  })
})


})()
