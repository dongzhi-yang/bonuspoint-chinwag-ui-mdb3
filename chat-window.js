'use strict';

import template from './chat-window.html';
angular.module('chinwag')
    .component('chatWindow', {
        templateUrl: template,
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
