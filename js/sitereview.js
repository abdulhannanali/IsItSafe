var siteReview =  (function(){
  var baseAPIUrl = "http://sitereview.bluecoat.com/rest/categorization";

  function reviewSite(url, cb) {
    postReview(url)
      .done(function(data) {
        cb(null, dataFormatify(data));
      })
      .fail(function(error) {
        cb(error);
      });
  }

  function dataFormatify (data) {
    var urlObject = {};
    if (data) {
      urlObject.url = data.url;
      urlObject.unrated = data.unrated;
      urlObject.threatLevel = data.threatrisklevel;
      urlObject.categories = categoriesArray(data.categories);
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
