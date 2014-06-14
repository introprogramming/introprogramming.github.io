;(function() {

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
        text: $(item).text()
      })

      li.append(a)
      frag.push(li)
    })

    $(options.navigation).html(frag)
  }

})(jQuery)

$(function() {

  // smooth scrolling for anchor links

  smoothScroll.init({
    offset: 50,
    easing: 'easeInOutQuad',
    callbackAfter: function() {
      $('[data-spy="scroll"]').scrollspy('refresh')
    }
  })

  buildNavigation({
    container: "[role='main']"
  })
})


})()
