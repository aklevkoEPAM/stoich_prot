angular
    .module('protoTable')
    .directive('keyboardNavigation', KeyboardNavigation);

KeyboardNavigation.$inject = ['keyCodes'];

function KeyboardNavigation(keyCodes) {
    return {
        restrict: "A",
        scope: {},
        link: function ($scope, el, attr) {
            return keyboardNavigationLink($scope, el, attr, keyCodes);
        }
    };
}

function keyboardNavigationLink($scope, el, attr, keyCodes) {
    el.on('click', 'tbody', handleNavigation);

    function handleNavigation(e) {
        var targetTd = el.find('td');
        targetTd.keydown(function (e) {
            // shortcut for key other than keys
            //
            if ($.inArray(e.which, [keyCodes.Left, keyCodes.Up, keyCodes.Right, keyCodes.Down, keyCodes.Tab, keyCodes.Enter]) < 0) {
                return;
            }
            if (e.target.nodeName === "TD") {
                var td = $(e.target),
                    tr = td.closest('tr'),
                    moveTo = null,
                    moveToRow = null,
                    pos = td[0].cellIndex,
                    isTableSticky = td.parents('table')[0].dataset.tableType === 'sticky',
                    otherTable = td.parents('table').siblings('table'),
                    prevTableCurrentRowLastCell = otherTable.find('tr[tabindex="' + td.parent()[0].tabIndex + '"] > td:last-child'),
                    prevTablePrevRowLastCell = otherTable.find('tr[tabindex="' + (td.parent()[0].tabIndex - 1) + '"] > td:last-child'),
                    nextTableCurrentRowFirstCell = otherTable.find('tr[tabindex="' + td.parent()[0].tabIndex + '"] > td:first-child'),
                    nextTableNextRowFirstCell = otherTable.find('tr[tabindex="' + (td.parent()[0].tabIndex + 1) + '"] > td:first-child');
                switch (e.which) {
                    case keyCodes.Left: {
                        if (td.is(':first-child')) {
                            if (isTableSticky) {
                                moveTo = prevTablePrevRowLastCell;
                                break;
                            } else {
                                moveTo = prevTableCurrentRowLastCell;
                                break;
                            }
                        }
                        moveTo = td.prev();
                        break;
                    }
                    case keyCodes.Right:
                    case keyCodes.Tab: {
                        e.preventDefault();
                        if (td.is(':last-child')) {
                            if (isTableSticky) {
                                moveTo = nextTableCurrentRowFirstCell;
                                break;
                            } else {
                                moveTo = nextTableNextRowFirstCell;
                                break;
                            }
                        }
                        moveTo = td.next();
                        break;
                    }

                    case keyCodes.Up:
                    case keyCodes.Down: {
                        e.preventDefault();
                        e.stopPropagation();
                        e.stopImmediatePropagation();
                        if (e.which === keyCodes.Down) {
                            moveToRow = tr.next('tr').length ? tr.next('tr') : tr;
                        }
                        else if (e.which === keyCodes.Up) {
                            moveToRow = tr.prev('tr');
                        }
                        if (moveToRow.length) {
                            moveTo = $(moveToRow[0].cells[pos]);
                        }
                        break;
                    }
                }
                if (moveTo && moveTo.length) {
                    e.preventDefault();
                    moveTo.each(function (i, td) {
                        td.focus();
                    });
                }
            }
        });

       // el.off();  todo uncomment. Was commented before the demo because of a strange bug with stucking cell focus.
    }


}
