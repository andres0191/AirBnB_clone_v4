/* executed only when DOM is loaded */
$(document).ready(function () {
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
