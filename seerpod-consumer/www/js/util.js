var autocomplete;
function initialize() {
    autocomplete = new google.maps.places.Autocomplete(
    /** @type {HTMLInputElement} */(document.getElementById('autocomplete')),
    { types: ['geocode'] });
        google.maps.event.addListener(autocomplete, 'place_changed', function() {
    });
}

google.maps.event.addDomListener(window, 'load', initialize);
var x = document.getElementById("autocomplete");
