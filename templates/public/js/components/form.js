/**
 * @component {{views.form.componentName}}
 *
 * @param {Object} options Parâmetros de configuração.
 */
Component.add("{{views.form.componentName}}", (options = {}) => { let $c = {
/// <component>

/** Template deste componente. */
template: Template.get("{{views.form.templateName}}"),

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

    // Parâmetros de configuração do formulário. Usado para alternar entre
    // criar/editar dados, e para permitir/bloquear sua edição.
    "options": {
      "new": options.new != null? options.new: true,
      "id": $this.$route.params.id,
      "readOnly": options.readOnly != null? options.readOnly: false,
      "allowDelete": options.allowDelete != null? options.allowDelete: true
    },

    // Controle de carregamento da página.
    "progress": {
      "loaded": false
    },

    // Dados contidos nos campos do formulário.
    "data": {
      "default": {
        {{#each fields}}
        "{{this.name.default}}": ""{{#unless @last}}, {{/unless}}
        {{/each}}
      }
    },

    // Elementos do formulário. Geralmente usados para status de erro.
    "el": {
      "default": {
        {{#each fields}}
        "{{this.name.default}}": {
          "status": "success",
          "message": ""
        }{{#unless @last}}, {{/unless}}
        {{/each}}
      },

      // Botão de envio.
      "submit": {
        "disabled": false
      }
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

  if($this.options.new) {
    $this.onReady();
  }
  else {
    $this.controller.default.find($this.options.id, $this.onFind);
  }
},

methods: {
  /**
   * Exporta os dados do formulário para um objeto (JSON).
   *
   * @param {boolean} convert Auto-converter item em modelo.
   *
   * @return {Object, {{model.className~}} }
   */
  export(convert = false) {
    let $this = this;

    let data = {
      "{{database.id.name.default}}": $this.options.id,
      {{#each fields}}
      "{{this.name.default}}": $this.data.default.{{this.name.default}}{{#unless @last}},{{/unless}}
      {{/each}}
    };

    if(convert) {
      return {{model.className}}.from(data);
    }

    return data;
  },

  /**
   * Define os erros de campos inválidos do formulário.
   *
   * @param {Object} fields Campos inválidos do formulário.
   */
  setInvalidFields(fields) {
    let $this = this;
    $this.el.default = {
      {{#each fields}}
      "{{this.name.default}}": fields.{{this.name.default}} || {
        "status": "success",
        "message": ""
      }{{#unless @last}}, {{/unless}}
      {{/each}}
    };
  },

  /**
   * Limpa os erros de campos inválidos do formulário.
   */
  clearInvalidFields() {
    let $this = this;
    $this.el.default = {
      {{#each fields}}
      "{{this.name.default}}": {
        "status": "success",
        "message": ""
      }{{#unless @last}}, {{/unless}}
      {{/each}}
    };
  },

  /**
   * Evento acionado quando o servidor retorna a requisição de ID do item, caso
   * o formulário esteja em modo de edição.
   *
   * @param {string} response Conteúdo de resposta do servidor.
   * @param {number} status Status de resposta do servidor.
   * @param {boolean} isJSON Útil para checar se a resposta foi em JSON ou um HTML de erro 500.
   */
  onFind(response, status, isJSON) {
    let $this = this;

    if(response.status === "success") {
      $this.data.default = response.data;
      $this.onReady();
    }
    else {
      Toast.error(response.message);
      $this.$router.back();
    }
  },

  /**
   * Evento acionado quando o servidor retorna uma resposta ao tentar adicionar
   * um item.
   *
   * @param {string} response Conteúdo de resposta do servidor.
   * @param {number} status Status de resposta do servidor.
   * @param {boolean} isJSON Útil para checar se a resposta foi em JSON ou um HTML de erro 500.
   */
  onPut(response, status, isJSON) {
    let $this = this;
    $this.el.submit.disabled = false;

    if(response.status === "success") {
      $this.clearInvalidFields();
      Toast.success(response.message);
    }
    else {
      $this.setInvalidFields(response.data);
      Toast.error(response.message);
    }
  },

  /**
   * Evento acionado quando o servidor retorna uma resposta ao tentar modificar
   * um item.
   *
   * @param {string} response Conteúdo de resposta do servidor.
   * @param {number} status Status de resposta do servidor.
   * @param {boolean} isJSON Útil para checar se a resposta foi em JSON ou um HTML de erro 500.
   */
  onPatch(response, status, isJSON) {
    let $this = this;
    $this.el.submit.disabled = false;

    if(response.status === "success") {
      $this.clearInvalidFields();
      Toast.success(response.message);
    }
    else {
      $this.setInvalidFields(response.data);
      Toast.error(response.message);
    }
  },

  /**
   * Evento de pós-inicialização deste componente.
   */
  onReady() {
    let $this = this;
    $this.progress.loaded = true;
  },

  /**
   * Envia os dados do formulário para o servidor. Dependendo do modo do
   * formulário, o conteúdo poderá ser adicionado ou alterado.
   */
  submit() {
    let $this = this;
    $this.el.submit.disabled = true;

    if($this.options.new) {
      $this.controller.default.put($this.export(true), $this.onPut);
    }
    else {
      $this.controller.default.patch($this.export(true), $this.onPatch);
    }
  },
}

/// </component>
}; return $c; });
