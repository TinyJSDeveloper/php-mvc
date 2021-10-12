/**
* @class Ajax
*
* @description
* Realiza requisições AJAX para páginas usando métodos GET, POST, e os demais
* usados para REST (PUT, PATCH e DELETE).
*/
class Ajax {
  /**
  * @constructor
  *
  * @param {string} method Métodos de envio: GET ou POST.
  * @param {string} url URL de envio.
  */
  constructor(method, url) {
    /** Objeto responsável pelas funções de AJAX. */
    this.xhr = new XMLHttpRequest();

    /** Método escolhido para esta requisição AJAX. */
    this.method = method || Ajax.method.GET;

    /** URL de envio. */
    this.url = url || "";

    // Abrir request:
    this.xhr.open(this.method, this.url, true);
  }

  /**
  * Ao enviar um conteúdo pelo método POST, caso este precise das chaves CSRF
  * (Cross-Site Request Forgery), você pode usar esta função para inserir
  * o header 'X-CSRF-TOKEN' e o parâmetro para ser enviado no conteúdo
  * automaticamente.
  *
  * @param {Object} content Conteúdo a ser enviado.
  *
  * @return Retorna o conteúdo original com os parâmetros especificados.
  */
  withCSRF(content) {
  	// Buscar e obter todo o conteúdo relacionado ao CSRF:
  	var csrfParam = Ajax.getCSRFParam();
  	var csrfToken = Ajax.getCSRFToken();

  	// Se ao menos o token for encontrado, o header 'X-CSRF-TOKEN' será
  	// inserido automaticamente. Se o parâmetro também tiver sido encontrado,
  	// o parâmetro também será adicionado no conteúdo de envio:
  	if(csrfToken != null) {
  		this.xhr.setRequestHeader("X-CSRF-TOKEN", csrfToken);

  		if(csrfParam != null) {
  			content[csrfParam] = csrfToken;
  		}
  	}

  	return content;
  }

  /**
  * Envia o request Ajax com as chaves CSRF (Cross-Site Request Forgery). Nesse
  * caso, o único tipo aceito é JSON.
  *
  * @param {Object} content Conteúdo a ser enviado (será convertido em string).
  * @param {Function} next Função de callback. Uso: next(response: string, status: number).
  */
  sendSecure(content, next) {
  	this.send(this.withCSRF(content), next);
  }

  /**
  * Envia o request Ajax. Nesse caso, o único tipo aceito é JSON.
  *
  * @param {Object} content Conteúdo a ser enviado (será convertido em string).
  * @param {Function} next Função de callback. Uso: next(response: string, status: number).
  */
  send(content, next) {
  	this.xhr.setRequestHeader("Content-Type", "application/json");
  	this.xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
  	this.xhr.send(JSON.stringify(content));

  	this.xhr.onreadystatechange = function() {
  		if(this.readyState == Ajax.state.READY) {
  			next(this.responseText, this.status);
  		}
  	};
  }
}

/**
* @static Ajax
*
* Procura pelo nome dado ao parâmetro de CSRF (Cross-Site Request Forgery).
*
* @return Retorna o valor procurado (se existir).
*/
Ajax.getCSRFParam = function() {
  // Buscar a tag <meta> que deverá conter o parâmetro CSRF:
  var tagArray = document.getElementsByName("csrf-param");

  // Se existir, será retornado o valor encontrado:
  if(tagArray.length > 0 && tagArray[0].hasAttribute("content")) {
  	return tagArray[0].getAttribute("content");
  }

  return;
};

/**
* @static Ajax
*
* Procura pelo valor do token CSRF (Cross-Site Request Forgery).
*
* @return Retorna o valor procurado (se existir).
*/
Ajax.getCSRFToken = function() {
  // Buscar a tag <meta> que deverá conter o token CSRF:
  var tagArray = document.getElementsByName("csrf-token");

  // Se existir, será retornado o valor encontrado:
  if(tagArray.length > 0 && tagArray[0].hasAttribute("content")) {
  	return tagArray[0].getAttribute("content");
  }

  return;
};

/** Estados da conexão AJAX para o request. */
Ajax.state = {
	"NOT_INITIALIZED": 0,
	"SERVER_CONNECTION_ESTABILISHED": 1,
	"REQUEST_RECEIVED": 2,
	"PROCESSING_REQUEST": 3,
	"READY": 4
};

/** Indicadores do progresso do envio do request. */
Ajax.status = {
	"OK": 200,
	"NOT_FOUND": 404,
  "INTERNAL_SERVER_ERROR": 500
};

/** Métodos de envio de request para o AJAX (GET/POST/PUT/PATCH/DELETE). */
Ajax.method = {
	"GET": "GET",
	"POST": "POST",
  "PUT": "PUT",
  "PATCH": "PATCH",
  "DELETE": "DELETE"
};
