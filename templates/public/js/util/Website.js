/**
 * @class Website
 *
 * @description
 * Funções utilitárias relacionadas à URL do site.
 */
class Website {
  /**
   * Obtém o endereço de URL deste site.
   *
   * @param {string} path Rota adicional.
   *
   * @return {string}
   */
  static URL(path) {
    return `${location.protocol}//${location.hostname}${path}`;
  }
}
