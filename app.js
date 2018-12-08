// var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
// url += '?' + $.param({
//   'api-key': "a7ceea322d564cf1834d7a1565039b66"
// });

// https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=a7ceea322d564cf1834d7a1565039b66&q=potato

// var baseUrl = "https://api.nytimes.com/svc/search/v2/articlesearch.json?";
// var apiKey = "a7ceea322d564cf1834d7a1565039b66";
// var question = "potato";
// var records = "5";
// var starYear = "20000101";
// var endYear = "20010101";

// var url = baseUrl+"api-key="+apiKey+"&q="+question;

$("#searchbutton").on("click", function(event) {
  $("#articles").empty();
  event.preventDefault();
  var baseUrl = "https://api.nytimes.com/svc/search/v2/articlesearch.json?";
  var apiKey = "a7ceea322d564cf1834d7a1565039b66";
  var question = $("#searchterm").val().trim();
  var records = $("#numberofrecords").val().trim();
  var startYear = $("#startyear").val().trim()+"0101";
  var endYear = $("#endyear").val().trim()+"0101";
  if(question!=="" && records!==""){
    var url = baseUrl+"api-key="+apiKey+"&q="+question;
    if(startYear!=="0101")
    {
      url += "&begin_date="+startYear;
    }
    if(endYear!=="0101")
    {
      url += "&end_date="+endYear;
    }
    console.log(url);
    $.ajax({
      url: url,
      method: 'GET',
    }).then(function(theObject) {
        console.log(theObject);
        for(var i = 0; i<records; i++){
          var theTitle = theObject.response.docs[i].headline.main;
          var theYear = theObject.response.docs[i].pub_date;
          // theYear = "2010-10-02T00:00:00Z";
          // theYear.split("T");
          
          var theURL = theObject.response.docs[i].web_url;
          var theSnippet = theObject.response.docs[i].snippet;

          console.log(theTitle);
          console.log(theYear);
          console.log(theURL);
          console.log(theSnippet);

          var articleDiv = $("<div>");
          articleDiv.addClass("p-3 m-3 border border-secondary rounded bg-light");
          articleDiv.css("word-wrap", "break-word");

          articleDiv.append("<h1><span class='badge badge-secondary'>"+(i+1)+" </span> "+theTitle+"</h1>");
          articleDiv.append("<p>"+theYear+"</p>");
          articleDiv.append("<p><a href='"+theURL+"'>" + theURL + "</a></p>")
          articleDiv.append("<p>"+theSnippet+"</p>");
          $("#articles").append(articleDiv);
        }
    });
  }
});

$("#clearresults").on("click", function() {
  $("#searchterm, #numberofrecords, #startyear, #endyear").val("");
  $("#articles").empty();
});