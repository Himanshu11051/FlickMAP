/* LBB App Service File
 * @Author: Himanshu
 */ 

var lbbAppResource = {
    lbbAppService : function(){
        angular.module('lbbApp').factory('lbbAppService',['$resource','constants',function($resource,constants){
            return{
                getPublicPhotos : function(lat,lon,page) {
                    return $resource('https://api.flickr.com/services/rest/?method='+constants.FLICKR_API_CONFIG.METHOD+'&api_key='+constants.FLICKR_API_CONFIG.KEY+'&lat='+lat+'&lon='+lon+'&per_page='+constants.FLICKR_API_CONFIG.PHOTOS_PER_PAGE+'&page='+page+'&format='+constants.FLICKR_API_CONFIG.FORMAT+'&nojsoncallback='+constants.FLICKR_API_CONFIG.CALLBACK,{},{getdata : {method : 'GET', headers : {'Content-Type': 'application/json'} } })
                }
            }
        }]);
    }	
};
lbbAppResource.lbbAppService();

