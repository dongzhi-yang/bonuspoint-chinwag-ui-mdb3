'use strict';
import template from './message-list.html';
angular.module('chinwag')
    .component('messageList', {
        templateUrl: template,
        controller: ["$scope", "$messageList", "$timeout", "$element", "$attrs", "$log", "$interval",function($scope, $messageList, $timeout, $element, $attrs, $log, $interval) {
            this.noLog = true;
            this.noLog || $log.debug("MessageList controller has started at" + new Date(), this.chatId);
            $messageList.dataService.call(this, $scope);

            this.differenceInSeconds = (date1,date2)=>{
              return parseInt((date2-date1)/1000);
            };
            this.$postLink = () => {
                this.noLog || $log.debug("$postLink of messageList started at :" + new Date());
                var
                    lengthThreshold = $attrs.scrollThreshold || 50,
                    timeThreshold = $attrs.timeThreshold || 400,
                    handler = () => {
                        this.limit += this.increment
                    }, //scope.$eval(attr.lrInfiniteScroll),
                    promise = null,
                    lastScrolled = -9999;

                lengthThreshold = parseInt(lengthThreshold, 10);
                timeThreshold = parseInt(timeThreshold, 10);

                if (!handler || !typeof handler == 'function') {
                    handler = () => {};
                }
                let scroller = $element.find("ul")[0];

                //debugger;
                $element.find("ul").bind('scroll', () => {
                    this.noLog || $log.debug("MessageList on scroll has started at:" + new Date());
                    var scrolled = scroller.scrollTop;
                    this.noLog || $log.debug("scrollTop:" + scrolled);
                    //if we have reached the threshold and we scroll up
                    if (scrolled < lengthThreshold && (scrolled - lastScrolled) < 0) {
                        //if there is already a timer running which has no expired yet we have to cancel it and restart the timer
                        //  if (promise !== null) {
                        //      $timeout.cancel(promise);
                        //  }
                        //  promise = $timeout(function () {
                        var oldScrollHeight = scroller.scrollHeight;
                        handler();
                        //scroll a bit againg
                        // $timeout(() => {
                        //     scroller.scrollTop = scroller.scrollHeight - oldScrollHeight;
                        // }, 300);
                        /*set the scroll position after loading the data, the scrollHeight (or the total height of the scroller has increased, and if the value of scrollTop -- current position of cursor is not changed, the data will jump to the top)*/
                        /* use interval because we don't know when the data load will be ready until the scroller.scrollHeight is changed*/
                        var intervalPromise = $interval(() => {
                                this.noLog || $log.debug("interval runs");
                                if (scroller.scrollHeight > oldScrollHeight) {
                                    this.noLog || $log.debug("interval condition met", scroller.scrollHeight, oldScrollHeight);
                                    scroller.scrollTop = scroller.scrollHeight - oldScrollHeight;
                                    oldScrollHeight = scroller.scrollHeight;
                                    $interval.cancel(intervalPromise);
                                }
                            }, 200,50);
                          /* watch somehow doesn't work as expected because the change of scrollHeight actually happen gradually*/
                          // var watchHandler=$scope.$watch(()=>{
                          //
                          //   return scroller.scrollHeight;
                          // },(newScrollHeight)=>{
                          //   this.noLog || $log.debug("watch runs");
                          //   if (newScrollHeight > oldScrollHeight) {
                          //       this.noLog || $log.debug("watch condition met", newScrollHeight, oldScrollHeight);
                          //       scroller.scrollTop = newScrollHeight - oldScrollHeight;
                          //       //oldScrollHeight = newScrollHeight;
                          //        watchHandler();
                          //     }
                          // })
                            //$element[0].scrollTop=$element[0].clientHeight/2;
                            //      promise = null;
                            //  }, timeThreshold);
                    }
                    lastScrolled = scrolled;
                });

                //scroll first to the bottom (with a delay so the elements are rendered)
                $timeout(() => {
                    //$element[0].scrollTop=$element[0].clientHeight;
                    //debugger;
                    scroller.scrollTop = scroller.scrollHeight;
                    this.noLog || $log.debug("scrollTop:" + scroller.scrollTop);

                }, 0);
            }
        }],
        bindings: {
            chatId: '='
        }
    });
