// pull and display articles as JSON
$.getJSON("/articles", function(data) {
  for (var i = 0; i < data.length; i++) {
    var newData = "<p data-id='" + data[i]._id + "''>" + "<a href='" + data[i].link + "'>" + data[i].title + "</a>" + " " + '<input class="enterData" type="button" value="Bookmark"/>' + "</p>"
    $("#articles").append(newData);

  }
});


// onclick event to empty notes
$(document).on("click", "p", function() {
  // Empty the notes from the note section
  // $("#notes").empty();
  // Save the id from the p tag
  var thisId = $(this).attr("data-id");


  // ajax call for article
  $.ajax({
    method: "GET",
    url: "/articles/" + thisId
  })
    // add note
    .done(function(data) {
      console.log(data);
      // title
      $("#notes").append("<h4>" + data.title + "</h4>");
      // input area for title
      $("#notes").append("<input id='titleinput' name='title' placeholder='Title'>");
      // note body
      $("#notes").append("</br><textarea id='bodyinput' name='body'></textarea>");
      // submit
      $("#notes").append("</br><button class='enterData' data-id='" + data._id + "' id='savenote'>Save Note</button>");

      if (data.note) {
        // append title of note into title input
        $("#titleinput").val(data.note.title);
        // append note to note body
        $("#bodyinput").val(data.note.body);
      }
    });
});

// onclick event to save note
$(document).on("click", "#savenote", function() {
  // pull id of article
  var thisId = $(this).attr("data-id");

  // ajax request to change the note
  $.ajax({
    method: "POST",
    url: "/articles/" + thisId,
    data: {
      // Value taken from title input
      title: $("#titleinput").val(),
      // Value taken from note textarea
      body: $("#bodyinput").val()
    }
  })
    .done(function(data) {
      console.log(data);
      //empty notes
      $("#notes").empty();
    });

  // clear input
  $("#titleinput").val("");
  $("#bodyinput").val("");
});
