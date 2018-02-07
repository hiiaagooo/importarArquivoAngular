'use strict';

function ImportacaoMetasController($scope, $state,
                                    ImportacaoMetasService,
                                    ImportacaoMetasModel, csMessageService, MessageConstants) {
    var vm = this;
    vm.model = ImportacaoMetasModel;
    vm.arquivoImportado = false;


    // Tipo de importação
    function tipoImportacao () {

        ImportacaoMetasService
            .obterTiposMeta()
            .then(function (res) {
                vm.model.filtros.tipoSituacaoImportacaoMeta = res;
                vm.model.dadoSelecionado.tipoSelecionado = vm.model.filtros.tipoSituacaoImportacaoMeta[2];
            });
    };

    // Ano da importação
    function anoImportacao () {

        ImportacaoMetasService
            .obterAnosReferencia()
            .then(function (res) {
                vm.model.filtros.anoReferencia = res;
                vm.model.dadoSelecionado.anoSelecionado = vm.model.filtros.anoReferencia[1];
            });
    };
    
    // Obter carga após o Upload
    function obterCargaMetaAgencia () {

        ImportacaoMetasService
            .obterCargaMetaAgencia()
            .then(function (res) {
                vm.model.listaArquivos = res;
            });
    };


    // Input File
    vm.importarArquivo = function () {

        if (vm.model.filtros.anoReferencia != undefined && vm.model.filtros.tipoSituacaoImportacaoMeta != undefined) {

            vm.dadosImportacao = {
                ano: vm.model.dadoSelecionado.anoSelecionado,
                tipoArquivoMeta: vm.model.dadoSelecionado.tipoSelecionado,
            };

            var file = vm.file;
            var formData = new FormData();
            var json = vm.dadosImportacao;
            formData.append("file", vm.file);
            formData.append("properties",new Blob([JSON.stringify(json)], {type: "application/json"}));

            if (file !== undefined && file !== null) {

                ImportacaoMetasService

                    .importarArquivoMeta(formData)
                    .then(function () {
                        csMessageService.setMessage(MessageConstants.IMPORTACAO_SUCESSO, csMessageService.INFO);

                        // Limpar lista e carregar novamente com o dado atualizado.
                        vm.model.listaArquivos = [];
                        init();
                    })
            } else {
                        csMessageService.setMessage(MessageConstants.ARQUIVO_ERRO, csMessageService.ERROR);
            }

        } else {
            csMessageService.setMessage("Selecione um tipo de importação e o ano referente", 1);
        }
    };

    function init() {
        tipoImportacao();
        anoImportacao();
        obterCargaMetaAgencia();
    };

    init();

}

ImportacaoMetasController.$inject = ['$scope', '$state',
    'ImportacaoMetasService', 'ImportacaoMetasModel',
    'csMessageService', 'MessageConstants'];


export default ImportacaoMetasController;

