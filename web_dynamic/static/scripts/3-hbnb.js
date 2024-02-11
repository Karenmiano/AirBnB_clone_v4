$(document).ready(function() {
    let selectedAmenities = [];
    $("input:checkbox").on('change', function() {
        let amenityId = $(this).attr('data-id');
        let amenityName = $(this).attr('data-name');
        if (this.checked) {
            // Check if the amenity ID is not already in the array
            if (!selectedAmenities.some(amenity => amenity.id === amenityId)) {
                selectedAmenities.push({id: amenityId, name: amenityName});
            }
        } else {
            // Filter out the amenity by ID
            selectedAmenities = selectedAmenities.filter(amenity => amenity.id !== amenityId);
        }

        // Update the HTML content with the names of the selected amenities
        $(".amenities h4").html(selectedAmenities.map(amenity => amenity.name).join(', '));
    });

    $.get("http://0.0.0.0:5001/api/v1/status/", function(data) {
        if (data.status === "OK") {
            $("div#api_status").addClass('available');
        } else {
            $("div#api_status").removeClass('available');
        }
    });

    $.ajax({
        url: "http://0.0.0.0:5001/api/v1/places_search/",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify({}),
        success: function(response) {
            for (const place of response) {
                const article = '<article>' +
                                    '<div class="title_box">' +
                                        '<h2>' + place.name + '</h2>' +
                                        '<div class="price_by_night">$' + place.price_by_night + '</div>' +
                                    '</div>' +
                                    '<div class="information">' +
                                        '<div class="max_guest">' + place.max_guest + ' Guest'+ (place.max_guest != 1 ? 's': '') + '</div>' +
                                            '<div class="number_rooms">' + place.number_rooms + ' Bedroom' + (place.number_rooms != 1 ? 's': '') + '</div>' +
                                            '<div class="number_bathrooms">' + place.number_bathrooms + ' Bathroom' + (place.number_bathrooms != 1 ? 's': '') + '</div>' +
                                    '</div>' +
                                    '<div class="description">' + place.description + '</div>' +
                                '</article>';
                $("section.places").append(article);
                console.log(article)
            }
        }
    });
});
