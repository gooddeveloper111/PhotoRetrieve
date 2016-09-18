$(function () {

  var API_KEY = '6464a861fa6abc9e7eae6529b1026555';

  var photoURL = function(photo) {
    return 'https://farm'+ photo.farm +'.staticflickr.com/'+ photo.server +'/'+photo.id +'_'+ photo.secret+'.jpg';
  }


  var showPhoto = function(index) {
    $('#photo'+index).fadeIn(1000);
    $('#title'+index).fadeIn(1000);
    if (index < 7) {
      $('#title'+index).fadeOut(1000);
      $('#photo'+index).fadeOut(1000,function(){
        showPhoto(index+1);
      });
    }
  }

  $.ajax({
    method: 'get',
    url: 'https://api.flickr.com/services/rest/',
    data: {
      api_key: API_KEY,
      tags: 'lighthouse',
      format: 'json',
      method: 'flickr.photos.search'
      },
    dataType: 'jsonp',
    jsonpCallback: 'jsonFlickrApi',
    success: function (response) {
      var result = response.photos.photo;
      var title;
      $.each(result,function(key, value) {
        if(key>7) return false;
        title = value.title;
        $('<img>')
          .attr("id",'photo'+ key)
          .attr('src', photoURL(value))
          .appendTo('.lighthouse_images').hide();

        $('<p> Title: '+title+'</p>')
          .attr("id",'title'+key)
          .appendTo('.title').hide();
      });
      showPhoto(0);
    }
  });
});

