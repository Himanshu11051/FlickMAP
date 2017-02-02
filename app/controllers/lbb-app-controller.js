/* LBB App Controller File
 * @Author: Himanshu
 */
var lbbAppActions = {
  lbbAppCtrl: function () {
    angular.module('lbbApp').controller('lbbAppCtrl', ['$rootScope', '$scope', '$state', '$timeout', 'lbbAppService', function ($rootscope, $scope, $state, $timeout, lbbAppService) {
      $scope.login = function () {
        $state.go('home');
        $timeout(function () {
          $scope.initialize();
        }, 1000);
      }
      $scope.logout = function () {
        $state.go('login');
      }
      var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      var labelIndex = 0;
      $scope.initialize = function () {
        var myLatLng = {
          lat: 20.5937
          , lng: 78.9629
        };
        var map = new google.maps.Map(document.getElementById('map'), {
          center: myLatLng, //Lat and Long of India
          zoom: 15
        });
        // This event listener calls addMarker() when the map is clicked.
        $timeout(function () {
          google.maps.event.addListener(map, 'click', function (event) {
            $scope.addMarker(event.latLng, map);
          });
        }, 1000);
        /*     google.maps.event.addListener(map, 'click', function(event) {
                 $scope.addMarker(event.latLng, map);
             });*/
        $scope.addMarker(myLatLng, map);
        var infoWindow = new google.maps.InfoWindow({
          map: map
        });
        // Try HTML5 geolocation.
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function (position) {
            var pos = {
              lat: position.coords.latitude
              , lng: position.coords.longitude
            };
            infoWindow.setPosition(pos);
            infoWindow.setContent('Location found.');
            map.setCenter(pos);
          }, function () {
            $scope.handleLocationError(true, infoWindow, map.getCenter());
          });
        }
        else {
          // Browser doesn't support Geolocation
          $scope.handleLocationError(false, infoWindow, map.getCenter());
        }
      };
      $scope.addMarker = function (location, map) {
        // Add the marker at the clicked location, and add the next-available label
        // from the array of alphabetical characters.
        var marker = new google.maps.Marker({
          position: location
          , label: labels[labelIndex++ % labels.length]
          , map: map
        });
        marker.addListener('click', function () {
          $scope.markerPosition = {};
          $scope.markerPosition.latitude = this.position.lat();
          $scope.markerPosition.longitude = this.position.lng();
          $scope.currentPage = 1;
          $scope.fetchPublicPhotos($scope.markerPosition);
          $('#photosModal').modal('show');
          //                    infowindow.open(map, marker);
        });
      };
      $timeout(function () {
        google.maps.event.addDomListener(window, 'load', $scope.initialize);
      }, 1000);
      $scope.handleLocationError = function (browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ? 'Error: The Geolocation service failed.' : 'Error: Your browser doesn\'t support geolocation.');
      };
      $timeout(function () {
        $scope.initialize();
      }, 1000);
      $scope.fetchPhotoRequest = {};
      /*   $scope.latitude =  20.5937;
         $scope.longitude =  78.9629;*/
      $scope.currentPage = 1;
      $scope.fetchPublicPhotos = function (markerPosition) {
        if (markerPosition == undefined) {
          markerPosition = $scope.markerPosition;
        }
        var fetchPhotos = lbbAppService.getPublicPhotos(markerPosition.latitude, markerPosition.longitude, $scope.currentPage);
        fetchPhotos.getdata({}, $scope.fetchPhotoRequest).$promise.then(function (data) {
          $scope.$broadcast('loading', true);
          if (data != undefined && data != null && data.stat == 'ok') {
            $scope.fetchPhotoResult = data.photos.photo;
            $scope.itemsPerPage = data.photos.perpage;
            
            $scope.totalItems = data.photos.total;
            $scope.mapPhotosToUrl();
            $scope.$broadcast('loading', false);
          }
          else {
            $scope.$broadcast('loading', false);
          }
        }, function (error) {
          $scope.$broadcast('loading', false);
        });
      };
      $scope.mapPhotosToUrl = function () {
        var fetchPhotoResult = $scope.fetchPhotoResult.map(function (item) {
          item.photoUrl = 'https://farm' + item.farm + '.staticflickr.com/' + item.server + '/' + item.id + '_' + item.secret + '_s.jpg';
          return item;
        })
      };
      $scope.maxSize = 10;
      $scope.showLoader = true;
      $scope.$on('loading', function (event, data) {
        if (data == true) {
          $scope.showLoader = true;
        }
        else {
          $scope.showLoader = false;
        }
      });
        }]);
  }
, };
lbbAppActions.lbbAppCtrl();