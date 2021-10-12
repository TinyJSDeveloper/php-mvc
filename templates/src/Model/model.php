<?php
namespace {{model.namespace}};

/**
 * @class {{model.className}}
 *
 * @description
 * {{model.description}}
 */
final class {{model.className}} {
  /** {{database.id.description}} */
  private $id;

  {{#each fields}}
  /** {{this.description}} */
  private ${{this.name.camelCase}};

  {{/each}}
  /**
   * @constructor
   *
   * @param int $id {{database.description}}
{{#each fields}}   * @param {{this.PHPDocParam}} ${{this.name.camelCase}} {{this.description}}
{{/each}}
   */
  public function __construct($id, {{#each fields}}${{this.name.camelCase}}{{#unless @last}}, {{/unless}}{{/each}}) {
    $this->setId($id);
    {{#each fields}}
    $this->set{{this.name.pascalCase}}(${{this.name.camelCase}});
    {{/each}}
  }

  /**
	 * Cria um modelo a partir dos dados retornados pelo gerenciador de
	 * queries SQL do banco de dados (Pixie). Os dados devem ser passados como uma
   * array, por exemplo: `(array) $result`
	 *
	 * @param array $fields Campos retornados pelo gerenciador de queries SQL.
	 *
	 * @return {{model.className}}
	 */
  public static function from(array $fields) {
    // Retornar classe:
    return new {{model.className}}(
      $fields["{{database.id.name.default}}"] ?? null,
      {{#each fields}}
      $fields["{{this.name.default}}"] ?? null{{#unless @last}},{{/unless}}
      {{/each}}
    );
  }

  /**
   * Obtém referência da tabela usada para consultar os itens.
   *
   * @return \DB::table
   */
  public static function table() {
    return \DB::table("{{database.table}}");
  }

  /**
	 * Consulta e retorna todos os itens (ou nada, caso não seja encontrado).
	 *
	 * @param int $id {{database.description}}
	 *
	 * @return array[{{model.className}}]
	 */
  public static function selectAll() {
    // Buscar todas as linhas:
    $rows = \DB::table("{{database.table}}")->select("*")->get();

    // Converter e retornar array com os resultados convertidos em modelos...
    if($rows != null) {
      foreach($rows as &$row) {
        $row = {{model.className}}::from((array) $row);
      }

      return $rows;
    }

    // ...ou uma array vazia, caso nada tenha sido obtido:
    return [];
  }

  /**
	 * Consulta e retorna um item (ou nada, caso não seja encontrado).
	 *
	 * @param int $id {{database.description}}
	 *
	 * @return {{model.className}}
	 */
  public static function find($id) {
    // Buscar linha com a ID especificada:
    $row = \DB::table("{{database.table}}")->find($id, "{{database.id.name.default}}");

    // Um modelo será retornado, mas apenas se a ID tiver sido encontrada...
    if($row != null) {
      return {{model.className}}::from((array) $row);
    }
  }

  /**
	 * Verifica a existência de um item.
	 *
	 * @param int $id {{database.description}}
	 *
	 * @return boolean
	 */
  public function exists() {
    return ($this->getId() != null && \DB::table("{{database.table}}")->find($this->getId(), "{{database.id.name.default}}") != null);
  }

  /**
	 * Exporta este modelo para uma array de campos.
	 *
	 * @return array
	 */
  public function export() {
    return [
      "{{database.id.name.default}}" => $this->getId(),
      {{#each fields}}
      "{{this.name.default}}" => $this->get{{this.name.pascalCase}}(){{#unless @last}},{{/unless}}
      {{/each}}
    ];
  }

  /**
	 * Verifica e obtém campos inválidos deste modelo.
	 *
	 * @return array
	 */
	public function getInvalidFields() {
		// Campos inválidos serão salvos aqui, com seus devidos erros:
		$invalidFields = [];

    // Obter campos...
    {{#each fields}}
    ${{this.name.camelCase}} = $this->get{{this.name.pascalCase}}();
    {{/each}}
    {{#each fields}}

    {{#unless this.acceptNull}}
    // Verificar se o campo "{{this.name.camelCase}}" é inválido...
    if(empty(trim(${{this.name.camelCase}}))) {
      $invalidFields["{{this.name.default}}"] = [
        "status" => "error",
        "message" => "{{@root.controller.messages.emptyField}}"
      ];
    }
    {{/unless}}

    {{#if this.isString}}
    // Verificar se o campo "{{this.name.camelCase}}" é maior que o permitido...
    {{#unless this.acceptNull}}else {{/unless}}if(strlen(${{this.name.camelCase}}) > {{this.stringLength}}) {
      $invalidFields["{{this.name.default}}"] = [
        "status" => "error",
        "message" => "{{@root.controller.messages.tooLongField}}"
      ];
    }
    {{/if}}
    {{/each}}

    return $invalidFields;
  }

  /**
   * Insere este item no banco de dados. A ID do modelo também é atualizada.
   *
   * @return boolean
   */
  public function create() {
    $this->setId(\DB::table("{{database.table}}")->insert($this->export()));
    return true;
  }

  /**
   * Atualiza este item no banco de dados.
   *
   * @return boolean
   */
  public function update() {
    // Esta operação exige que o modelo tenha uma ID associada...
    if($this->getId() == null) {
      return false;
    }

    // Atualizar todo o conteúdo do modelo no banco de dados:
    \DB::table("{{database.table}}")
      ->where("{{database.id.name.default}}", "=", $this->getId())
      ->update($this->export());

    return true;
  }

  /**
   * Remove este item do banco de dados.
   *
   * @return boolean
   */
  public function delete() {
    // Esta operação exige que o modelo tenha uma ID associada...
    if($this->getId() == null) {
      return false;
    }

    // Remover todo o conteúdo do modelo no banco de dados:
    \DB::table("{{database.table}}")
      ->where("{{database.id.name.default}}", "=", $this->getId())
      ->delete();

    return true;
  }

  /**
   * Importa uma array de campos para este modelo, adicionando e
   * sobrescrevendo propriedades quando necessário.
   *
   * @param array $fields Campos a serem importados.
   *
   * @return boolean
   */
  public function import($fields) {
    $this->setId($fields["{{database.id.name.default}}"] ?? $this->id);
    {{#each fields}}
    $this->set{{this.name.pascalCase}}($fields["{{this.name.default}}"] ?? $this->{{this.name.camelCase}});
    {{/each}}

    return true;
  }

  /**
   * @getter
   *
   * @return int {{database.description}}
   */
  public function getId() {
    return $this->id;
  }

  /**
   * @setter
   *
   * @param int $id {{database.description}}
   */
  public function setId($id) {
    $this->id = intval($id);
  }
  {{#each fields}}

  /**
   * @getter
   *
   * @return {{this.PHPDocParam}} {{this.description}}
   */
  public function get{{this.name.pascalCase}}() {
    return $this->{{this.name.camelCase}};
  }

  /**
   * @setter
   *
   * @param {{this.PHPDocParam}} ${{this.name.camelCase}} {{this.description}}
   */
  public function set{{this.name.pascalCase}}(${{this.name.camelCase}}) {
    {{#if this.isString}}
    $this->{{this.name.camelCase}} = strval(${{this.name.camelCase}});
    {{/if}}
    {{#unless this.isString}}
    {{#if this.isFloat}}
    $this->{{this.name.camelCase}} = floatval(${{this.name.camelCase}});
    {{/if}}
    {{#unless this.isFloat}}
    $this->{{this.name.camelCase}} = intval(${{this.name.camelCase}});
    {{/unless}}
    {{/unless}}
  }
  {{/each}}
}
