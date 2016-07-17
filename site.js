;(function() {

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

var getExercises = function() {
  return $.getJSON('exercises.json').then(function(res) {
    return res
  })
}

var getReadmeForExercise = function(exercise) {
  return $.get('exercises/' + exercise.name + '/README.md')
}

// Matches:
//   Svårighetsgrad: <level>
//   **Svårighetsgrad: **<level>
//   Svårighetsgrad <level>
//   etc.
var extractLevel = function(content) {
  var matches = content.match(/Svårighetsgrad[\W\s]*(\d)/i)
//  console.log(matches)
  return matches ? matches[1] : false
}

// Create a plain object for templating
var transformExercise = function(exercise, i) {
  var readme = exercise.readme
  // Convert Markdown -> HTML with the Marked library
  // TODO: Remove this, use HTML compiled during import instead
  var content = marked(readme)
  var name = $(content).eq(0).text()

  return {
    order: i,
    level: extractLevel(readme) || 'Okänd',
    text: name, // The first heading
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
  var $container = $(".exercises-list"),
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
var fetchReadmes = function() {

  // Fetch exercises
  getExercises()
    // Then for each exercise, fetch its README
    .then(function(exercises) {

      // Add readme to each exercise
      // Could probably be done more elegantly

      var dfd = $.Deferred()
      // Modify exercise object when all README-fetches have settled
      whenAll(exercises.map(getReadmeForExercise)).then(function(readmes) {
        readmes.forEach(function(readme, i) {
          exercises[i].readme = readme
        })
        dfd.resolve(exercises)
      })
      return dfd
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

  fetchReadmes()

  buildNavigation({
    container: "[role='main']"
  })

  $("#accordion").on("shown.bs.collapse", function(evt) {
    var panel = $(evt.target)

//    smoothScroll.animateScroll(null, "#"+panel.attr("id") , { offset: 40, speed: 300 })
  })

  // smooth scrolling for anchor links

//  smoothScroll.init({
//    offset: 50,
//    easing: 'easeInOutQuad',
//    callbackAfter: function() {
//      $('[data-spy="scroll"]').scrollspy('refresh')
//    }
//  })
})

})()
