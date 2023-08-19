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
};
 
$(document).ready(check);
