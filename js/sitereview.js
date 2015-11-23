var baseAPIUrl = "http://localhost:3000";
var siteReview =  (function(){

  function reviewSite(url, cb) {
    postReview(url)
      .done(function(data) {
        cb(null, dataFormatify(data));
      })
      .fail(function(XMLHttpRequest, textStatus, errorThrown) {
        console.log(XMLHttpRequest);
        cb(XMLHttpRequest);
      });
  }

  function dataFormatify (data) {
    var urlObject = {};
    if (data) {
      urlObject.site = data.site;
    }

    return urlObject;
  }

  function categoriesArray (categoryString) {
    var categories = [];
    $(categoryString).each(function(idx, elem) {
      if ($(elem).text().trim() != "and") {
        categories.push($(elem.text()));
      }
    });

    return categories;
  }

  function postReview(url) {
    return $.post(baseAPIUrl, {
        url: url
    })
  }

  return reviewSite;
}());
