angular
    .module('protoTable')
    .directive('inlineEditingDirective', InlineEditingDirective)
    .controller('inlineEditingController', InlineEditingController);

InlineEditingDirective.$inject = ['keyCodes'];

function InlineEditingDirective(keyCodes) {
    return {
        restrict: "E",
        scope: {
            componentData: '='
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

    console.log('prod');
    el.off();

    el.closest('td').on('keydown', function (keyDownEvent) {
        var currentTabIndex = el.closest('td')[0].tabIndex;
        switch (keyDownEvent.which) {
            case keyCodes.Enter:
                console.log('enter');
                if (el.closest('td').find('form').length) {
                    $scope.editDisabled = true;
                    el.closest('td').focus();
                } else {
                    $scope.editDisabled = false;
                    el.closest('td').focus();
                    el.closest('td').find('inline-editing-directive>span').click();
                }
                break;
            case keyCodes.Escape:
                console.log('escape');
                $scope.editDisabled = true;
                el.closest('td').focus();
                break;
            case keyCodes.Tab:
                console.log('tab');
                keyDownEvent.preventDefault();
                $scope.editDisabled = true;
                el.closest('td').next('td').focus();
                break;
            case keyCodes.Down:
                var dropdownFirstElement = $('body > ul.dropdown-menu li:first-child a');
                var dropdownEventWrapper = $('body > ul.dropdown-menu');
                var dropdownEventElement = $('body > ul.dropdown-menu li a');
                var cellToReturn = el.closest('td');
                if ($(keyDownEvent.target).closest('td').find('.has-dropdown').length) {
                    keyDownEvent.preventDefault();

                    //editableElementWrapper.blur();
                    console.log('ewr');
                    dropdownFirstElement.focus();
                    dropdownEventElement.on('keydown', function (e) {
                        //editableElementWrapper.blur();
                        e.stopPropagation();
                        e.preventDefault();
                        switch (e.which) {
                            case keyCodes.Up:
                                $(e.target).parent('li').prev().find('a').focus();
                                break;
                            case keyCodes.Down:
                                console.log('ewrd');
                                $(e.target).parent('li').next().find('a').focus();
                                break;
                            case keyCodes.Enter:
                                $scope.$apply($scope.setUnit($(e.target)[0].innerHTML));
                                cellToReturn.focus();
                                dropdownEventWrapper.hide();
                                dropdownEventElement.off('keydown');
                                break;
                            case keyCodes.Escape: {
                                cellToReturn.focus();
                                dropdownEventWrapper.hide();
                                dropdownEventElement.off('keydown');
                                break;
                            }
                            default:
                                break;

                        }
                    });
                }

            default:
                break;
        }
    });

    el.closest('td').find('span.view-element').on('click', function (e) {
        if ($scope.editDisabled === true) {
            $scope.editDisabled = false;
            el.closest('td').focus();
            el.closest('td').find('inline-editing-directive>span').click();
        }
    });
    el.closest('td').on('blur', function (e) {
        if ($scope.editDisabled === false) {
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
        focusParent: focusParent,
        toggled: toggled,
        toggleDropdown: toggleDropdown,
        unit: $scope.componentData.units ? $scope.componentData.units[0] : undefined
    });

    $scope.setUnit = function (choice) {
        vm.unit = choice;
    };

    $scope.status = {
        isopen: false
    };

    $scope.showUnits = true;

    function focusParent(form) {


        //  form.hide();
        // if (form.$editables[0].inputEl[0].closest('td').is(':focus')) {
        //     console.log('uasdf');
        // }
        //form.$show();
        // } else {
        //     form.$editables[0].inputEl[0].closest('td').focus();
        //     form.$hide();
        // }
        //setBehavior(form);

    }

    function setBehavior(form) {
        var editableElement = form.$editables[0].inputEl[0];
        editableElement.selectionStart = editableElement.selectionStop = editableElement.value.length;

        editableElementWrapper = form.$editables[0].inputEl;
        editableElementWrapper
            .on('blur', blurEventHandler)
            .on('keydown', keyDownHandler);

        // .on('keyup', keyUpHandler);
        //.on('keyup', disableOtherEditableElementsOnKeyUp);


        function blurEventHandler() {
            form.$editables[0].scope.$apply(function () {
                form.$submit();
            });
        }

        function keyDownHandler(e) {
            console.log('her');
            editableElementWrapper.off('keydown');
            //todo make all below one separate function
            var dropdownFirstElement = $('ul.dropdown-menu li:first-child a');
            var dropdownEventWrapper = $('ul.dropdown-menu');
            var dropdownEventElement = $('ul.dropdown-menu li a');

            var cellToReturn = $(form.$editables[0].inputEl).parents('td');
            if (e.which === keyCodes.Down && $(e.target).closest('td').find('.has-dropdown').length) {
                e.preventDefault();
                //editableElementWrapper.blur();
                console.log('ewr');
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
                            $scope.showUnits = false;
                            console.log('ewr');
                            $(e.target).parent('li').next().find('a').focus();
                            break;
                        case keyCodes.Enter:
                            $scope.$apply($scope.setUnit($(e.target)[0].innerHTML));
                            cellToReturn.focus();
                            dropdownEventWrapper.hide();
                            dropdownEventElement.off('keydown');
                            break;
                        case keyCodes.Escape: {
                            cellToReturn.focus();
                            dropdownEventWrapper.hide();
                            dropdownEventElement.off('keydown');
                            break;
                        }
                        default:
                            console.log('erer');
                            break;

                    }
                });
            }
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
        $scope.status.isopen = !$scope.status.isopen;
    }

}
