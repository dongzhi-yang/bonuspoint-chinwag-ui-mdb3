'use strict';
import template from './input-panel.html';
angular.module('chinwag')
    .component('inputPanel', {
        templateUrl: 'client/chinwag/input-panel.html',
        controller: function ($scope, $reactive, $toastr, $sce, $sanitize) {
            $reactive(this).attach($scope);

            this.action = {};

            this.maxMessageLength = 500;
            this.action.loadImage = function () {
                //TODO add load image
                console.log('add image : input panel');
            };

            /**
             * Message input value
             */
            this.messageText = null;

            /**
             * Maximum input length for message text
             */
            $scope.$watch(() => {
                return this.messageText;
            }, (current, original) => {
                if(current === null){
                    return;
                }
                if(current.length > this.maxMessageLength) {
                    this.messageText = original;
                }
            });

            /**
             * holdchat flag
             * User can't send new message after previous if between them interval < 1s
             * @type {boolean}
             */
            var holdchat = false;

            /**
             * Add new message to Messages Collection
             */
            this.action.addMessage = () => {

                /**
                 * Use Angular $sanitize to check data valid
                 */
                 //debugger;
                 /* this is not a good solution because it doesn't support utf-8 characters, also need to handle data verification from back end.*/
                //this.messageText = $sanitize(this.messageText);

                if(holdchat){
                    return;
                }
                if(!this.messageText || this.messageText === '' || typeof this.messageText !== 'string'){
                    return;
                }
                if(!this.chat._id){
                    return;
                }
                Meteor.call('chat.insertMessage', this.chat._id, {text: this.messageText, type: 'text'}, '0', function (e) {
                    if (e) {
                        $toastr.error(e.message);
                        console.log(e.message);
                    }
                });

                /**
                 * Send interval between messages in 1 second
                 */
                setTimeout(function(){
                    holdchat = false;
                }, 500);
                holdchat = true;

                this.messageText = null;
            };

            /**
             * Event: press key 'Enter'
             * @param $event keyUp
             */
            this.key = function ($event) {
                if (($event.shiftKey) && (($event.keyCode === 0xA) || ($event.keyCode === 0xD))) {
                    return;
                }

                if ($event.keyCode === 13) {
                    this.action.addMessage();
                    $event.preventDefault();
                    $('.message-list').animate({scrollTop: $('.message-list').prop("scrollHeight") }, 'slow');
                }
            };

            /**
             * Button: send Message
             */
            this.action.sendMessage = function () {
                this.addMessage();
                $('.message-list').animate({scrollTop: $('.message-list').prop("scrollHeight") }, 'slow');
            };


            /**
             * Button: Open Emoji panel
             */

            this.displayEmoji = false;

            this.inputEmoji = function (emoji) {
                if (this.messageText === null) {
                    this.messageText = ':' + emoji + ':';
                } else {
                    this.messageText += ':' + emoji + ':';
                }
                this.displayEmoji = !this.displayEmoji;
            };

            /**
             * Button: Back to the user list
             */
            this.chatList = function() {
                this.chat = null;
            };

            /**
             * List of emoji in input-panel
             * @type {string[]}
             */
            this.emojiList = ["bowtie", "smile", "laughing", "blush", "smiley", "relaxed", "smirk",
                "heart_eyes", "kissing_heart", "small_red_triangle_down", "shipit"];
        },
        bindings: {
            chat: '=',
            displayTopicList: '=',
            messages: '='
        }
    });
