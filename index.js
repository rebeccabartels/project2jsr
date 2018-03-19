
var view;

//handlebars variables
var source   = $('#template').html();
var template = Handlebars.compile(source);

var placeArticles = function(obj){
  var html = template(obj)
  $('#main').append(html)
};

//test menu button
$('#chooseSource').on('focus',function(){
  $('nav ul li > ul').css('display','inherit');
  $('sourcesList').css('tabindex','0')
  });

  $('#chooseSource').focusout(function(){
    $('nav ul li > ul').css('display','none')
    $('sourcesList').css('tabindex','-1')

    });

// the loader
var time = (function(){
 $('.loader').toggle();
 $(document).ready(function(){
   $('#main').toggle();
 });
})();


var apis = {
  
  //not sure why this isn't working? ?
  financeAPI:function(){
    var url = 'https://newsapi.org/v2/top-headlines?sources=financial-times'
    url += $.param({
      "api-key": "apiKey=1cc2a2482b814ba2906deded8f5ded79"
    }); 
    $.ajax({
      url: url,
      method: 'GET',
      success: function(result){
        console.log(result);
        var articles = result.response.results;
            view = articles;
            var i = 1;
              articles.forEach(function(a){
              // just temporary place holders for checking. Can delete these when the innerTemp object is ready
              var id = "grd" + i;
              i++;
              var link = a.webUrl;
              var hed = a.webTitle;
              var pubdate = a.webPublicationDate;
              var abstract = a.fields.trailText;
              //var source = a.source.name;
              var words = a.fields.wordcount;
              var type = a.type;
              var author = a.fields.byline;
              //var score = a.score;
              var subj = a.sectionName;
              var image = a.fields.thumbnail;
              if (image == undefined){
                var image = '../jsr-12/images/guardian-logo.png'
              }
              if (subj == undefined){
                subj = 'not available'
              };
              if (author == undefined){
                author = ""
              };
              var innerTemp = {
                id : id,
                link : a.webUrl,
                hed : a.webTitle,
                abstract : a.fields.trailText,
                score : 'none',
                type : a.type,
                subject : a.sectionName,
                pic : image,
                newsSource : "The Guardian",
                author : author,
                date: a.webPublicationDate
              };
              placeArticles(innerTemp);
              //var html = template(innerTemp)
              //$('#main').append(html)
            });
          },
            complete: function(){
              $('.loader').toggle();
              $('#main').toggle();}
        });

        /*.done(function(result) {
          console.log(result);
          articles = {
            hed : result.response.docs
          }
          {debugger}
        }).fail(function(err) {
          throw err;
        });*/
      
      },


  guardAPI:function(){
    var url = 'https://content.guardianapis.com/search?show-elements=image&page-size=10&show-fields=all&';
    url += $.param({
      "api-key":"e3fee825-b18f-40ea-8f3b-9bde4544cf32"
    });
    $.ajax({
          url: url,
          method: 'GET',
          success: function(result){
            // parse the response into normalized containers/variables that go into an object for handlebars templating
            console.log(result);

            var articles = result.response.results;
            view = articles;
            var i = 1;
              articles.forEach(function(a){
              // just temporary place holders for checking. Can delete these when the innerTemp object is ready
              var id = "grd" + i;
              i++;
              var link = a.webUrl;
              var hed = a.webTitle;
              var pubdate = a.webPublicationDate;
              var abstract = a.fields.trailText;
              //var source = a.source.name;
              var words = a.fields.wordcount;
              var type = a.type;
              var author = a.fields.byline;
              //var score = a.score;
              var subj = a.sectionName;
              var image = a.fields.thumbnail;
              if (image == undefined){
                var image = '../jsr-12/images/guardian-logo.png'
              }
              if (subj == undefined){
                subj = 'not available'
              };
              if (author == undefined){
                author = ""
              };
              var innerTemp = {
                id : id,
                link : a.webUrl,
                hed : a.webTitle,
                abstract : a.fields.trailText,
                score : 'none',
                type : a.type,
                subject : a.sectionName,
                pic : image,
                newsSource : "The Guardian",
                author : author,
                date: a.webPublicationDate
              };
              placeArticles(innerTemp);
              //var html = template(innerTemp)
              //$('#main').append(html)
            });
          },
            complete: function(){
              $('.loader').toggle();
              $('#main').toggle();}
        });

  },

  newsAPI:function(){
    var url = 'https://newsapi.org/v2/top-headlines';
    url += '?' + $.param({
      "country":"us",
      "apiKey":"6ccec0e84bff48ecbd1bc1f99faa0aa8"
    });
    $.ajax({
          url: url,
          method: 'GET',
          success: function(result){
            // parse the response into normalized containers/variables that go into an object for handlebars templating
            console.log(result);

            var articles = result.articles;
            view = articles;
            var i = 1;
              articles.forEach(function(a){
              // just temporary place holders for checking. Can delete these when the innerTemp object is ready
              var id = "news" + i;
              i++;
              var link = a.url;
              var hed = a.title;
              var abstract = a.description;
              var source = a.source.name;
              //var words = a.word_count;
              //var type = a.type_of_material;
              //var score = a.score;
              var subj = a.section_name;
              var image = a.urlToImage

              if (image == undefined){
                var image = '../jsr-12/images/news-logo.jpg';
              };
              if (subj == undefined){
                subj = 'not available'
              };
              var innerTemp = {
                id : id,
                link : a.url,
                hed : a.title,
                abstract : a.description,
                score : 'none',
                type : a.source.name,
                subject : subj,
                pic : image,
                newsSource : a.source.name,
                author: a.author,
                date: a.publishedAt
              };

              placeArticles(innerTemp);
              //var html = template(innerTemp)
              //$('#main').append(html)
            });
          },
            complete: function(){
              $('.loader').toggle();
              $('#main').toggle();}
        });

        /*.done(function(result) {
          console.log(result);
          articles = {
            hed : result.response.docs
          }
          {debugger}
        }).fail(function(err) {
          throw err;
        });*/

  },

  nytAPI : function(){
    var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
    url += '?' + $.param({
      "api-key": "67440d21b3a04fe49f4211828a60f982"
      // Search parameter for section
      // 'fq': "section_name:(\"Arts\")"
    });
    $.ajax({
          url: url,
          method: 'GET',
          success: function(result){
            // parse the response into normalized containers/variables that go into an object for handlebars templating
            var articles = result.response.docs
            var i = 1
            articles.forEach(function(a){
              // just temporary place holders for checking. Can delete these when the innerTemp object is ready
              var id = "nyt" + i;
              i++;
              var link = a.web_url;
              var hed = a.headline.main;
              var abstract = a.snippet;
              var source = a.byline.original;
              var words = a.word_count;
              var type = a.type_of_material;
              var score = a.score;
              var subj = a.section_name;
              var image_source = a.multimedia[0];
              if (image_source){
                var image = 'https://static01.nyt.com/' + a.multimedia[0].url;
              }
              else {
                var image = '../jsr-12/images/Logo-NYT.jpg';
              };
              if (subj == undefined){
                subj = 'not available'
              };
              var innerTemp = {
                id : id,
                date : a.pubdate,
                link : a.web_url,
                hed : a.headline.main,
                abstract : a.snippet,
                score : a.score,
                type : a.type_of_material,
                source : a.byline.original,
                author: a.byline.original,
                subject : subj,
                pic : image,
                newsSource : "The New York Times"
              };
              placeArticles(innerTemp);
              //var html = template(innerTemp)
              //$('#main').append(html)
            });
          },
            complete: function(){
              $('.loader').toggle();
              $('#main').toggle();}
        })/*.done(function(result) {
          console.log(result);
          articles = {
            hed : result.response.docs
          }
          {debugger}
        }).fail(function(err) {
          throw err;
        });*/
  },
  displayModal : function(x){
    var revealModal = '#' + x;
    $(revealModal).toggle();
  },
  hideModal : function(x){
    var removeModal = '#' + x;
    $(removeModal).toggle();
  }
};


// saving the reurned NYtimes api object in a variable
//var nytArticles = nytAPI;





// add event handler for the news sources
//(function(){
//  alert('v2.1.6')
//})();

$('nav').on('click','ul ul li',function(){
  $('#main').toggle();
  $('article.article').remove();

  $('.loader').toggle();
  var src = $(this).data('api');
  var read = apis[src]();
});
$('#main').on('click','.info',function(event){
  var $currentModal = $(this).attr('data-id');
  apis['displayModal']($currentModal);
});
$('#main').on('click','button.close',function(event){
    var $currentModal = $(this).attr('data-id');
    apis['hideModal']($currentModal);
});
