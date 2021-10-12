/**
 * @component {{views.selectAll.componentName}}
 *
 * @param {Object} options Parâmetros de configuração.
 */
Component.add("{{views.selectAll.componentName}}", (options = {}) => { let $c = {
/// <component>

/** Template deste componente. */
template: Template.get("{{views.selectAll.templateName}}"),

/**
 * @return {Object} Dados do componente.
 */
data() {
  let $this = this;
  let $data = {
    // Controlador(res) de referência para consultas no servidor.
    "controller": {
      "default": new {{controller.className}}($this, false)
    },

    // Parâmetros de configuração de exibição.
    "options": {
      "readOnly": options.readOnly != null? options.readOnly: false
    },

    // Controle de carregamento da página.
    "progress": {
      "loaded": false
    },

    // Dados contidos nos campos de exibição.
    "data": {
      "default": []
    },

    // Elementos de exibição.
    "el": {
      "default": {}
    }
  };

  return $data;
},

/**
 * @event created
 *
 * Evento acionado quando depois que o componente é criado.
 */
created() {
  let $this = this;
  $this.controller.default.selectAll($this.onSelectAll);
},

methods: {
  /**
   * Evento acionado quando o servidor retorna a requisição de todos os itens
   * para exibição.
   *
   * @param {string} response Conteúdo de resposta do servidor.
   * @param {number} status Status de resposta do servidor.
   * @param {boolean} isJSON Útil para checar se a resposta foi em JSON ou um HTML de erro 500.
   */
  onSelectAll(response, status, isJSON) {
    let $this = this;

    if(response.status === "success") {
      $this.data.default = response.data;
      $this.onReady();
    }
    else {
      Toast.error(response.message);
    }
  },

  /**
   * Evento de pós-inicialização deste componente.
   */
  onReady() {
    let $this = this;
    $this.progress.loaded = true;
  }
}

/// </component>
}; return $c; });
