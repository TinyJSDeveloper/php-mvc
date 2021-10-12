/** Exemplo de JSON usado pelo utilitário. */
var users = {
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
