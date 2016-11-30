(function() {
  'use strict';

  angular.module('LunchCheck', [])
  .controller('LunchCheckController',LunchCheckController);

  //LunchCheckController.$inject = ['$scope'];

  function LunchCheckController($scope, $filter){
    $scope.lunch_menu = "";
    $scope.lunch_message = "";

    $scope.review_my_menu_choices = function() {
        var cleaned_input = ($scope.lunch_menu).trim();

        if(cleaned_input == "") {
          $scope.lunch_message = "blank menu";
        } else {
          var get_array = cleaned_input.split(',');
          if(get_array.length > 3) {
              $scope.lunch_message = "Too much!";
          } else {
                $scope.lunch_message = "Enjoy!";
          }
        }
    }
  }
})();
