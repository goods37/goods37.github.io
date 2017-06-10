var url = 'https://dry-tundra-81652.herokuapp.com/artists/time_range/short_term';

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

$.getJSON(url)
    .done(function(data) {
        $.each( data.items, function( i, item ) {

            console.log(item);

           var name = item.name,
               followers = item.followers.total,
               artist_link = item.external_urls.spotify;

           var image_index = item.images.length === 3 ? 0 : 1,
               image_link = item.images[image_index].url,
               image_height = item.images[image_index].height,
               image_width = item.images[image_index].width;

           var card_div = $('<div>')
               .addClass('spotify-card')
               .addClass('animated')
               .addClass('zoomIn')
               .appendTo('#spotify-artists');

            var image = $("<img>").attr('src', image_link).attr('width', 100).attr('height', 100)
                .addClass('spotify-image')
                .appendTo(card_div);

           var card_data = $("<div>")
               .append('<p class="text-center">' + name + '</p>')
               .append('<p class="text-center"><small>Followers: ' + numberWithCommas(followers) + '</small></p>')
               .appendTo(card_div);
        });
    });