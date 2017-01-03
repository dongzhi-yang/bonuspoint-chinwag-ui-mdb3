'use strict';
import '../../node_modules/ng-embed/src/ng-embed.css';
angular.module('chinwag')
    .component('chinwag', {
        templateUrl: 'client/chinwag/chinwag.html',
        bindings: {
          mode: '@?' // "desktop" or "mobile"
        },
        controller: function($scope, $image, $chinwag, $log) {

            this.$onInit = () => {
                this.noLog = true;
                this.mode = this.mode || 'desktop';
                this.tab = 'contacts';
                this.chinwagOpen = false;
                this.onLoad = true;
            };

            $scope.$on('MediaChange', (event, media) => {
                if((media == 'xs' || media == 'sm') && this.mode == 'desktop' && this.chinwagOpen) this.chinwagOpen = false;
                if(media != 'xs' && media != 'sm' && this.mode != 'desktop' && this.chinwagOpen) this.chinwagOpen = false;
            });

            $chinwag.dataService.call(this,$scope);

            this.changeTab = (tab) => {
                this.tab = tab;
                this.currentChat = null;
            };

            // open chat on event listen
            $scope.$on('open-chat', () => {
                this.chinwagOpen = true;
            });

            this.toggleChinwag = () => {
                if (Meteor.userId() !== null) {
                    this.chinwagOpen =!this.chinwagOpen;
                } else {
                    this.notLogin = true;
                }
            };
            this.openChatWindow =  (chat) => {
                this.currentChat = chat;
            };
        }
    });
