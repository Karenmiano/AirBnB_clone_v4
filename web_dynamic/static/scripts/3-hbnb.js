$(document).ready(function() {
    let selectedAmenities = [];
    $("input:checkbox").change(function() {
        if ($(this).prop('checked')) {
            selectedAmenities.push($(this).attr('data-name'))
        } else {
            let index = selectedAmenities.indexOf($(this).attr('data-name'));
            if (index !== -1) {
                selectedAmenities.splice(index, 1);
            }
        }
        $("DIV.amenities H4").html(selectedAmenities.join(', '));
    });
    $.ajax({
        url: 'http://0.0.0.0:5001/api/v1/status/',
        type: 'GET',
        success: function(response) {
            if (response.status === 'OK') {
                $('#api_status').addClass('available');
            } else {
                $('#api_status').removeClass('available');
            }
        },
        error: function(xhr, status, error) {
            console.error('Error:', error);
        }
    });
    $.ajax({
        url: 'http://0.0.0.0:5001/api/v1/places_search/',
        type: 'POST',
        contentType: 'application/json',
        data:JSON.stringify({}),
        success: function(response) {
            $.each(response, function(idx, place) {
                let article = $('<article>');
                console.log(place)
            
                // Title Box
                let titleBox = $('<div>').addClass('title_box');
                titleBox.append($('<h2>').text(place.name));
                titleBox.append($('<div>').addClass('price_by_night').text('$' + place.price_by_night));
                article.append(titleBox);
                
                // Information
                let information = $('<div>').addClass('information');
                information.append(`<div class="max_guest">${place.max_guest} Guest${place.max_guest !== 1 ? 's' : ''}</div>`);
                information.append(`<div class="number_rooms">${place.number_rooms} Bedroom${place.number_rooms !== 1 ? 's' : ''}</div>`);
                information.append(`<div class="number_bathrooms">${place.number_bathrooms} Bathroom${place.number_bathrooms !== 1 ? 's' : ''}</div>`);
                article.append(information);
                
                // User
                // let user = $('<div>').addClass('user').html(`<b>Owner:</b> ${place.user.first_name} ${place.user.last_name}`);
                // article.append(user);
                
                // Description
                let description = $('<div>').addClass('description').html(place.description);
                article.append(description);
                
                // Append the article to the .places section
                $('.places').append(article);
            });
        },
        error: function(xhr, status, error) {
            console.error('Error:', error);
        }
    });
});