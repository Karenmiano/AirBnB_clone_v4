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
});