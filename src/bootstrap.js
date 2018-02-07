'use strict';

function Bootstrap($window, $rootScope, $sessionStorage, grant, $state, Idle, UserService, $http, ParametroSistemaService) {

    $rootScope.$state = $state;
    $rootScope.$env = process.env;
    $rootScope.$version = require('../version.json');
    $rootScope.$version.buildDate = new Date($rootScope.$version.buildDate);

    $rootScope.$on('$stateChangeStart', function (evt, to, toParams, from, fromParams) {
        $rootScope.user = $sessionStorage.user;
        if (!UserService.hasUserAuthenticated()) {
            UserService.setUser().then(function (res) {
                $sessionStorage.user = res.dados;
                if (!UserService.hasUserAuthenticated()) {
                    $window.open(process.env.URL_CAS + '?service=' + process.env.CAS_SERVICE, '_self');
                }
            }, function (error) {
                $window.open(process.env.URL_CAS + '?service=' + process.env.CAS_SERVICE, '_self');
            });

        }
    });


    /*  //Inicia o idle baseado na rota
     $rootScope.$on('$stateChangeSuccess', function () {
         if ($state.current.name.search('auth.') == -1 && !Idle.running())
             Idle.watch();
 
         if ($state.current.name.search('auth.') > -1 && Idle.running())
             Idle.unwatch();
 
         if ($state.current.name.search('auth.login') == -1) {
             $rootScope.user = AuthService.getUser();
         }
     });
 
     //Se acabar o tempo do idle, desloga
     $rootScope.$on('IdleTimeout', function () {
         AuthService.logout();
     });
 
     //Evento disparado quando o tempo do idle acaba, após ele vai se passar alguns segundos até dar timeout
     $rootScope.$on('IdleStart', function () {
     });
 
     //Evento que observa o tempo ativo da aplicação, aqui eu observo o tempo de sessão vindo junto ao token e
     //rediciono pro logout caso ele acabe (independente do idle)
     $rootScope.$on('Keepalive', function () {
         var now = moment();
         var expires = moment(AuthService.getToken().expires);
         if (now.isBetween(moment(AuthService.getToken().expires).subtract(2, 'minutes'), expires))
             AuthService.refreshToken();
 
         if (moment.duration(expires.diff(now)).asSeconds() < 0)
             AuthService.logout();
     });
 
     $rootScope.logout = AuthService.logout;
 
     //Inicia os grants
     AuthService.initGrant(); */
}


Bootstrap.$inject = ['$window', '$rootScope', '$sessionStorage', 'grant', '$state', 'Idle', 'UserService', '$http', 'ParametroSistemaService'];

export default angular
    .module(process.env.APP_NAME)
    .run(Bootstrap);