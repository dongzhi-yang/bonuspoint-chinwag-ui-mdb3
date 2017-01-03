'use strict';
import template from './message.html';
angular.module('chinwag')
    .component('message', {
        templateUrl: template,
        controller: ["$scope", "$log", "$message",function($scope, $log, $message) {
            this.noLog = true;
            $message.data.call(this, $scope);
        }],
        bindings: {
            messageId: '='
        }
    });
