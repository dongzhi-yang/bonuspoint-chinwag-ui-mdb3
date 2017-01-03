'use strict';

angular.module('chinwag')
    .component('message', {
        templateUrl: 'client/chinwag/message.html',
        controller: function($scope, $log, $message) {
            this.noLog = true;
            $message.data.call(this, $scope);
        },
        bindings: {
            messageId: '='
        }
    });
