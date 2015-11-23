(function(){
  var alexaBaseUrl = "http://www.alexa.com/minisiteinfo/*?offset=5&version=alxg_20100607";

  var previousValue = "";
  var currentValue = "";


  $(document).ready(function(){
    errorBox(false);
    $("#urlBox").focusout(function(){
      $("#siteInfo").empty();
      errorBox(false);
      var currentValue = $("#urlBox").val();
      if (currentValue != previousValue) {
        previousValue = currentValue;
        urlRequest(currentValue);
      }
    });
  });

  function urlRequest (url) {
    loadingRing(true);
    siteReview(url, function(error, data) {
      loadingRing(false);
        if (error) {
          if (error.status == 404) {
            errorBox(true, "<i class='material-icons'>error</i> " + url + " was not found in our database", "Sorry even though we are working hard to keep our database updated there are many links which are not yet in our database. This site will be reviewed very soon");
          }
        }
        if (data) {
          navBarChange(true);
          colorCardGenerator($("#siteInfo"), "<i class='material-icons'>error</i> Site is not safe for anyone", "Open it at your own risk.", "red", "s12");
        }
        else {
          navBarChange(false);
        }
      alexaFrame(true, url);
    })
  }

  // changes a few things in nav bar based on the site
  function navBarChange (harm) {
    if (harm) {
      $("#navBar")
        .removeClass("light-green")
        .addClass("red")

      $("#navThumb").text("thumb_down");
    }
    else {
      $("#navBar")
        .removeClass("red")
        .addClass("light-green");
      $("#navThumb").text("thumb_up");
    }
  }

  function alexaFrame (show, url) {
    if (show) {
      var iframe = $("<iframe>")
        .attr("id", "alexaFrame")
        .attr("src", alexaBaseUrl.replace("*", url))
        .attr("height", "400px")
        .attr("width", "700px")
        .attr("frameborder", "0")
        .attr("class", "col s12");

    var cardPanel = $("<div>")
      .addClass("card-panel blue col s12 m6")
      .prepend($("<h3 class='card-title'>").text("Alexa Info!"))

    cardPanel.append(iframe);

    $("#siteInfo").append(cardPanel);


    }
  }

  function loadingRing (show) {
    if (show == true) {
      var progress = $("<div>")
        .addClass("progress")
        .addClass("green");


      var indeterminate = $("<div>")
        .addClass("indeterminate")
        .addClass("red");

      var row = $("<div id='progressBar'>")
        .addClass("row")
        .addClass("animated fadeIn");


      row.append(progress.append(indeterminate));
      $("#progress").append(row);
    }
    else {
      $("#progressBar").remove();
    }
  }


  function errorBox (show, title, message) {
      if (show) {
        $("#errorBox").show();
      }
      else {
        $("#errorBox").hide();
      }


      if (title) {
        $("#errorTitleBox").html(title);
      }
      if (message) {
        $("#errorMessageBox").text(message);
      }
  }

  function colorCardGenerator(tag, title, message, color, cols) {
    if (!title) {
      var title = "Default title";
    }
    if (!message) {
      var message = "Default message";
    }
    if (!color) {
      color = "green";
    }

    if (!cols) {
      cols = "s12"
    }



    var row =
      $("<div>")
      .addClass("row");

    var cols =
      $("<div>")
        .addClass("col")
        .addClass(cols)

    var card  =
      $("<div>")
        .addClass("card")
        .addClass(color)

    var cardContent =
      $("<div>")
        .addClass("card-content")
        .addClass("white-text")

    var cardTitle =
      $("<span>")
        .addClass("card-title")
        .html(title)

    var cardParagraph =
      $("<p>")
        .text(message)

    cardContent.append(cardTitle)
    cardContent.append(cardParagraph);

    card.append(cardContent)

    cols.append(card)
    row.append(cols);

    $(tag).append(row);

  }

  function emptySiteInfo () {
    $("#siteInfo").empty();
  }
}());
