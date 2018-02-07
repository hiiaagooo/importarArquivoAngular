'use strict';
function ImportacaoMetasModel() {

    var vm = this;


    // indica se a pesquisa foi realizada
    vm.importacaoRealizada = false;

    // armazena a lista de dados após o Upload de arquivos.
    vm.listaArquivos = [];

    // indica que o backend trouxe a lista de tipos de metas
    vm.dadoSelecionado = {
        anoSelecionado: "",
        tipoSelecionado: "",
        };

    // armazena o valor pesquisado pelo usuário - tela 1
    vm.filtros = {
        tipoSituacaoImportacaoMeta: "",
        anoReferencia: "",
        };

    // valida os campos obrigatorios
    vm.validator = false;

    // reset os valores da pagina ao ser acessado pelo menu principal
    vm.reset = function(){
        vm.listaArquivos = [];
        vm.filtros = {
            anoReferencia: "",
            tipoSituacaoImportacaoMeta: "",
        };
    }
}

ImportacaoMetasModel.$inject = [];

export default angular.module('ImportacaoMetasModel', [
]).service('ImportacaoMetasModel', ImportacaoMetasModel);
