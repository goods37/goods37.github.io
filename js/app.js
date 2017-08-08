/* Author: Eric Goodman*/

var app = angular.module('app', ['ngRoute']);

//configure our routes
app.config(function ($routeProvider) {
    $routeProvider
        .when('/recent', {
            templateUrl: 'recent.html',
            controller: 'recent'
        })
        .when('/followed', {
            templateUrl: 'followed.html',
            controller: 'followed'
        })
        .otherwise({
            controller: 'mainController'
        });
});


app.service('spotify', function ($http, $q) {
    /* Service the Spotify request to avoid unnecessary requests */
    function getSpotifyData() {
        var q = $q.defer();
        $http.get('https://spotifyeric.herokuapp.com/', {cache: true})
            .then(function success(response) {
                    q.resolve(response.data)
                },
                function failure(err) {
                    q.reject(err);
                }
            );
        return q.promise;
    }

    return {getSpotifyData: getSpotifyData};
});


app.controller('mainController', function ($scope, $location, spotify) {
    // Get data from Spotify, then present user with followed artists page
    $scope.loadFollowed = function () {
        $scope.title = 'Followed Artists';
        $location.url('/followed');
    };

    $scope.loadRecent = function () {
        $scope.title = 'Recently Played Tracks';
        $location.url('/recent');
    };

    // Default to followed artists
    spotify.getSpotifyData().then(function (res) {
        $scope.title = 'Followed Artists';
        $location.url('/followed');
    });


});

app.controller('followed', function followed($scope, spotify) {
    spotify.getSpotifyData().then(function (response) {
        $scope.followedArtists = response[0].followed_artists;

        // If spinner exists, remove and animate visibility
        if ( $('.spinner').length ) {
            console.log('spinner');
            $('.spinner').css('visibility', 'hidden');
            $('.spinner').remove();
            $('#main').css({
                opacity: 0.0,
                visibility: "visible"
            }).animate({opacity: 1.0}, 2000);
        }

    }).catch(function (err) {
        console.error(err);
    });
});

app.controller('recent', function recent($scope, spotify) {
    spotify.getSpotifyData().then(function (response) {
        $scope.recentlyPlayed = [];

        response[1].recently_played.items.forEach(function (item) {
            $scope.recentlyPlayed.push(item.track);
        });

        $('#main').css('visibility', "visible");
        console.log($scope.recentlyPlayed);
    });
});
