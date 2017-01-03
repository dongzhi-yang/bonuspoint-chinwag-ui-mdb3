angular.module('chinwag')
    .component('chat', {
        templateUrl: 'client/chinwag/chat.html',
        controller: function($scope, $toastr, $log, $chatWindow) {

            this.noLog = false;
            this.getUnreadMessagesCount = (chat) => {
              let i;
                for(i=0;i<chat.participants.length;i++){
                  if (chat.participants[i].user_id == Meteor.userId()) {
                      return chat.participants[i].unreadMessagesCount || 0;
                  }
                }

            };

            this.chatDate = this.data.lastMessageAt || "";
            this.getOtherParticipants=(chat)=>{
              let otherParticipants=[];
              chat.participants.forEach((e,i,a)=>{
                if(e.user_id!=Meteor.userId()){
                  otherParticipants.push(e);
                }
              });
              return otherParticipants;
            };
            this.unreadMessagesCount =0;
            $scope.$watch(() => {
                return this.data;
            }, (newValue) => {
                //  debugger;
                  this.unreadMessagesCount = this.getUnreadMessagesCount(newValue);
            }, true)
        },
        bindings: {
            data: '='
        }
    });
