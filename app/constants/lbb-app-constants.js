var lbbAppConstants = {
  constants: function () {
    angular.module('lbbApp').constant('constants', {
      
      FLICKR_API_CONFIG : {
        METHOD: 'flickr.photos.search',
        KEY: '84c5ed5bf712522499951598508d97ec',
        PHOTOS_PER_PAGE: 12,
        PAGE_COUNT: 1,
        FORMAT:'json',
        CALLBACK:1
      }
      
    });
  }
};
lbbAppConstants.constants();