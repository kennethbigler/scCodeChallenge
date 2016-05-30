/* JSLint Validates */
/*global angular*/
var app = angular.module('myApp', [])
    .controller('MyController', ['$scope', '$log', function ($scope, $log) {
        'use strict';
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
        $scope.events = [];
        
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
            var i, j, wStart, wEnd, counter = 0;
            
            // sort elements by "end" variable
            events.sort(function (a, b) {return a.end - b.end; });
            
            // set the tracking counters to 0
            for (i = 0; i < events.length; i += 1) {
                events[i].rightCounter = 0;
                events[i].leftCounter = 0;
            }
            
            // need left conflicts counter, right conflicts counter, then place
            for (i = 0; i < events.length; i += 1) {
                counter = 0;
                for (j = i + 1; j < events.length; j += 1) {
                    if ((events[i].start >= events[j].start && events[i].start < events[j].end) || (events[i].end > events[j].start && events[i].end <= events[j].end)) {
                        counter += 1;
                        // move some conflicts to fill in empty space
                        if (events[i].leftCounter > events[j].leftCounter) {
                            events[j].rightCounter += 1;
                            if (counter > events[j].leftCounter) {
                                events[i].leftCounter = counter;
                            }
                        } else {
                            events[i].rightCounter += 1;
                            if (counter > events[j].leftCounter) {
                                events[j].leftCounter = counter;
                            }
                        }
                    }
                }
            }
            
            // variables in view to set: top (start), height (end - start), left and width set below
            // 3. An event should utilize the maximum width available, but rule #2 takes precedence over this rule.
            for (i = 0; i < events.length; i += 1) {
                j = events[i].leftCounter + events[i].rightCounter + 1;
                // ans - padding(5) - border-top(1) - border-top(1) = ans - 7
                events[i].height = events[i].end - events[i].start - 7;
                // ans - padding(5)
                events[i].width = ($scope.width / j) - 5;
                // leftCounter * (width + padding(5)) + padding(10);
                events[i].left = events[i].leftCounter * (events[i].width + 5) + 10;
            }
            
            // 2. If two events collide in time, they must have the same width.
            // find window for smallest element
            j = $scope.width - 5;
            for (i = 0; i < events.length; i += 1) {
                if (j > events[i].width) {
                    j = events[i].width;
                    wStart = events[i].start;
                    wEnd = events[i].end;
                } else if (j === events[i].width) {
                    if (events[i].start < wStart) {
                        wStart = events[i].start;
                    }
                    if (events[i].end > wEnd) {
                        wEnd = events[i].end;
                    }
                }
            }
            // set all events in smallest element window to that width
            for (i = 0; i < events.length; i += 1) {
                if ((events[i].start >= wStart && events[i].start < wEnd) || (events[i].end > wStart && events[i].end <= wEnd)) {
                    events[i].width = j;
                }
            }
            
            // set variable to the view and apply it
            $scope.events = events;
            // $log.log(events);
            $scope.$apply();
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
    //input = [{ start: 30, end: 150 }, { start: 100, end: 610 }, { start: 560, end: 620 }, { start: 560, end: 700 }];
    //input = [{ start: 30, end: 150 }, { start: 100, end: 610 }, { start: 560, end: 620 }, { start: 560, end: 700 }, {start: 360, end: 420}, {start: 10, end: 700}];
    layOutDay(input);
};