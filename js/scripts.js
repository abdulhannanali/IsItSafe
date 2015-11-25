(function(){
  var alexaBaseUrl = "http://www.alexa.com/minisiteinfo/*?offset=5&version=alxg_20100607";

  var previousValue = "";
  var currentValue = "";


  $(document).ready(function(){
    errorBox(false);
    $("#urlBox").focusout(function(){
      var currentValue = $("#urlBox").val();
      if (currentValue != previousValue) {
        $("#siteInfo").empty();
        errorBox(false);
        faviconChanger(true);
        previousValue = currentValue;
        urlRequest(currentValue);
      }
    });
  });

  function urlRequest (url) {
    indeterminateProgressBar(true);
    siteReview(url, function(error, data) {
      indeterminateProgressBar(false);
        if (error) {
          if (error.readyState == 0) {
              errorBox(true, "<i class='material-icons'>error_outline</i> No network connection", "Sorry! We were unable to reach our servers.");
          }
          else if (error.status == 404) {
            errorBox(true, "<i class='material-icons'>error</i> " + url + " was not found in our database", "Sorry this site is not in our almighty database.");
            console.log(error);
          }
        }
        if (!data.safe) {
          faviconChanger(false);
          navBarChange(true);
          colorCardGenerator($("#siteInfo"), "<i class='material-icons'>error</i> Site is not safe for anyone", "Open it at your own risk.", "red", "s12");
          colorCardGenerator($("#siteInfo"), "DONT VIEW THIS Please!!!", "PORN Is Harmful! Don't open this site", "pink", "s12 m6" )

          colorCardGenerator($("#siteInfo"), "NAH!!!", "<img alt='no' src='img/no.gif' class='materialboxed center-text img-responsive' width='240px' height='100px'></img>", "red", "s12 m6")
          $("#noFapGuide").show();

        }
        else {
          navBarChange(false);
          colorCardGenerator($("#siteInfo"), "<i class='material-icons'>check_circle</i> Site is safe ", "According to our information the site is safe to visit but any site can potentially contain adult content. So never forget to keep an eye on url.", "green", "s12")
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
      .addClass("card-panel blue col s12 s12")
      .prepend($("<h3 class='card-title'>").text("Alexa Info!"))

    cardPanel.append(iframe);

    $("#siteInfo").append(cardPanel);


    }
  }

  function indeterminateProgressBar (show) {
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
        .html(message)

    cardContent.append(cardTitle)
    cardContent.append(cardParagraph);

    card.append(cardContent)

    cols.append(card)
    // row.append(cols);

    $(tag).append(cols);

  }

  function emptySiteInfo () {
    $("#siteInfo").children().remove();
  }

  function faviconChanger (safe) {
    var baseLocation = "img/icons/"
    var icons = [
      "thumbs-up-icon.png",
      "thumbs-down-icon.png"
   ]

   if (safe) {
     $("#favicon").attr("href", baseLocation + icons[0]);
   }
   else {
     $("#favicon").attr("href", baseLocation + icons[1]);
   }


  }


  // material plugins initialization
  $(document).ready(function(){
    $(".materialboxed").materialbox();
  })
}());
