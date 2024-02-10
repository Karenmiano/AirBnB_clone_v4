$(document).ready(function() {
    let selectedAmenities = [];
    $("input:checkbox").on('change', function() {
        let amenityId = $(this).attr('data-id');
        let amenityName = $(this).attr('data-name');
        if (this.checked) {
            if (!selectedAmenities.some(amenity => amenity.id === amenityId)) {
                selectedAmenities.push({id: amenityId, name: amenityName});
            }
        } else {
            selectedAmenities = selectedAmenities.filter(amenity => amenity.id !== amenityId);
        }
        $(".amenities h4").html(selectedAmenities.map(amenity => amenity.name).join(', '));
    });
});
