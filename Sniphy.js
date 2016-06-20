  var categories =[];

    function makeButtons(){
      $('#buttons').empty();
      for(var i=0; i < categories.length; i++){
        var buttons = $("<button>");
        buttons.addClass('letter-button letter letter-button-color');
        buttons.data('let', categories[i]);
        buttons.text(categories[i]);
        $("#buttons").append(buttons);

        if(i > 25){
          buttons.remove();
        }
    };
    }

    $('#findGiphy').click(function(){

        search = $('#giphySearch').val();
        categories.push(search);
        makeButtons();

        var queryURL = "http://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=" + search;

        $.ajax({
          url: queryURL,
          method: 'GET'
        })

            .done(function(response) {
                var imageUrl = response.data.image_url;
                var giphyImage = $("<img>");
                var p = $("<p>");
                giphyImage.attr('src', imageUrl);
                giphyImage.attr('alt', 'giphy image');
                $("#images").empty();
                $("#images").prepend(p);
                $('#images').prepend(giphyImage);
                $('#giphyURL').empty();
                $('#giphyURL').append(imageUrl);
            });
            return false;
    });

    $('#clearGiphy').click(function(){
      categories.remove();
      return false;
    });

    function workButtons(){
      $('#buttons').click(function(){
           var thisClick = $(this).text();
           console.log(thisClick);

           var clickURL = "http://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=" + thisClick;

           $('#images').empty();

           $.ajax({url: clickURL,
                   method: 'GET'
           })

                 .done(function(response){
                   var APIresults = response.data;
                     var imageUrl = APIresults.image_url;
                     var giphyImage = $(
                       "<img>");
                     var p = $("<p>");
                     giphyImage.attr('src', imageUrl);
                     giphyImage.attr('alt', 'giphy image');
                     $("#images").empty();
                     $("#images").prepend(p);
                     $('#images').prepend(giphyImage);
                     $('#giphyURL').empty();
                     $('#giphyURL').append(imageUrl);
                 });
       });
    }

  $(document).on('click', '.letter-button.letter.letter-button-color', workButtons);

    makeButtons();