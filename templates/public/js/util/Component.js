/**
* @class Component
* @description
* Classe utilitária para gerenciar os componentes usados pela aplicação. Como nada
* aqui é necessariamente uma regra, a classe pode ser livremente alterada para
* gerenciar os objetos de componente do jeito mais conveniente possível.
 */
class Component {
  /** Lista de componentes disponíveis para uso. */
  static items = {};

  /** Componente padrão que é retornado no lugar de um inexistente. */
  static default = (options) => {
    // Estrutura do componente...
    let component = {
      /** Template deste componente. */
      template: `<em>Empty component not found.</em>`,

      /**
       * @return {Object} Dados do componente.
       */
      data() {
        return {};
      }
    };

    return component;
  };

  /**
   * Define um componente padrão.
   *
   * @param {String} content Conteúdo.
   *
   * @return {Template} Tail call.
   */
  static fallback(create) {
    Component.default = create;
    return Component;
  }

  /**
   * Adiciona um novo componente para criação.
   *
   * @param {number} id ID do componente.
   * @param {Function} create Função de criação. Uso: function(options) { ... }
   */
  static add(id, create) {
    if(Component.items[id] == null) {
      Component.items[id] = create;
    }
    // Ignorar e alertar componentes com ID duplicada:
    else {
      console.warn(`Found duplicate of component "${id}".`);
    }
  }

  /**
   * Cria um componente através de sua ID. Caso não seja encontrado, um
   * componente padrão será criado em seu lugar.
   *
   * @param {number} id ID do componente.
   * @param {Object} options Parâmetros adicionais do componente.
   *
   * @return {Object}
   */
  static create(id, options) {
    // Retornar componente (se existir)...
    if(Component.items[id] != null) {
      return Component.items[id](options);
    }
    // ...ou retornar o padrão (quando a ID não for encontrada):
    else {
      return Component.default(options);
    }
  }
}
