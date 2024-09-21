'use strict';

const mp_zoom = {
activate:function(){
  $('.simg').magnificPopup({
    type: 'image',
    closeOnContentClick: false,
    closeBtnInside: true,
    showCloseBtn: false,
    mainClass: 'mfp-with-zoom mfp-img-mobile',
    image: {
      verticalFit: true,
      titleSrc: function(item) {
        return item.el.attr('title');
      }
    },
    zoom: {
      duration: 500,
      enabled: true
    }
  });
}
}

export { mp_zoom }; 
