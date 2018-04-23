angular.module('protoTable')
    .controller('mainController', MainController);

MainController.$inject = ['$scope'];

function MainController($scope) {

    $scope.reactantRows = {
        metaInfo: {
            name: 'reactants',
            prefix: 'R',
            type: 'reactantType'
        },
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
                    name: 'Formula',
                    value: 'KOH'
                },
                mw: {
                    name: 'MW',
                    nameAdditions: {
                        units: 'g/mol'
                    },
                    value: 56.106,
                    style: {
                        classes: ['text-right']
                    }
                },
                equiv: {
                    name: 'Equiv',
                    nameAdditions: {
                        icon: 'lock_closed'
                    },
                    value: 1,
                    style: {
                        classes: ['text-right']
                    }
                },
                mass: {
                    name: 'Mass',
                    value: 5.00,
                    units: ['mg', 'g', 'kg'],
                    style: {
                        classes: ['text-right']
                    }
                },
                volume: {
                    name: 'Volume',
                    value: 6,
                    style: {
                        classes: ['text-right']
                    }
                },
                purity: {
                    name: 'Purity',
                    nameAdditions: {
                        units: '%'
                    },
                    value: 100,
                    style: {
                        classes: ['text-right']
                    }
                },
                quantifier: {
                    name: 'Quantifier',
                    value: 0.25,
                    units: ['g/mL', 'g/L', 'kg/L'],
                    style: {
                        classes: ['text-right']
                    }
                },
                n: {
                    name: 'n',
                    value: 19.213,
                    units: ['mol', 'mmol'],
                    style: {
                        classes: ['text-right']
                    }
                },
                comment: {
                    name: 'Comment',
                    value: ''
                }
            },
            {
                formula: {
                    value: 'HCl'
                },
                mw: {
                    value: 36.461,
                    style: {
                        classes: ['text-right']
                    }
                },
                equiv: {
                    value: 1,
                    style: {
                        classes: ['text-right']
                    }
                },
                mass: {
                    value: 3.249,
                    units: ['mg', 'g', 'kg'],
                    style: {
                        classes: ['text-right']
                    }
                },
                volume: {
                    value: 4,
                    style: {
                        classes: ['text-right']
                    }
                },
                purity: {
                    value: 100,
                    style: {
                        classes: ['text-right']
                    }
                },
                quantifier: {
                    value: 0.25,
                    units: ['g/mL', 'g/L', 'kg/L'],
                    style: {
                        classes: ['text-right']
                    }
                },
                n: {
                    value: 19.213,
                    units: ['mol', 'mmol'],
                    style: {
                        classes: ['text-right']
                    }
                },
                comment: {
                    value: 'This is a long-long-long comment'
                }
            }
        ]
    };

    $scope.agentRows = {
        metaInfo: {
            name: 'agents',
            prefix: 'A',
            type: 'reactantType'
        },
        sticky: [
            {
                value: 'Potassium hydroxide'
            }

        ],
        body: [
            {
                formula: {
                    name: 'Formula',
                    value: 'KOH'
                },
                mw: {
                    name: 'MW',
                    nameAdditions: {
                        units: 'g/mol'
                    },
                    value: 56.106,
                    style: {
                        classes: ['text-right']
                    }
                },
                equiv: {
                    name: 'Equiv',
                    nameAdditions: {
                        icon: 'lock_closed'
                    },
                    style: {
                        classes: ['text-right']
                    },
                    value: 1
                },
                mass: {
                    name: 'Mass',
                    style: {
                        classes: ['text-right']
                    },
                    value: 5.00,
                    units: ['mg', 'g', 'kg']
                },
                volume: {
                    name: 'Volume',
                    style: {
                        classes: ['text-right']
                    },
                    value: 6
                },
                purity: {
                    name: 'Purity',
                    nameAdditions: {
                        units: '%'
                    },
                    style: {
                        classes: ['text-right']
                    },
                    value: 100
                },
                quantifier: {
                    name: 'Quantifier',
                    style: {
                        classes: ['text-right']
                    },
                    value: 0.25,
                    units: ['g/mL', 'g/L', 'kg/L']
                },
                n: {
                    name: 'n',
                    style: {
                        classes: ['text-right']
                    },
                    value: 19.213,
                    units: ['mol', 'mmol']
                },
                comment: {
                    name: 'Comment',
                    value: ''
                }
            }
        ]
    };

    $scope.productRows = {
        metaInfo: {
            name: 'products',
            prefix: 'P',
            type: 'productType'
        },
        sticky: [{
            value: 'Very long name of the product, very-very looong'
        }],
        body: [{
            formula: {
                name: 'Formula',
                value: 'HF'
            },
            massExp: {
                name: 'Mass',
                nameAdditions: {
                    remark: 'expected'
                },
                style: {
                    classes: ['text-right']
                },
                value: 25,
                units: ['mg', 'g', 'kg']
            },
            massAct: {
                name: 'Mass',
                nameAdditions: {
                    remark: 'actual'
                },
                style: {
                    classes: ['text-right']
                },
                value: 4.6,
                units: ['mg', 'g', 'kg']
            },
            purity: {
                name: 'Purity',
                nameAdditions: {
                    units: '%'
                },
                style: {
                    classes: ['text-right']
                },
                value: 86
            },
            nExp: {
                name: 'n',
                nameAdditions: {
                    remark: 'expected'
                },
                style: {
                    classes: ['text-right']
                },
                value: 1.2,
                units: ['mol', 'mmol']
            },
            nAct: {
                name: 'n',
                nameAdditions: {
                    remark: 'actual'
                },
                style: {
                    classes: ['text-right']
                },
                value: 1.1,
                units: ['mol', 'mmol']
            },
            yieldAct: {
                name: 'Yield %',
                nameAdditions: {
                    remark: 'actual'
                },
                style: {
                    classes: ['text-right']
                },
                value: 67.8
            }
        }]
    };

}

// (function () {
//   'use strict';
//
//   angular 1
//       .module('app', ['inlineEditing', 'stoichSection'])
//       .controller('appController', appController);
//
//   appController.$inject = ['$scope'];
//
//   function appController($scope) {
//     $scope.reactantRows = {
//       metaInfo: {
//         name: 'reactant',
//         prefix: 'R',
//         type: 'reactantType' //need to
//       },
//       sticky: [
//         {
//           value: 'Potassium hydroxide'
//         },
//         {
//           value: 'Hydrochloric acid'
//         }
//       ],
//       body: [
//         {
//           formula: {
//             value: 'KOH'
//           },
//           mw: {
//             value: 56.106,
//             headUnits: 'g/mol',
//             style: {
//               headClasses: ['text-uppercase'],
//               classes: ['text-right']
//             }
//           },
//           equiv: {
//             value: 1,
//             style: {
//               classes: ['text-right']
//             }
//           },
//           mass: {
//             value: 5.00,
//             units: ['mg', 'g', 'kg'],
//             style: {
//               classes: ['text-right']
//             }
//           },
//           volume: {
//             value: 6,
//             style: {
//               classes: ['text-right']
//             }
//           },
//           purity: {
//             value: 100,
//             style: {
//               classes: ['text-right']
//             }
//           },
//           quantifier: {
//             value: 0.25,
//             units: ['g/mL', 'g/L', 'kg/L'],
//             style: {
//               classes: ['text-right']
//             }
//           },
//           n: {
//             value: 19.213,
//             units: ['mol', 'mmol'],
//             style: {
//               headClasses: ['text-lowercase'],
//               classes: ['text-right']
//             }
//           },
//           comment: {
//             value: ''
//           }
//         },
//         {
//           formula: {
//             value: 'HCl'
//           },
//           mw: {
//             value: 36.461,
//             style: {
//               classes: ['text-right']
//             }
//           },
//           equiv: {
//             value: 1,
//             style: {
//               classes: ['text-right']
//             }
//           },
//           mass: {
//             value: 3.249,
//             units: ['mg', 'g', 'kg'],
//             style: {
//               classes: ['text-right']
//             }
//           },
//           volume: {
//             value: 4,
//             style: {
//               classes: ['text-right']
//             }
//           },
//           purity: {
//             value: 100,
//             style: {
//               classes: ['text-right']
//             }
//           },
//           quantifier: {
//             value: 0.25,
//             units: ['g/mL', 'g/L', 'kg/L'],
//             style: {
//               classes: ['text-right']
//             }
//           },
//           n: {
//             value: 19.213,
//             units: ['mol', 'mmol'],
//             style: {
//               classes: ['text-right']
//             }
//           },
//           comment: {
//             value: 'This is a long-long-long comment'
//           }
//         }
//       ]
//     };
//
//     $scope.agentRows = {
//       sticky: [
//         {
//           value: 'Potassium hydroxide'
//         }
//
//       ],
//       body: [
//         {
//           formula: {
//             value: 'KOH'
//           },
//           mw: {
//             value: 56.106
//           },
//           equiv: {
//             value: 1
//           },
//           mass: {
//             value: 5.00,
//             units: ['mg', 'g', 'kg']
//           },
//           volume: {
//             value: 6
//           },
//           purity: {
//             value: 100
//           },
//           quantifier: {
//             value: 0.25,
//             units: ['g/mL', 'g/L', 'kg/L']
//           },
//           n: {
//             value: 19.213,
//             units: ['mol', 'mmol']
//           },
//           comment: {
//             value: ''
//           }
//         }
//       ]
//     };
//
//     $scope.productRows = {
//       sticky: [{
//         value: 'Very long name of the product, very-very looong'
//       }],
//       body: [{
//         formula: {
//           value: 'HF'
//         },
//         massExp: {
//           value: 25,
//           units: ['mg', 'g', 'kg']
//         },
//         massAct: {
//           value: 4.6,
//           units: ['mg', 'g', 'kg']
//         },
//         purity: {
//           value: 86
//         },
//         nExp: {
//           value: 1.2,
//           units: ['mol', 'mmol']
//         },
//         nAct: {
//           value: 1.1,
//           units: ['mol', 'mmol']
//         },
//         yield: {
//           value: 12
//         }
//       }]
//     };
//   }
//
// })();
