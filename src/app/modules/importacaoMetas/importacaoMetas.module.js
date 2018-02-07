'use strict';
import bootstrap from './importacaoMetas.run';

import ImportacaoMetasController from './importacaoMetas.controller';

import ImportacaoMetasModel from './importacaoMetas.model';

import ParamStorage from '../../util/paramStorage';

import MessageContants from './../../constants/message.constant'
import MessageDirective from '../../directives/csMessage/csMessage.module';
import ModalDirective from '../../directives/csModal/csModal.module';
import ValidarDirective from '../../directives/csValidar/csValidar.module';

import ImportacaoMetasService from '../../services/importacaoMetas.service';

/*
 * Start the module with dependencies
 * */
let module = angular.module('importacaoMetas', [
    ImportacaoMetasModel.name,

    ParamStorage.name,

    MessageContants.name,

    MessageDirective.name,
    ValidarDirective.name,
    ModalDirective.name,

    ImportacaoMetasService.name

]);

/*
 * Module bootstrap
 * */
module.run(bootstrap);

/*
 * Start the controllers
 * */
module.controller('ImportacaoMetasController', ImportacaoMetasController);

export default module;
