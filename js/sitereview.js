var baseAPIUrl = "https://floating-taiga-3043.herokuapp.com/";
var siteReview =  (function(){

  function reviewSite(url, cb) {
    postReview(url)
      .done(function(data) {
        cb(null, dataFormatify(data));
      })
      .fail(function(XMLHttpRequest, textStatus, errorThrown) {
        // console.log(MLHttpRequest);
        cb(XMLHttpRequest);
      });
  }

  function dataFormatify (data) {
    var urlObject = {};
    if (data) {
      urlObject.safe = "true" == data ? true: false;
    }

    return urlObject;
  }

  function postReview(url) {
    return $.post(baseAPIUrl, {
        url: url
    })
  }

  return reviewSite;
}());
