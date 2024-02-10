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
            $("#api_status").addClass('available');
        } else {
            $("#api_status").removeClass('available');
        }
    });
});
