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
});