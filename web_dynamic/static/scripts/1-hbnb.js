$(document).ready(function() {
    let selectedAmenities = [];
    $("input:checkbox").change(function() {
        if ($(this).prop('checked')) {
            selectedAmenities.push($(this).val())
        } else {
            let index = selectedAmenities.indexOf($(this).val());
            if (index !== -1) {
                selectedAmenities.splice(index, 1);
            }
        }
        $("DIV.amenities H4").html(selectedAmenities.join(', '));
    });
});