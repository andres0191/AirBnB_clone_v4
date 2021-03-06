/* executed only when DOM is loaded */
$(document).ready(function () {
  // Check status of API and show the status color
  $.getJSON('http://127.0.0.1:5001/api/v1/status/', function (data) {
    if (data.status === 'OK') {
      $('DIV#api_status').addClass('available');
    }
  }).fail(function () {
    $('DIV#api_status').removeClass('available');
  });
  // Load all places with front-end
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
  // Filter with the amenities
  $('.container .filters button').click(function () {
    const datah4 = $('h4:eq(1)').text().split(', ');
    const listId = [];
    $.each(datah4, function (j, name) {
      $('.container .amenities .popover UL LI input').each(function () {
        if (name === $(this).attr('data-name')) {
          listId.push($(this).attr('data-id'));
        }
      });
    });

    $('SECTION.places').empty();
    $.ajax({
      type: 'POST',
      url: 'http://127.0.0.1:5001/api/v1/places_search',
      data: JSON.stringify({ amenities: listId }),
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
  });
  // Load amenities with the click event
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
