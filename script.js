(function (angular) {
  'use strict';

  angular
      .module('app', ['xeditable', 'ui.bootstrap'])
      .controller('controller', controller)
      .directive('inlineEditingDirective', InlineEditingDirective)
      .controller('InlineEditingController', InlineEditingController);

  function controller($scope) {
    $scope.reactantRows = {
      sticky: [
        {
          value: 'Potassium hydroxide'
        },
        {
          value: 'Hydrochloric acid'
        }

      ],
      body: [
        {
          formula: {
            value: 'KOH'
          },
          mw: {
            value: 56.106
          },
          equiv: {
            value: 1
          },
          mass: {
            value: 5.00,
            units: ['mg', 'g', 'kg']
          },
          volume: {
            value: 6
          },
          purity: {
            value: 100
          },
          quantifier: {
            value: 0.25,
            units: ['g/mL', 'g/L', 'kg/L']
          },
          n: {
            value: 19.213,
            units: ['mol', 'mmol']
          },
          comment: {
            value: ''
          }
        },
        {
          formula: {
            value: 'HCl'
          },
          mw: {
            value: 36.461
          },
          equiv: {
            value: 1
          },
          mass: {
            value: 3.249,
            units: ['mg', 'g', 'kg']
          },
          volume: {
            value: 4
          },
          purity: {
            value: 100
          },
          quantifier: {
            value: 0.25,
            units: ['g/mL', 'g/L', 'kg/L']
          },
          n: {
            value: 19.213,
            units: ['mol', 'mmol']
          },
          comment: {
            value: 'This is a long-long-long comment'
          }
        }
      ]
    };

    $scope.agentRows = {
      sticky: [
        {
          value: 'Potassium hydroxide'
        }

      ],
      body: [
        {
          formula: {
            value: 'KOH'
          },
          mw: {
            value: 56.106
          },
          equiv: {
            value: 1
          },
          mass: {
            value: 5.00,
            units: ['mg', 'g', 'kg']
          },
          volume: {
            value: 6
          },
          purity: {
            value: 100
          },
          quantifier: {
            value: 0.25,
            units: ['g/mL', 'g/L', 'kg/L']
          },
          n: {
            value: 19.213,
            units: ['mol', 'mmol']
          },
          comment: {
            value: ''
          }
        }
      ]
    };

    $scope.productRows = {
        sticky: [{
          value: 'Very long name of the product, very-very looong'
        }],
        body: [{
          formula: {
            value: 'HF'
          },
          massExp: {
            value: 25,
            units: ['mg', 'g', 'kg']
          },
          massAct: {
            value: 4.6,
            units: ['mg', 'g', 'kg']
          },
          purity: {
            value: 86
          },
          nExp: {
            value: 1.2,
            units: ['mol', 'mmol']
          },
          nAct: {
            value: 1.1,
            units: ['mol', 'mmol']
          },
          yield: {
            value: 12
          }
        }]
      };

    // $scope.bodyRows = [
    //   {
    //     formula: {
    //       value: 'KOH'
    //     },
    //     mw: {
    //       value: 56.106
    //     },
    //     equiv: {
    //       value: 1
    //     },
    //     mass: {
    //       value: 5.00,
    //       units: ['mg', 'g', 'kg']
    //     },
    //     volume: {
    //       value: 6
    //     },
    //     purity: {
    //       value: 100
    //     },
    //     quantifier: {
    //       value: 0.25,
    //       units: ['g/mL', 'g/L', 'kg/L']
    //     },
    //     n: {
    //       value: 19.213,
    //       units: ['mol', 'mmol']
    //     },
    //     comment: {
    //       value: ''
    //     }
    //   },
    //   {
    //     formula: {
    //       value: 'HCl'
    //     },
    //     mw: {
    //       value: 36.461
    //     },
    //     equiv: {
    //       value: 1
    //     },
    //     mass: {
    //       value: 3.249,
    //       units: ['mg', 'g', 'kg']
    //     },
    //     volume: {
    //       value: 4
    //     },
    //     purity: {
    //       value: 100
    //     },
    //     quantifier: {
    //       value: 0.25,
    //       units: ['g/mL', 'g/L', 'kg/L']
    //     },
    //     n: {
    //       value: 19.213,
    //       units: ['mol', 'mmol']
    //     },
    //     comment: {
    //       value: 'This is a long-long-long comment'
    //     }
    //   }
    // ];

    var reactantRowsPlaceholder = {
      newStickyRow: {
        value: ''
      },
      newBodyRow: {
        formula: {
          value: ''
        },
        mw: {
          value: null
        },
        equiv: {
          value: null
        },
        mass: {
          value: null,
          units: ['mg', 'g', 'kg']
        },
        volume: {
          value: null
        },
        purity: {
          value: null
        },
        quantifier: {
          value: null,
          units: ['g/mL', 'g/L', 'kg/L']
        },
        n: {
          value: null,
          units: ['mol', 'mmol']
        },
        comment: {
          value: ''
        }
      }
    };

    $scope.addNew = function (arr, type) {
      var reactantRowsPlaceholder = {
        newStickyRow: {
          value: ''
        },
        newBodyRow: {
          formula: {
            value: ''
          },
          mw: {
            value: null
          },
          equiv: {
            value: null
          },
          mass: {
            value: null,
            units: ['mg', 'g', 'kg']
          },
          volume: {
            value: null
          },
          purity: {
            value: null
          },
          quantifier: {
            value: null,
            units: ['g/mL', 'g/L', 'kg/L']
          },
          n: {
            value: null,
            units: ['mol', 'mmol']
          },
          comment: {
            value: ''
          }
        }
      };

      var agentRowsPlaceholder = {
        newStickyRow: {
          value: ''
        },
        newBodyRow: {
          formula: {
            value: ''
          },
          massExp: {
            value: null,
            units: ['mg', 'g', 'kg']
          },
          massAct: {
            value: null,
            units: ['mg', 'g', 'kg']
          },
          purity: {
            value: null
          },
          nExp: {
            value: null,
            units: ['mol', 'mmol']
          },
          nAct: {
            value: null,
            units: ['mol', 'mmol']
          },
          Yield: {
            value: null
          }
        }
      };
      if (type === 'reactant') {
        arr.sticky.push(reactantRowsPlaceholder.newStickyRow);
        arr.body.push(reactantRowsPlaceholder.newBodyRow);
      } else if (type === 'agent') {
        arr.sticky.push(agentRowsPlaceholder.newStickyRow);
        arr.body.push(agentRowsPlaceholder.newBodyRow);
      }
    };

  }

  function InlineEditingDirective() {
    return {
      restrict: "E",
      scope: {
        componentData: '='
      },
      controllerAs: "vm",
      controller: "InlineEditingController",
      templateUrl: "directives/inlineEditing.html"
    };
  }

  InlineEditingController.$inject = ['$scope'];

  function InlineEditingController($scope) {
    var vm = this,
        editableElementWrapper;

    angular.extend(vm, {
      setUnit: setUnit,
      setBehavior: setBehavior,
      toggled: toggled,
      toggleDropdown: toggleDropdown,
      unit: $scope.componentData.units ? $scope.componentData.units[0] : undefined,
      status: {
        isopen: false
      }
    });

    function setUnit(choice) {
      vm.unit = choice;
    }

    function setBehavior(form) {
      var editableElement = form.$editables[0].inputEl[0];
      editableElement.selectionStart = editableElement.selectionStop = editableElement.value.length;


      editableElementWrapper = form.$editables[0].inputEl;
      editableElementWrapper
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
    }

    function toggled(open) {
    }

    function toggleDropdown($event) {
      $event.preventDefault();
      $event.stopPropagation();
      $scope.status.isopen = !$scope.status.isopen;
    }

  }
})(window.angular);