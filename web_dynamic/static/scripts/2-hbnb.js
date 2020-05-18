/* executed only when DOM is loaded */
$(document).ready(function () {
  // Check status of API and show the status color
  $.getJSON('http://127.0.0.1:5001/api/v1/status/', function (data) {
    if (data.status === 'OK') {
      console.log(data.status);
      $('DIV#api_status').addClass('available');
    }
  }).fail(function () {
    $('DIV#api_status').removeClass('available');
  });
  // Load amenities when click event
  $('input[type="checkbox"]').click(function () {
    let listaAmenity = [];
    if (!$('h4:eq(1)').is(':empty')) {
      listaAmenity = $('h4:eq(1)').text().split(', ');
    }
    const newAmenity = $(this).attr('data-name');
    if ($(this).prop('checked') === true) {
      listaAmenity.push(newAmenity);
    } else if ($(this).prop('checked') === false) {
      $.each(listaAmenity, function (i, amenity) {
        if (listaAmenity[i] === newAmenity) {
          listaAmenity.splice(i, 1);
        }
      });
    }
    $('h4:eq(1)').text(listaAmenity.join(', '));
  });
});
