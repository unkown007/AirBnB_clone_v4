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
};
 
$(document).ready(check);
