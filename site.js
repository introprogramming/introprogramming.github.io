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

  // GET url

  get: function(url) {
    return $.ajax({
      url: url,
      data: {
        access_token: this.token
      },
      dataType: 'jsonp'
    });
  },

  // Helper function for content paths
  buildURL: function(path) {
    return this.url+"/repos/"+ this.owner +"/"+ this.repo +"/contents"+path
  },

  // GET /exercises

  getExercises: function() {
    return this.get(this.buildURL("/exercises")).then(function(res) {
      return res.data.map(function(exercise) {
        return exercise.name
      })
    })
  },

  // GET /exercises/:exercise/README.md

  getReadmeForExercise: function(exercise) {
    return this.get(this.buildURL("/exercises/"+ exercise +"/"+this.readme))
  }
}

// Convert base64 encoded string to UTF8

var base64ToUTF8 = function(str) {
  return decodeURIComponent(escape(window.atob(str)))
}

// Build the list from an exercises object array
var buildReadmeList = function(exercises) {
  var $container = $(".exercises-list"),
      els = []

  exercises.forEach(function(exercise, i) {
    var content = markdown.toHTML(base64ToUTF8(exercise.data.content))

    var el = '<li>'+
      '<a data-toggle="collapse" id="t'+i+'" data-parent="#accordion" href="#doc'+i+'">'+ $(content).eq(0).text() +'</a>'+
      '<section id="doc'+i+'" class="doc collapse">'+ content +'</section>'+
    '</li>'

    els.push(el)
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
