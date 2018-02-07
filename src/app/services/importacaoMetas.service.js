'use strict';

function ImportacaoMetasService(Restangular) {

    const service = Restangular.withConfig(function(configurer){
        configurer.setDefaultHeaders({'Content-Type': undefined});
        configurer.setBaseUrl(process.env.REST_BASE);
    }).service('private/importacao-meta');

    // File Input
    function importarArquivoMeta(object) {
        return service.one('importar-arquivo-meta').post(null, object);
    }

    //Obter carga após o input
    function obterCargaMetaAgencia() {
        return service.one('obter-carga-meta-agencia').getList();
    }

    // Tipo de Metas
    function obterTiposMeta() {
        return service.one('obter-tipos-meta').getList();
    }

    // Ano de Importacao
    function obterAnosReferencia() {
        return service.one('obter-anos-referencia').getList();
    }

    return {
        obterTiposMeta,
        obterAnosReferencia,
        importarArquivoMeta,
        obterCargaMetaAgencia
    };
}

ImportacaoMetasService.$inject = ['Restangular'];

export default angular.module('ImportacaoMetasService', [])
    .service('ImportacaoMetasService', ImportacaoMetasService);
