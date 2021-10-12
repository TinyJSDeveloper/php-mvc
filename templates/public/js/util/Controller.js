/**
 * @class Controller
 *
 * @description
 * Controlador de uso geral.
 */
class Controller {
  /**
   * @constructor
   *
   * @todo
   */
  constructor() {
    this.model = null;

    this.routes = {
      "selectAll": "/users", // Obter todos os itens.
      "base"     : "/user",  // URL base deste item.
      "put"      : "/put",   // Criação do item.
      "patch"    : "/patch", // Alteração do item.
      "delete"   : "/delete" // Exclusão do item.
    };
  }

  /**
   * @event onServerResponse
   * Evento acionado ao receber uma resposta do servidor.
   *
   * @param {string} response Conteúdo de resposta do servidor.
   * @param {number} status Status de resposta do servidor.
   * @param {Function} next Função de callback. Uso: `next(response: string, status: number, isJSON: boolean)`
   */
  onServerResponse(response, status, next) {
    // Indica se a resposta passada foi um JSON válido ou não:
    let isJSON = false;

    // Tentar converter a resposta em JSON...
    try {
      response = JSON.parse(response);
      isJSON   = true;

      // Converter dados para objetos de modelo (array de itens)...
      if(Array.isArray(response.data)) {
        for(let index in response.data) {
          response.data[index] = this.model.from(response.data);
        }
      }

      // Converter dados para objetos de modelo (item único)...
      else if(typeof response.data === "object") {
        response.data = this.model.from(response.data);
      }
    }

    // Caso não consiga, é provável que o conteúdo retornado seja HTML. Nesse
    // caso, é importante saber se isto se trata de um erro de servidor (500),
    // ou apenas um erro simples, como uma rota inexistente (404) que está
    // retornando uma página ao invés de um JSON.
    catch(exception) {
      response = {
        "status" : "error",
        "message": `Data received is not valid JSON. (HTTP ${status})`,
        "data"   : response
      };
    }

    // Avançar para a função de callback.
    next(response, status, isJSON);
  }

  /**
   * Requisita todos os item do servidor.
   *
   * @param {number} id ID do item.
   * @param {Function} next Função de callback. Uso: `next(response: string, status: number, isJSON: boolean)`
   */
  selectAll(next) {
    // Criar objeto de requisição (AJAX):
    let request = new Ajax(
      Ajax.method.GET,
      Website.URL(this.routes.selectAll)
    );

    // Enviar dados...
    request.send(
      null,
      (response, status) => {
        this.onServerResponse(response, status, next);
      }
    );

    return request;
  }

  /**
   * Busca um item do servidor através de sua ID.
   *
   * @param {number} id ID do item.
   * @param {Function} next Função de callback. Uso: `next(response: string, status: number, isJSON: boolean)`
   */
  find(id, next) {
    // Criar objeto de requisição (AJAX):
    let request = new Ajax(
      Ajax.method.GET,
      Website.URL(`${this.routes.find}/${id}`)
    );

    // Enviar dados...
    request.send(
      null,
      (response, status) => {
        this.onServerResponse(response, status, next);
      }
    );

    return request;
  }

  /**
   * Envia um item para ser adicionado no servidor.
   *
   * @param { {{~model.className~}} } record Item.
   * @param {Function} next Função de callback. Uso: `next(response: string, status: number, isJSON: boolean)`
   */
  put(record, next) {
    // Criar objeto de requisição (AJAX):
    let request = new Ajax(
      Ajax.method.PUT,
      Website.URL(`${this.routes.base}${this.routes.put}`)
    );

    // Enviar dados...
    request.send(
      record.export(),
      (response, status) => {
        this.onServerResponse(response, status, next);
      }
    );

    return request;
  }

  /**
   * Envia um item para ser alterado no servidor.
   *
   * @param { {{~model.className~}} } record Item.
   * @param {Function} next Função de callback. Uso: `next(response: string, status: number, isJSON: boolean)`
   */
  patch(record, next) {
    // Criar objeto de requisição (AJAX):
    let request = new Ajax(
      Ajax.method.PATCH,
      Website.URL(`${this.routes.base}/${record.id}${this.routes.patch}`)
    );

    // Enviar dados...
    request.send(
      record.export(),
      (response, status) => {
        this.onServerResponse(response, status, next);
      }
    );

    return request;
  }

  /**
   * Envia um item para ser alterado no servidor.
   *
   * @param { {{~model.className~}} } record Item.
   * @param {Function} next Função de callback. Uso: `next(response: string, status: number, isJSON: boolean)`
   */
  delete(record, next) {
    // Criar objeto de requisição (AJAX):
    let request = new Ajax(
      Ajax.method.DELETE,
      Website.URL(`${this.routes.base}/${record.id}${this.routes.delete}`)
    );

    // Enviar dados...
    request.send(
      record.export(),
      (response, status) => {
        this.onServerResponse(response, status, next);
      }
    );

    return request;
  }
}
