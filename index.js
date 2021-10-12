/**
@todo Alterar dados do sistema de mensagens para algo igual a isso -> {... "data": { "default": {...} }
@todo Usar e revisar as novas propriedades para checar se é nulo, se é string, e a string length.
@todo Usar o Controller.js (controlador genérico) ao invés de criar um monte deles.
**/

/** Biblioteca padrão de arquivos de sistema (Filesystem). */
let fs = require("fs");

/** Parâmetros passados para a aplicação. */
let args = process.argv.slice(2);

/** Engine de templates (Handlebars). */
let Handlebars = require("handlebars");

/** Diretórios usados por este utilitário. */
class Directory {
  /** Diretório de saída. */
  static output = "./output";

  /** Diretório dos templates de modelo. */
  static model = {
    "php": "Model",
    "js": "js/models"
  };

  /** Diretório dos templates de controlador. */
  static controller = {
    "php": "Controller",
    "js": "js/controllers"
  };

  /** Diretório de arquivos utilitários. */
  static util = {
    "php": "Util",
    "js": "js/util"
  };

  /** Diretório de componentes (usado para as páginas). */
  static component = {
    "js": "js/components"
  };

  /** Diretório de páginas. */
  static view = {
    "html": "views"
  };
}

/**
 * @class Template
 *
 * @description
 * Classe contendo todos os templates da Handlebars para uso do utilitário.
 */
class Template {
  /** Templates disponíveis para uso. */
  static items = {};

  /**
   * Adiciona um template.
   *
   * @param {string} key Chave associada a este template.
   * @param {string} filename Nome do arquivo de template.
   *
   * @return {Template} Tail call.
   */
  static set(key, filename) {
    Template.items[key] = Handlebars.compile(
      fs.readFileSync(`./templates/${filename}`, "utf8")
    );

    return Template;
  }

  /**
   * Gera um texto com base em um dos templates disponíveis.
   *
   * @param {string} key Chave do template.
   * @param {Object} options Parâmetros passados para o template.
   */
  static generate(key, options) {
    console.log(`Gerando template: "${key}"`);
    return Template.items[key](options);
  }
};

/** Arquivos utilitários. Estes são copiados quando o resultado é gerado. */
let Utils = {
  "js": {
    "Ajax": fs.readFileSync("./templates/public/js/util/Ajax.js", "utf8"),
    "Website": fs.readFileSync("./templates/public/js/util/Website.js", "utf8")
  }
};

// Instanciar templates...
Template.set("model.php", "src/Model/model.php");
Template.set("controller.php", "src/Controller/controller.php");
Template.set("model.js", "public/js/models/model.js");
Template.set("controller.js", "public/js/controllers/controller.js");
Template.set("select_all.js", "public/js/components/select_all.js");
Template.set("form.js", "public/js/components/form.js");
Template.set("select_all.html", "views/select_all.html");
Template.set("form.html", "views/form.html");
Template.set("routes.php", "routes.php");

/** Dados de exemplo. Usado para testar a geração de conteúdo. */
var testData = {
  // Seção com dados relacionados ao banco de dados real.
  "database": {
    "table"      : "users",               // Nome da tabela real.
    "description": "Tabela de usuários.", // @unused Descrição da tabela.

    // ID presente na tabela. Nos modelos gerados, esta variável é fixa:
    // * seu nome é sempre `$id`, com os métodos `getId()` e `setId()`.
    "id": {
      "name": {
        "default"   : "user_id", // Nome padrão deste campo. Deixe o mesmo nome que está na tabela real.
        "snakeCase" : "user_id", // Nome do campo, em `snake_case`.
        "camelCase" : "userId",  // Nome do campo, em `camelCase`.
        "pascalCase": "UserId",  // Nome do campo, em `PascalCase`.
        "constant"  : "USER_ID", // Nome do campo, em `CONSTANTE`.

        // @unused Nome do campo, no contexto de variáveis de código.
        "variable"  : {
          "php": "$id",
          "js" : "id"
        }
      },
      "description" : "ID deste usuário (PK).", // Descrição do campo.
      "type"        : "int",                    // Tipo do campo (real).
      "PHPDocParam" : "int",                    // Tipo do campo (usado no `PHPDoc`, dentro das opções `@param`).
      "JSDocParam"  : "number",                 // Tipo do campo (usado no `JSDoc`, dentro das opções `@param`).
      "acceptNull"  : false,                    // Indica se este campo aceita valores nulos.
      "isString"    : false,                    // Indica se o tipo primitivo deste campo é uma string.
      "isFloat"     : false,                    // Indica se o tipo primitivo deste campo é um float.
      "stringLength": 0,                        // Tamanho da string.

      "view": {
        "label"      : "ID", // Valor usado nas <labels> dos formulários.
        "placeholder": "ID"  // Valor de placeholder usado nos elementos <input> dos formulários.
      }
    },

    // @unused Opções adicionais...
    "options": {
      "useDeleteField"   : true,         // Quando `true`, consulta os itens levando em consideração um campo de exclusão.
      "DeleteField"      : "is_deleted", // Campo de exclusão.

      "useCreatedAtField": true,         // Quando `true`, inclui métodos extras para consultas entre datas de criação.
      "createdAtField"   : "created_at"  // Campo de data de criação.
      }
  },

  // Seção de campos do modelo. Todos devem se referir às mesmas colunas da
  // tabela real.
  "fields": {
    // @field created_at
    "created_at": {
      "name": {
        "default"   : "created_at",
        "snakeCase" : "created_at",
        "camelCase" : "createdAt",
        "pascalCase": "CreatedAt",
        "constant"  : "CREATED_AT",

        "variable"  : {
          "php": "$id",
          "js" : "id"
        }
      },
      "description" : "Data de registro deste usuário.",
      "type"        : "date",
      "PHPDocParam" : "String",
      "JSDocParam"  : "string",
      "acceptNull"  : false,
      "isString"    : true,
      "isFloat"     : false,
      "stringLength": 10,

      "view": {
        "label"      : "Data de registro",
        "placeholder": "DD/MM/YYYY"
      }
    },

    // @field name
    "name": {
      "name": {
        "default"   : "name",
        "snakeCase" : "name",
        "camelCase" : "name",
        "pascalCase": "Name",
        "constant"  : "NAME",

        "variable"  : {
          "php": "$id",
          "js" : "id"
        }
      },
      "description" : "Nome deste usuário.",
      "type"        : "string",
      "PHPDocParam" : "String",
      "JSDocParam"  : "string",
      "acceptNull"  : false,
      "isString"    : true,
      "isFloat"     : false,
      "stringLength": 64,

      "view": {
        "label"      : "Nome",
        "placeholder": "Nome"
      }
    },

    // @field email
    "email": {
      "name": {
        "default"   : "email",
        "snakeCase" : "email",
        "camelCase" : "email",
        "pascalCase": "Email",
        "constant"  : "EMAIL",

        "variable"  : {
          "php": "$id",
          "js" : "id"
        }
      },
      "description" : "Endereço de e-mail deste usuário.",
      "type"        : "string",
      "PHPDocParam" : "String",
      "JSDocParam"  : "string",
      "acceptNull"  : false,
      "isString"    : true,
      "isFloat"     : false,
      "stringLength": 64,

      "view": {
        "label": "E-mail",
        "placeholder": "E-mail"
      }
    },

    // @field password
    "password": {
      "name": {
        "default"   : "password",
        "snakeCase" : "password",
        "camelCase" : "password",
        "pascalCase": "Password",
        "constant"  : "PASSWORD",

        "variable"  : {
          "php": "$id",
          "js" : "id"
        }
      },
      "description" : "Senha deste usuário.",
      "type"        : "string",
      "PHPDocParam" : "String",
      "JSDocParam"  : "string",
      "acceptNull"  : false,
      "isString"    : true,
      "isFloat"     : false,
      "stringLength": 64,

      "view": {
        "label"      : "Senha",
        "placeholder": "Senha"
      }
    }
  },

  // Seção do modelo. Inclui nome da classe, descrição, namespace, etc.
  "model": {
    "className"  : "User",                // Nome da classe.
    "description": "Modelo de usuários.", // Descrição da classe.
    "namespace"  : "App\\Model"           // Namespace.
  },

  // Seção do controlador. Inclui nome da classe, descrição, namespace, etc.
  "controller": {
    "className"  : "UserController",
    "description": "Controlador de usuários.",
    "namespace"  : "App\\Controller",

    // Mensagens retornadas pelo controlador para ações diversas...
    "messages": {
      "emptyField"     : "Este campo não pode ser vazio.",     // Erro de campo vazio.
      "tooLongField"   : "Este campo é muito longo.",          // Erro de campo muito longo.
      "unexpectedError": "An unexpected error has occurred.",  // @unused
      "put"            : "Usuário registrado com sucesso.",    // Criação de um item.
      "patch"          : "Alterações salvas.",                 // Alteração de um item.
      "delete"         : "Exclusão de usuário concluida.",     // Exclusão de um item.
      "idNotFound"     : "A ID especificada não existe.",      // Erro de ID não encontrada.
      "invalidFields"  : "Um ou mais campos estão incorretos." // Erro de campos inválidos.
    }
  },

  // Seção de rotas usadas para a comunicação de dados.
  "routes": {
    "selectAll": "/users", // Obter todos os itens.
    "base"     : "/user",  // URL base deste item.
    "put"      : "/put",   // Criação do item.
    "patch"    : "/patch", // Alteração do item.
    "delete"   : "/delete" // Exclusão do item.
  },

  // Seção de views, que inclui templates e controladores client-side.
  "views": {
    "selectCard": {
      "title": "user_id",
      "subtitle": "created_at"
    },
    "selectAll": {
      "templateName" : "ScreenUserSelect",
      "componentName": "ScreenUserSelect",
      "description": "Tela de seleção de usuários."
    },
    "form": {
      "templateName" : "ScreenUserForm",
      "componentName": "ScreenUserForm",
      "description": "Formulário de usuários."
    }
  }
};

/** Dados de entrada. */
var mvcData = {};

try {
  console.log(`Abrindo definições "${args[0]}"`);
  mvcData = JSON.parse(fs.readFileSync(args[0], "utf8"));
}
catch(e) {
  console.log(e);
  return;
}

// Criar arquivo utilitário para AJAX (Javascript)...
fs.writeFileSync(
  `${Directory.output}/public/${Directory.util.js}/Ajax.js`,
  Utils.js.Ajax
);

// Criar arquivo utilitário para URL do Website (Javascript)...
fs.writeFileSync(
  `${Directory.output}/public/${Directory.util.js}/Website.js`,
  Utils.js.Website
);

// Criar rotas (PHP)...
fs.writeFileSync(
  `${Directory.output}/${mvcData.model.className} (routes).php`,
  Template.generate("routes.php", mvcData)
);

// Criar modelo (PHP)...
fs.writeFileSync(
  `${Directory.output}/src/${Directory.model.php}/${mvcData.model.className}.php`,
  Template.generate("model.php", mvcData)
);

// Criar controlador (PHP)...
fs.writeFileSync(
  `${Directory.output}/src/${Directory.controller.php}/${mvcData.controller.className}.php`,
  Template.generate("controller.php", mvcData)
);

// Criar modelo (Javascript)...
fs.writeFileSync(
  `${Directory.output}/public/${Directory.model.js}/${mvcData.model.className}.js`,
  Template.generate("model.js", mvcData)
);

// Criar controlador (Javascript)...
fs.writeFileSync(
  `${Directory.output}/public/${Directory.controller.js}/${mvcData.controller.className}.js`,
  Template.generate("controller.js", mvcData)
);

// Criar componente de exibição (Javascript)...
fs.writeFileSync(
  `${Directory.output}/public/${Directory.component.js}/${mvcData.views.selectAll.componentName}.js`,
  Template.generate("select_all.js", mvcData)
);

// Criar componente de formulário (Javascript)...
fs.writeFileSync(
  `${Directory.output}/public/${Directory.component.js}/${mvcData.views.form.componentName}.js`,
  Template.generate("form.js", mvcData)
);

// Criar view de exibição (HTML)...
fs.writeFileSync(
  `${Directory.output}/${Directory.view.html}/${mvcData.views.selectAll.templateName}.html`,
  Template.generate("select_all.html", mvcData)
);

// Criar view de formulário (HTML)...
fs.writeFileSync(
  `${Directory.output}/${Directory.view.html}/${mvcData.views.form.templateName}.html`,
  Template.generate("form.html", mvcData)
);
