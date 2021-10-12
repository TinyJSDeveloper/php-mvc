/**
 * @class Template
 * @description
 * Classe utilitária para obter os templates presentes na página. Como nada
 * aqui é necessariamente uma regra, a classe pode ser livremente alterada para
 * obter os elementos <template> do jeito mais conveniente possível.
 */
class Template {
  /** Lista de templates disponíveis para uso. */
  static items = {};

  /** Template padrão que é retornado no lugar de um inexistente. */
  static default = document.createElement("template");

  /**
   * Define um conteúdo para o template padrão.
   *
   * @param {String} content Conteúdo.
   *
   * @return {Template} Tail call.
   */
  static fallback(content) {
    Template.default.innerHTML = content;
    return Template;
  }

  /**
   * Busca por todos os elementos <template> da página e os salva em um lugar
   * acessível (ver `Template.items`).
   *
   * @return {boolean}
   */
  static fetch() {
    // Obter todos os elementos <template> disponíveis na página:
    let templates = document.getElementsByTagName("template");

    // Percorrer elementos encontrados...
    for(let item of templates) {
      let id = item.dataset.templateId || "";

      // Salvar elementos válidos...
      if(id.trim().length > 0) {
        if(Template.items[id] == null) {
          Template.items[id] = item;
        }
        // Ignorar e alertar elementos <template> com ID duplicada:
        else {
          console.warn(`Found duplicate of template "${id}".`);
        }
      }
      // Ignorar e alertar elementos <template> sem ID:
      else {
        console.warn("Found template without \"data-template-id\" dataset.");
      }
    }

    // O resultado da operação depende da quantidade de elementos encontrados:
    return (Object.keys(Template.items).length > 0);
  }

  /**
   * Obtém um elemento <template> através de sua ID. Caso não seja encontrado,
   * um template padrão será retornado em seu lugar.
   *
   * @param {string} id ID do elemento <template>.
   *
   * @return {HTMLTemplateElement}
   */
  static get(id) {
    // Retornar template (se existir)...
    if(Template.items[id] != null) {
      return Template.items[id];
    }

    // ...ou retornar o padrão (quando a ID não for encontrada):
    else {
      return Template.default;
    }
  }
}
