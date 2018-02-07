'use strict';

import homeView from './views/importacaoMetasUpload.html';
import layoutTemplate from '../../assets/templates/layoutAdm.html';

function ImportacaoMetasRoutes($urlRouterProvider, $stateProvider, $breadcrumbProvider) {
    $urlRouterProvider.otherwise('/');

    $breadcrumbProvider.setOptions({
        prefixStateName: 'home',
        includeAbstract: true
    });


    $stateProvider
        .state('importacao-metas', {
            url: '/importacao-metas',
            templateUrl: layoutTemplate,
            abstract: true,
            reloadOnSearch: false,
            ncyBreadcrumb: {
                label: 'Importação'
            },
            resolve: {
                //Lazy loading do modulo
                loadModule: ($q, $ocLazyLoad) => {
                    return $q((resolve) => {
                        require.ensure([], () => {
                            let module = require('./importacaoMetas.module').default;
                            $ocLazyLoad.load({
                                name: module.name
                            });
                            resolve(module.name);
                        });
                    });
                }
            }
        })
        .state('importacao-metas.upload', {
            url: '/upload',
            templateUrl: homeView,
            parent: 'importacao-metas',
            controller: 'ImportacaoMetasController as vm',
            ncyBreadcrumb: {
                label: 'Upload'
            },
            onEnter: ['ImportacaoMetasModel', function (ImportacaoMetasModel) {
                ImportacaoMetasModel.reset();
            }],
            resolve: {
                user: function (grant) {
                    return grant.only([{
                            test: 'isAuthenticated',
                            state: 'auth.login'
                        },
                        {
                            test: 'isNotLocked',
                            state: 'auth.lock'
                        },
                    ]);
                }
            }
        })
        // .state('parametro-sistema.voltar', {
        //     url: '/',
        //     templateUrl: homeView,
        //     parent: 'parametro-sistema',
        //     controller: 'ParametroSistemaController as vm',
        //     ncyBreadcrumb: {
        //         label: 'Pesquisar'
        //     },
        //     resolve: {
        //         user: function (grant) {
        //             return grant.only([{
        //                     test: 'isAuthenticated',
        //                     state: 'auth.login'
        //                 },
        //                 {
        //                     test: 'isNotLocked',
        //                     state: 'auth.lock'
        //                 },
        //             ]);
        //         }
        //     }
        // })
        // .state('parametro-sistema.cadastrar', {
        //     url: '/cadastrar',
        //     templateUrl: editarView,
        //     parent: 'parametro-sistema',
        //     controller: 'ParametroSistemaController as vm',
        //     ncyBreadcrumb: {
        //         label: 'Cadastrar',
        //     },
        //     resolve: {
        //         user: function (grant) {
        //             return grant.only([{
        //                     test: 'isAuthenticated',
        //                     state: 'auth.login'
        //                 },
        //                 {
        //                     test: 'isNotLocked',
        //                     state: 'auth.lock'
        //                 },
        //             ]);
        //         }
        //     }
        // })
        // .state('parametro-sistema.editar', {
        //     url: '/editar/{id}',
        //     templateUrl: editarView,
        //     parent: 'parametro-sistema',
        //     controller: 'ParametroSistemaController as vm',
        //     ncyBreadcrumb: {
        //         label: 'Editar'
        //     },
        //     resolve: {
        //         user: function (grant) {
        //             return grant.only([{
        //                     test: 'isAuthenticated',
        //                     state: 'auth.login'
        //                 },
        //                 {
        //                     test: 'isNotLocked',
        //                     state: 'auth.lock'
        //                 },
        //             ]);
        //         }
        //     }
        // });
}

ImportacaoMetasRoutes.$inject = ['$urlRouterProvider', '$stateProvider', '$breadcrumbProvider'];

export default angular
    .module('importacaoMetas.routes', [])
    .config(ImportacaoMetasRoutes);