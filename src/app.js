'use strict';
import MessageConstants from './app/constants/message.constant';
/*
 * import the module route files
 * */
import DefaultRoute from './app/modules/default/default.routes';
import ParametroRoute from './app/modules/parametroSistema/parametroSistema.routes';
import ImportacaoMetasRoutes from './app/modules/importacaoMetas/importacaoMetas.routes';
import PaginadorRoute from './app/modules/paginador/paginador.routes';
import ModalRoute from './app/modules/modal/modal.routes';
import MascarasRoute from './app/modules/mascaras/mascaras.routes';
import MultiSelecaoRoute from './app/modules/multiSelecao/multiSelecao.routes';
import MensagensRoute from './app/modules/mensagens/mensagens.routes';
import ModalDialogRoute from './app/modules/modalDialog/modalDialog.routes';

import UserService from './app/services/user.service';
import ParametroService from './app/services/parametroSistema.service';
import ImportacaoMetasService from './app/services/importacaoMetas.service';


import CsMenuDirective from './app/directives/cs-menu/cs-menu.module';
import CsUsuarioInfoDirective from './app/directives/cs-usuario-info/cs-usuario-info.module'
import CsMessageDirective from './app/directives/csMessage/csMessage.module';
import CsDialogDirective from './app/directives/csDialog/csDialog.module';
import CsModalDirective from './app/directives/csModal/csModal.module';
import CsMaskCpfCnpjDirective from './app/directives/csMaskCpfCnpj/csMaskCpfCnpj.module';
import CsPaginatorNgTableDirective from './app/directives/csPaginatorNgTable/csPaginatorNgTable.module';
import CsMultiSelectDirective from './app/directives/csMultiSelect/csMultiSelect.module';
import CsOnlyNumsDirective from './app/directives/csOnlyNums/csOnlyNums.module';
import CsFuncionarioInfoDirective from './app/directives/csFuncionarioInfo/csFuncionarioInfo.module';

angular
    .module(process.env.APP_NAME, [
        /*
         * required external dependencies
         */
        'ngAnimate',
        'ngMessages',
        'ui.router',
        'ui.router.grant',
        'pascalprecht.translate',
        'ui.bootstrap',
        'datatables',
        'oc.lazyLoad',
        'restangular',
        'oitozero.ngSweetAlert',
        'ngIdle',
        'moment-picker',
        'blockUI',
        'ui.utils.masks',
        'ui.mask',
        'ngFileSaver',
        'ngStorage',
        'ngTable',
        'ncy-angular-breadcrumb',
        'ngFileUpload',

        /*
         * App dependencies
         */
        // Constants
        MessageConstants.name,

        // Routes
        DefaultRoute.name,
        ParametroRoute.name,
        ImportacaoMetasRoutes.name,
        PaginadorRoute.name,
        ModalRoute.name,
        MascarasRoute.name,
        MultiSelecaoRoute.name,
        MensagensRoute.name,
        ModalDialogRoute.name,

        // Services
        UserService.name,
        ParametroService.name,
        ImportacaoMetasService.name,

        // Directives
        CsMessageDirective.name,
        CsDialogDirective.name,
        CsModalDirective.name,
        CsPaginatorNgTableDirective.name,
        CsMaskCpfCnpjDirective.name,
        CsMultiSelectDirective.name,
	CsMenuDirective.name,
        CsUsuarioInfoDirective.name,
        CsOnlyNumsDirective.name,
        CsFuncionarioInfoDirective.name
    ]);

