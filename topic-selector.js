'use strict';

angular.module('chinwag')
    .component('topicSelector', {
        templateUrl: 'client/chinwag/topic-selector.html',
        bindings: {
            topic: '=',
            onSelect: '&?',
            displayTopicList: '='
        },
        controller: function($scope, $image, $productViewHistory, $log, $product, $topicSelector) {
            this.noLog = true;
            this.noLog || $log.debug("topicselector controller runs at:" + new Date());
            $productViewHistory.data.call(this, $scope);
            $topicSelector.data.call(this, $scope);
            //topic list is the pop up modal that allows users to select a topic.this variable controls whether to show | hide this
            this.displayTopicList = false;

            this.getCoverImageFullUrl = (product) => {
                if (product) {
                    return $product.getCoverImageFullUrl(product);
                }else{
                  return "";
                }
            };
            this.selectTopic = (topic) => {
                this.topic = topic;
                this.displayTopicList = false;
                this.onSelect({
                    topic: topic
                });
            };
            this.noLog || $log.debug("topicselector controller ends at:" + new Date());
        }
    });
