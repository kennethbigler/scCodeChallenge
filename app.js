/* JSLint Validates */
/*global angular*/
var app = angular.module('myApp', [])
    .controller('MyController', ['$scope', '$log', function ($scope, $log) {
        'use strict';
        // set variables
        $scope.times = [{h: "9:00", ap: "AM"}, {h: "9:30", ap: ""},
                        {h: "10:00", ap: "AM"}, {h: "10:30", ap: ""},
                        {h: "11:00", ap: "AM"}, {h: "11:30", ap: ""},
                        {h: "12:00", ap: "PM"}, {h: "12:30", ap: ""},
                        {h: "1:00", ap: "PM"}, {h: "1:30", ap: ""},
                        {h: "2:00", ap: "PM"}, {h: "2:30", ap: ""},
                        {h: "3:00", ap: "PM"}, {h: "3:30", ap: ""},
                        {h: "4:00", ap: "PM"}, {h: "4:30", ap: ""},
                        {h: "5:00", ap: "PM"}, {h: "5:30", ap: ""},
                        {h: "6:00", ap: "PM"}, {h: "6:30", ap: ""},
                        {h: "7:00", ap: "PM"}, {h: "7:30", ap: ""},
                        {h: "8:00", ap: "PM"}, {h: "8:30", ap: ""},
                        {h: "9:00", ap: "PM"}];
        // height should be number of minutes from 9am until end
        $scope.height = 720;
        $scope.width = 600;
        
        /* set the unit height dynamically
         * allows for center of 9 at top and center of 9 at bottom
         */
        $scope.unitHeight = ($scope.height + $scope.height / $scope.times.length) / $scope.times.length;
        
        /**
          * Lay out events for the day.
          * 
          * @param {Object[]} events the events to be layed out
          * @param {Number} events.start the number of minutes after 9am when the event starts
          * @param {Number} events.end the number of minutes after 9am when the event ends
          */
        $scope.layOutDay = function (events) {
            var i;
            
            for (i = 0; i < events.length; i += 1) {
                events[i].start /= $scope.height;
                events[i].end /= $scope.height;
            }
            
            $log.log(events);
        };
    }]);

// call angular function from javascript
function layOutDay(events) {
    'use strict';
    angular.element(document.getElementById('myControllerElement')).scope().layOutDay(events);
}

window.onload = function () {
    'use strict';
    var input = [{ start: 30, end: 150 },
                { start: 540, end: 600 },
                { start: 560, end: 620 },
                { start: 610, end: 670 }];
    layOutDay(input);
};