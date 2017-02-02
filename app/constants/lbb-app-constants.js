var lbbAppConstants = {
  constants: function () {
    angular.module('lbbApp').constant('constants', {
      
      FLICKR_API_CONFIG : {
        METHOD: 'flickr.photos.search',
        KEY: '947046187646fc9e3c89b05ae891e822',
        PHOTOS_PER_PAGE: 12,
        PAGE_COUNT: 1,
        FORMAT:'json',
        CALLBACK:1
      }
      
    });
  }
};
lbbAppConstants.constants();
