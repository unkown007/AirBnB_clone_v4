function title_box(name, price){
  const container = $('<div></div>');
  container.addClass('title_box');

  container.append($('<h2></h2>').text(name));

  const price_by_night = $('<div></div>');
  price_by_night.addClass('price_by_night');
  price_by_night.text(`$${price}`);
  container.append(price_by_night);
  return container;
}

function information(guests, rooms, bathrooms) {
  const container = $('<div></div>');
  container.addClass('information');

  const max_guests = $('<div></div>');
  max_guests.addClass('max_guest');
  max_guests.text((guests === 1) ? `${guests} Guest` : `${guests} Guests`);
  container.append(max_guests);

  const number_rooms = $('<div></div>');
  number_rooms.addClass('number_rooms');
  number_rooms.text((rooms === 1) ? `${rooms} Bedroom` : `${rooms} Bedrooms`);
  container.append(number_rooms);

  const number_bathrooms = $('<div></div>');
  number_bathrooms.addClass('number_bathrooms');
  number_bathrooms.text((bathrooms === 1) ? `${bathrooms} Bathroom` : `${bathrooms} Bathrooms`);
  container.append(number_bathrooms);

  return container;
}

function description(des) {
  const container = $('<div></div>');
  container.addClass('descritpion');

  container.text(des);
  
  return container;
}

function check() {
  const amenities = {};
  $('.amenities .popover input').change(function () {
    if ($(this).is(':checked')) {
      amenities[$(this).attr('data-id')] = $(this).attr('data-name');
    } else if ($(this).is(':not(:checked)')) {
      delete amenities[$(this).attr('data-id')];
    }
    const names = Object.values(amenities);
    $('.amenities h4').text(names.sort().join(', '));
  });

  $.get('http://0.0.0.0:5001/api/v1/status/', (data) => {
      if (data.status === "OK") {
        if (!$('div#api_status').hasClass('available')) {
          $('div#api_status').addClass('available');
        }
      } else {
        $('div#api_status').removeClass('available');
      }
  });

  $.ajax({
    url: 'http://0.0.0.0:5001/api/v1/places_search',
    method: 'POST',
    data: JSON.stringify({}),
    contentType: 'application/json',
    success: function (data) {
      data.forEach((place) => {
        const article = $("<article></article>");
        article.append(title_box(place.name, place.price_by_night));
        article.append(
          information(
            place.max_guest,
            place.number_rooms,
            place.number_bathrooms)
        );
        article.append(description(place.description));
        $('section.places').append(article);
      });
    }
  });
};

$(document).ready(check);
