/* executed only when DOM is loaded */
$(document).ready(function () {
  $.ajax({
    type: 'POST',
    url: 'http://127.0.0.1:5001/api/v1/places_search',
    data: JSON.stringify({}),
    error: function (e) {
      console.log(e);
    },
    dataType: 'json',
    contentType: 'application/json'
  }).done(function (data) {
    $.each(data, function (i, place) {
      const htmlConvert = htmlparse(place);
      $(htmlConvert).appendTo('SECTION.places');
    });
  });

  $.getJSON('http://127.0.0.1:5001/api/v1/status/', function (data) {
    if (data.status === 'OK') {
      console.log(data.status);
      $('DIV#api_status').addClass('available');
    } else {
      $('DIV#api_status').removeClass('available');
    }
  });
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

function htmlparse (obj) {
  return (`<article>
<div class="title_box">
<h2>${obj.name}</h2>
<div class="price_by_night">${obj.price_by_night}</div>
</div>
<div class="information">
<div class="max_guest">${obj.max_guest} Guests</div>
<div class="number_rooms">${obj.number_rooms} Bedrooms</div>
<div class="number_bathrooms">${obj.number_bathrooms} Bathrooms</div>
</div>
<div class="description">
${obj.description}
</div>
</article>`
  );
}
