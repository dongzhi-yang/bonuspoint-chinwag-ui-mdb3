'use strict';
import template from './user-status.html';
angular.module('chinwag')
    .component('userStatus', {
        templateUrl: template,
        bindings: {
            uid: "<?", //a user id.
            showStatus:"<?" ,//boolean, whether to show the status of user
            showName:"<?", //boolean, whetehr to show the status of user
            showStatusDescription:"<?",
            showUserType:"<?"
        },
        controller: ["$scope","$userStatus", "$log", "$element","$timeout",function($scope,$userStatus, $log, $element,$timeout) {
            this.noLog = true;
            this.noLog || $log.debug("userStatus Controller started at:" + new Date());


            $userStatus.data.call(this,$scope);
            let defaultValues={
              showStatus:true,   /* default value is true, by default, this directive should show the status of user*/
              showName:true,     /* default value is true, by default, this directive should show the name of user*/
              showStatusDescription:true,   /* default value is true, by default, this directive should show the description of user status*/
              showUserType:true /* default value is false, by default, this directive should show user type*/
            }
            Tools.mergeEffective(this,defaultValues);

            /* boolean variable that allows turn on & off editing of custom status description, default to false */
            this.editStatusDescription = false;

            /* turn on the inline editing of status description */
            this.startEditStatusDescription = () => {
                /*users can only edit their own status*/
                if (this.isCurrentUser) {
                    this.oldStatusDescription = this.user.customStatusList[this.user.status.name].description;
                    this.editStatusDescription = true;
                }
            };

            this.maxStatusLength = 25;


            this.$postLink = () => {
                this.noLog || $log.debug("post link runs at:" + new Date());
                $timeout(() => {//it is very likely that the first time $postLink runs, the ng-if has not been handled because of $ctrl.user doesn't have values yet.
                // debugger;
                //     $element.find("input").keydown(function(event) {
                //     //  debugger;
                //     let len = $element.find("input").val().length;
                //      $log.debug("length of input:"+len);
                //         if (len >= 25 ) {
                //           //  return false;
                //           event.preventDefault();
                //         }
                //     });
                this.noLog || $log.debug("post link timeout runs at:" + new Date());
              }, 0)


            }
        }]
    });
