/**
 * Created by Eric Goodman on 6/17/17.
 */

var app = angular.module('app', []);

//configure our routes
// app.config(function ($routeProvider) {
//     $routeProvider
//         .when('/', {
//             templateUrl: '../../spotifyme/src/public/followed.html',
//             controller: 'followedArtists'
//         })
//         .when('/recent', {
//             templateUrl: 'app',
//             controller: 'contactController'
//         });
// });

app.controller('followed', function mainController($scope, $http) {

    $http.get('https://spotifyeric.herokuapp.com/')
        .then(function (response) {
            var data = response.data;
            $scope.followedArtists = data[0].followed_artists;
            console.log($scope.followedArtists);
            console.log($scope.followedArtists[0].popularity);
        }).catch(function (err) {
        return console.error(err);
    });

});
