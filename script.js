// var app = angular.module('app', ['xeditable']);
//
// app.controller('Ctrl', function($scope) {
//     $scope.user = {
//         name: 'awesome user'
//     }
// });


var app = angular.module('app', ['xeditable', 'ui.bootstrap']);

app.controller('controller', controller);

//controller.$inject = ['$scope'];


function controller($scope) {
    var editableLElementWrapper;

    $scope.data = {
        mw: {
            value: 25,
            units: ['g/mol', 'mg/mol']
        },
        mass: {
            value: 5,
            units: ['mg', 'g', 'kg']
        },
        quantifier: {
            value: 0.25,
            units: ['g/mL', 'g/L', 'kg/L']
        },
        n: {
            value: 19.213,
            units: ['mol', 'mmol']
        }
    };
    $scope.mwunit= 'mol';

    $scope.setBehavior = function (form) {
        console.log(form);
        var editableElement = form.$editables[0].inputEl[0];
        editableElement.selectionStart = editableElement.selectionStop = editableElement.value.length;


        editableLElementWrapper = form.$editables[0].inputEl;
        editableLElementWrapper
            .on('blur', blurEventHandler);
        // .on('keydown', keyDownHandler)
        // .on('keyup', disableOtherEditableElementsOnKeyUp);


        function blurEventHandler() {
            form.$editables[0].scope.$apply(function () {
                form.$submit();
            });
        }

        // function keyDownHandler(keyDownEvent) {
        //   switch (keyDownEvent.which) {
        //     case keyCodes.Enter:
        //       keyDownEvent.preventDefault();
        //       editableElement.blur();
        //       break;
        //   }
        // }

        // function disableOtherEditableElementsOnKeyUp(keyUpEvent) {
        //   if (keyUpEvent.which !== keyCodes.Enter
        //     && keyUpEvent.which !== keyCodes.Tab
        //     && keyUpEvent.which !== keyCodes.Escape) {
        //     vm.disabledEdit(!(validationPatterns.numeric.test(editableLElementWrapper.val().trim())
        //       || !editableLElementWrapper.val().length));
        //   }
        // }
    };

    $scope.status = {
        isopen: false
    };

    $scope.toggled = function (open) {

    };

    $scope.toggleDropdown = function ($event) {
        $event.preventDefault();
        $event.stopPropagation();
        $scope.status.isopen = !$scope.status.isopen;
    };

    // $scope.unit = 'kg';
    // $scope.setUnit = function (unit) {
    //    $scope.unit = unit;
    // };

    $scope.massUnit = 'kg';
    $scope.mwUnit = 'mol';
    $scope.quantifierUnit = 'g/mL';
    $scope.nUnit = 'mmol';

    $scope.setUnit = function (entity, choice) {
        switch (entity) {
            case 'mw':
                $scope.mwUnit = choice;
                break;
            case 'mass':
                $scope.massUnit = choice;
                break;
            case 'quantifier':
                $scope.quantifierUnit = choice;
            break;
            case 'n':
                $scope.nUnit = choice;
            break;
            default:
                break;
        }
    }

}


