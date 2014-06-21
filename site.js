;(function() {

/*
  Main GitHub API wrapper
*/
GitHub = {
  // Details ..
  url: "https://api.github.com",
  owner: "introprogramming",
  repo: "exercises",
  readme: "README.md",
  token: "ce7c5b2150374a20aeeaa799867d0d50ae638d28",

  Helpers: {

    // GET url
    get: function(url) {
      return $.ajax({
        url: url,
        data: {
          access_token: GitHub.token
        },
        dataType: 'jsonp'
      });
    },

    // Helper function for content paths
    buildURL: function(path) {
      return GitHub.url+"/repos/"+ GitHub.owner +"/"+ GitHub.repo +"/contents"+path
    }
  },

  // GET /exercises

  getExercises: function() {
    return this.Helpers.get(this.Helpers.buildURL("/exercises")).then(function(res) {
      return res.data.map(function(exercise) {
        return exercise.name
      })
    })
  },

  // GET /exercises/:exercise/README.md

  getReadmeForExercise: function(exercise) {
    return this.Helpers.get(this.Helpers.buildURL("/exercises/"+ exercise +"/"+this.readme))
  }
}

// Convert base64 encoded string to UTF8

var base64ToUTF8 = function(str) {
  return decodeURIComponent(escape(window.atob(str)))
}

// Micro templating

var template = function(string, data) {
  for(var s in data) {
    string = string.replace(new RegExp('{'+s+'}', 'g'), data[s])
  }
  return string
}

var extractLevel = function(content) {
  var matches = content.match(/Svårighetsgrad[\W\s]*(\d)/i)
  return matches ? matches[1] : false
}

// Build the list from an exercises object array
var buildReadmeList = function(exercises) {
  var $container = $(".exercises-list"),
      els = []

  exercises.forEach(function(exercise, i) {
    var raw = base64ToUTF8(exercise.data.content),
        content = marked(raw),

        data = {
          order: i,
          level: extractLevel(raw) || 'Okänd',
          text: $(content).eq(0).text(),
          content: content
        }

    var tmpl = '<li>'+
      '<a data-toggle="collapse" id="t{order}" data-parent="#accordion" href="#doc{order}">{text} <strong class="exercise-level level-{level}" title="Svårighetsgrad {level}">Svårighetsgrad {level}</strong></a>'+
      '<section id="doc{order}" class="doc collapse">{content}</section>'+
    '</li>'

    els.push(template(tmpl, data))
  })

  $container.html(els)
}

// Fetch READMEs and build list

var fetchReadmeas = function() {
  var self = this,
      slice = Array.prototype.slice,

      whenAll = function(promises) {
        return $.when.apply($, promises)
      }

  GitHub
    .getExercises()
    .then(function(exercises){
      return whenAll( exercises.map(GitHub.getReadmeForExercise.bind(GitHub)) )
      .then(function() {
        return slice.call(arguments).map(function(r) {
          return r[0]
        })
      })
    })
    .then(buildReadmeList)

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
