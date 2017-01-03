'use strict';

angular.module('chinwag')
    .component('chatWindow', {
        templateUrl: 'client/chinwag/chat-window.html',
        controller: function ($scope, $toastr,$log,$chatWindow) {
          this.noLog = true;
          $chatWindow.dataService.call(this,$scope);
            this.currentUser_id = Meteor.userId();
            this.displayTopicList = false;
        },
        bindings: {
            chat: '='
        }
    });
