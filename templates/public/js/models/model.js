/**
 * @class {{model.className}}
 *
 * @description
 * {{model.description}}
 */
class {{model.className}} {
  /**
   * @constructor
   *
   * @param {number} id {{database.description}}
{{#each fields}}   * @param { {{~this.JSDocParam~}} } {{this.name.camelCase}} {{this.description}}
{{/each}}
   */
  constructor(id, {{#each fields}}{{this.name.camelCase}}{{#unless @last}}, {{/unless}}{{/each}}) {
    /** @private {{database.id.description}} */
    this._id = null;
    {{#each fields}}

    /** @private {{this.description}} */
    this._{{this.name.camelCase}} = null;
    {{/each}}

    // Inserir dados do construtor através dos setters...
    this.id = id;
    {{#each fields}}
    this.{{this.name.camelCase}} = {{this.name.camelCase}};
    {{/each}}
  }

  /**
   * Cria um modelo a partir de um objeto de dados. Útil para quando se recebe
   * dados prontos do servidor.
   *
   * @param {Object} fields Campos.
   *
   * @return { {{~model.className~}} }
   */
  static from(fields = {}) {
    return new {{model.className}}(
      fields["{{database.id.name.default}}"] || null,
      {{#each fields}}
      fields["{{this.name.default}}"] || null{{#unless @last}},{{/unless}}
      {{/each}}
    );
  }

  /**
   * Exporta este item para um objeto (JSON).
   *
   * @return {Object}
   */
  export() {
    return {
      "id": this.id,
      {{#each fields}}
      "{{this.name.default}}": this.{{this.name.camelCase}}{{#unless @last}},{{/unless}}
      {{/each}}
    };
  }

  /**
   * @getter
   *
   * @return {number}
   */
  get id() {
    return this._id;
  }

  /**
   * @setter
   *
   * @param {number} id {{database.id.description}}
   */
  set id(id) {
    this._id = parseInt(id) || 0;
  }

  {{#each fields}}

  /**
   * @getter
   *
   * @return { {{~this.JSDocParam~}} } {{this.description}}
   */
  get {{this.name.camelCase}}() {
    return this._{{this.name.camelCase}};
  }

  /**
   * @setter
   *
   * @param { {{~this.JSDocParam~}} } {{this.name.camelCase}} {{this.description}}
   */
  set {{this.name.camelCase}}({{this.name.camelCase}}) {
    {{#if this.isString}}
    this._{{this.name.camelCase}} = ({{this.name.camelCase}} || "").toString();
    {{/if}}
    {{#unless this.isString}}
    {{#if this.isFloat}}
    this._{{this.name.camelCase}} = parseFloat({{this.name.camelCase}}) || 0.0;
    {{/if}}
    {{#unless this.isFloat}}
    this._{{this.name.camelCase}} = parseInt({{this.name.camelCase}}) || 0;
    {{/unless}}
    {{/unless}}
  }
  {{/each}}
}
