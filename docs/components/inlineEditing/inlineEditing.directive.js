angular
    .module('protoTable')
    .directive('inlineEditingDirective', InlineEditingDirective)
    .controller('inlineEditingController', InlineEditingController);

InlineEditingDirective.$inject = ['keyCodes'];

function InlineEditingDirective(keyCodes) {
    return {
        restrict: "E",
        scope: {
            componentData: '<'
        },
        controllerAs: "vm",
        controller: 'inlineEditingController',
        templateUrl: "components/inlineEditing/inlineEditing.html",
        link: function ($scope, el) {
            return inlineEditingLink($scope, el, keyCodes);
        }
    };
}

function inlineEditingLink($scope, el, keyCodes) {
    el.off();
    el.closest('td').on('keydown', grandKeyDownHandler);

    function grandKeyDownHandler(keyDownEvent) {
        var keyCode = keyDownEvent.which;
        var dropdownFirstElement = $('body > ul.dropdown-menu li:first-child a');
        var dropdownEventWrapper = $('body > ul.dropdown-menu');
        var dropdownEventElement = $('body > ul.dropdown-menu li a');
        switch (true) {
            case (keyCode === keyCodes.Enter):

                console.log('enter');
                if (el.closest('td').find('form').length) {
                    $scope.editDisabled = true;
                    el.closest('td').focus();
                    if (dropdownEventWrapper) {
                        $('html').click(); //to hide the dropdown programmatically
                        dropdownEventElement.off('keydown');
                        $scope.isInDropdown = false;
                    }
                } else {
                    $scope.editDisabled = false;
                    el.closest('td').focus();
                    el.closest('td').find('inline-editing-directive>span.view-element').click();
                }

                break;

            case ((keyCode >= 65 && keyCode <= 90) || (keyCode >= 48 && keyCode <= 57)):

                $scope.editDisabled = false;
                el.closest('td').focus();
                el.closest('td').find('inline-editing-directive>span.view-element').click();

                // change the value of the cell after the first keydown
                if ($scope.componentData.value) {
                    $scope.componentData.value = $scope.componentData.value + keyDownEvent.originalEvent.key;
                } else {
                    $scope.componentData.value = keyDownEvent.originalEvent.key;
                }

                $scope.isInDropdown = false;

                break;
            case (keyCode === keyCodes.Escape):
                console.log('escape');
                $scope.editDisabled = true;
                el.closest('td').focus();
                break;
            case (keyCode === keyCodes.Tab):
                console.log('tab');
                keyDownEvent.preventDefault();

                $scope.editDisabled = true;
                dropdownEventWrapper.hide();
                dropdownEventElement.off('keydown');

                $scope.isInDropdown = false;
                el.closest('td').next('td').focus();
                break;
            case (keyCode === keyCodes.Down):
                $scope.isInDropdown = true;
                var cellToReturn = el.closest('td');
                if ($(keyDownEvent.target).closest('td').find('.has-dropdown').length) {
                    keyDownEvent.preventDefault();
                    console.log('ewr');
                    dropdownFirstElement.focus();
                    dropdownEventElement.on('keydown', function (e) {
                        $scope.isInDropdown = true;
                        //editableElementWrapper.blur();
                        e.stopPropagation();
                        e.preventDefault();
                        console.log('ewrd');
                        switch (e.which) {
                            case keyCodes.Up:
                                $(e.target).parent('li').prev().find('a').focus();
                                break;
                            case keyCodes.Down:
                                $scope.isInDropdown = true;
                                $(e.target).parent('li').next().find('a').focus();
                                break;
                            case keyCodes.Enter:
                                $scope.$apply($scope.setUnit($(e.target)[0].innerHTML));
                                cellToReturn.focus();
                                //$scope.isInDropdown = false;
                                console.log('in drop enter');
                                $('html').click(); //to hide the dropdown programmatically
                                dropdownEventElement.off('keydown');

                                $scope.form.$editables[0].scope.$apply(function () {
                                    $scope.form.$submit();
                                });

                                break;
                            case keyCodes.Escape:
                                console.log('in drop escape');
                                cellToReturn.focus();
                                $('html').click(); //to hide the dropdown programmatically
                                dropdownEventElement.off('keydown');
                                $scope.form.$editables[0].scope.$apply(function () {
                                    $scope.form.$submit();
                                });
                                break;
                            default:
                                console.log('in drop default');
                                $scope.isInDropdown = false;
                                break;
                        }
                    });
                }
                break;

            default:
                console.log('in all default');
                $scope.isInDropdown = false;
                break;
        }
    }

    el.closest('td').find('span.view-element').on('click', function (e) {
        if ($scope.editDisabled === true) {
            $scope.editDisabled = false;
            el.closest('td').focus();
            el.closest('td').find('inline-editing-directive>span').click();
        }
    });
    el.closest('td').on('blur', function (e) {
        if ($scope.editDisabled === false) {
            console.log('link blur');
            $scope.editDisabled = true;
        }
    });

}

InlineEditingController.$inject = ['$scope', 'keyCodes'];

function InlineEditingController($scope, keyCodes) {
    $scope.editDisabled = true;

    var vm = this,
        editableElementWrapper;

    angular.extend(vm, {
        setBehavior: setBehavior,
        toggled: toggled,
        toggleDropdown: toggleDropdown,
        unit: $scope.componentData.units ? $scope.componentData.units[0] : undefined
    });

    $scope.setUnit = function (choice) {
        vm.unit = choice;
        $scope.status.isopen = false;
    };

    $scope.status = {
        isopen: false
    };

    function setBehavior(form) {

        $scope.form = form;

        var editableElement = form.$editables[0].inputEl[0];
        editableElement.selectionStart = editableElement.selectionStop = editableElement.value.length;

        editableElementWrapper = form.$editables[0].inputEl;
        editableElementWrapper
            .on('blur', blurEventHandler)
            .on('keydown', keyDownHandler);

        // .on('keyup', keyUpHandler);
        //.on('keyup', disableOtherEditableElementsOnKeyUp);


        function blurEventHandler() {
            if (!$scope.isInDropdown) {
                form.$editables[0].scope.$apply(function () {
                    console.log('controller blur');
                    form.$submit();
                });
            }
        }

        function keyDownHandler(e) {
            $scope.isInDropdown = true;
            var keyCode = e.which;
            if ((keyCode >= 65 && keyCode <= 90) || (keyCode >= 48 && keyCode <= 57)) {
                e.stopPropagation();
            }

            var dropdownFirstElement = $('ul.dropdown-menu li:first-child a');
            var dropdownEventWrapper = $('ul.dropdown-menu');
            var dropdownEventElement = $('ul.dropdown-menu li a');

            var cellToReturn = $(form.$editables[0].inputEl).parents('td');

            if (e.which === keyCodes.Down && $(e.target).closest('td').find('.has-dropdown').length) {
                e.preventDefault();
                dropdownFirstElement.focus();
                dropdownEventElement.on('keydown', function (e) {
                    editableElementWrapper.blur();
                    e.stopPropagation();
                    e.preventDefault();
                    switch (e.which) {
                        case keyCodes.Up:
                            $(e.target).parent('li').prev().find('a').focus();
                            break;
                        case keyCodes.Down:
                            $(e.target).parent('li').next().find('a').focus();
                            break;
                        case keyCodes.Enter:
                            $scope.$apply($scope.setUnit($(e.target)[0].innerHTML));
                            cellToReturn.focus();
                            dropdownEventElement.off('keydown');
                            $scope.isInDropdown = false;
                            form.$editables[0].scope.$apply(function () {
                                $scope.status.isopen = !$scope.status.isopen;
                                form.$submit();
                            });
                            break;
                        case keyCodes.Escape: {
                            cellToReturn.focus();
                            $('html').click();
                            dropdownEventElement.off('keydown');
                            form.$editables[0].scope.$apply(function () {
                                form.$submit();
                            });
                            break;
                        }
                        default:
                            console.log('erer');
                            break;

                    }
                });
            }
            $scope.isInDropdown = false;
        }

        // function keyUpHandler(e) {
        //
        //     ///vm.editDisabled = false;
        //     $(e.target).closest('td').focus();
        //     editableElement.focus();
        //
        //
        //     //form.$cancel();
        // }
        //
        // function keyDownHandler(keyDownEvent) {
        //     switch (keyDownEvent.which) {
        //         case keyCodes.Enter:
        //             keyDownEvent.preventDefault();
        //             editableElement.focus();
        //             break;
        //     }
        // }

        // function disableOtherEditableElementsOnKeyUp(keyUpEvent) {
        //
        //     if (keyUpEvent.which !== keyCodes.Enter
        //         && keyUpEvent.which !== keyCodes.Tab
        //         && keyUpEvent.which !== keyCodes.Escape) {
        //         vm.disabledEdit(!(validationPatterns.numeric.test(editableLElementWrapper.val().trim())
        //         || !editableLElementWrapper.val().length));
        //     }
        // }
    }

    function toggled(open) {
    }

    function toggleDropdown($event) {
        $event.preventDefault();
        $event.stopPropagation();
        //$scope.status.isopen = !$scope.status.isopen;
    }

}
