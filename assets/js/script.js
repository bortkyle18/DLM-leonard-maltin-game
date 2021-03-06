// Get Movie Info from API
var getMovie = function (movieTitle, movieYear) {
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    fetch('https://imdb-api.com/en/API/Search/k_3fj95i3b/' + movieTitle + '%20' + movieYear, requestOptions)
        .then(function (response) {
            response.json().then(function (data) {
                console.log(data)
                var titleId = data.results[0].id

                fetch('https://imdb-api.com/en/API/Title/k_3fj95i3b/' + titleId + '/Posters,Images,Trailer,Ratings,', requestOptions)
                    .then(function (response) {
                        response.json().then(function (data) {
                            console.log(data)
                            console.log(data.image)
                            console.log(data.title)
                            console.log(data.year)
                            console.log(data.genres)
                            console.log(data.tagline)
                            console.log(data.imDbRating)
                            console.log(data.metacriticRating)
                            console.log(data.plot)
                            console.log(data.actorList)
                            movieFound(data);
                        });
                    })
                    .catch(error => console.log('error', error));
            });
        })
        .catch(error => console.log('error', error));
};
// End of API functions












// Print Movie Info to Page
var movieFound = function(data) {
    var movieInfo = $("<li>");

    var image = $("<img>")
        .attr("src",data.image)
        .attr("style","width:100%");
    var title = $("<p>")
        .text(data.title);
    var year = $("<p>")
        .text(data.year);
    var genres = $("<p>")
        .text(data.genres);
    var tagline = $("<p>")
        .text(data.tagline);
    var imDbRating = $("<p>")
        .text(data.imDbRating);
    var metaRating = $("<p>")
        .text(data.metacriticRating);
    var plot = $("<p>")
        .text(data.plot);
    var actors = $("<div>");
    
    for(var i = (data.actorList.length-1); i >= 0; i--) {
        // picture from: https://www.subpng.com/png-bpkbw7/ or https://www.iconfinder.com/icons/445684/award_oscar_round_icon
        var noImage = "https://imdb-api.com/images/original/nopicture.jpg";
        var actorList = $("<li>");
        
        var actorCard = $("<div>")
        .addClass("card")
        .attr("style","width: 18rem;");
        
        if (data.actorList[i].image == noImage) {
            var picture = $("<img>")
            .attr("src","./assets/images/oscarIcon.png")
            .attr("alt","oscar icon, no actor photo available for" + data.actorList[i].name)
            .addClass("card-img-top");
        } else {
            var picture = $("<img>")
            .attr("src",data.actorList[i].image)
            .attr("alt",data.actorList[i].name)
            .addClass("card-img-top");
        };
        var cardBody = $("<div>")
            .addClass("card-body");
        var actor = $("<p>")
            .addClass("card-text text-center")
            .text(data.actorList[i].name);
        cardBody.append(actor);
        actorCard.append(picture,cardBody);

        actorList.append(actorCard);
        $(actors).append(actorList);
    };

    movieInfo.append(image,title,year,genres,tagline,imDbRating,metaRating,plot,actors);
    $("#movieInfo").append(movieInfo);
};
// End of Printing











getMovie('lord of the rings','2001');