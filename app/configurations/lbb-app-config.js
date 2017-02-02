/* LBB App Config File
 * @Author: Himanshu
 */ 
var lbbApp = {
    bootstrap : function(){
        angular.module('lbbApp',['ui.router', 'ngResource', 'ngAnimate','ui.bootstrap']);
    },
    routerConfig : function(){
        angular.module('lbbApp').config(['$urlRouterProvider', '$stateProvider','$provide', function (urlRouterProvider, stateProvider,$provide) {

            urlRouterProvider.otherwise('login');
            
            stateProvider.state('login', {
                url: '/login',
                templateUrl: 'app/views/login.html',
                controller: 'lbbAppCtrl'
            }).state('home', {
                url: '/home',
                templateUrl: 'app/views/home.html',
                controller: 'lbbAppCtrl'
            });
                
/*                .state('home.contact', {
                url: '/contact',
                templateUrl: 'app/views/contact.html',
                controller: ''
            });*/
            $provide.factory('lbbAppUtil',function(){
                return{
                    nullCheck : function(value){
                        if(value != null && value != undefined && value != ''){
                            return true;
                        }
                        else{
                            return false;
                        }
                    }
                }

            });
        }]);
    }
}
lbbApp.bootstrap();
lbbApp.routerConfig();