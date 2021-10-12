<?php
namespace {{controller.namespace}};

use {{model.namespace}}\\{{model.className}} as {{model.className}};
use Psr\Container\ContainerInterface as Container;
use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

/**
 * @class {{controller.className}}
 *
 * @description
 * {{controller.description}}.
 */
final class {{controller.className}} {
  /** Container da aplicação web. */
  protected $container;

  /** Componente de visões. */
  protected $view;

  /** Componente de sessões. */
  protected $session;

  /** Componente de logs. */
  protected $logger;

  /**
   * @constructor
   *
   * @param Container $container Container da aplicação web.
   */
  public function __construct(Container $container) {
    $this->container = $container;
    $this->view = $this->container->view;
    $this->session = $this->container->session;
    $this->logger = $this->container->logger;
  }

  /**
   * Consulta todos os itens.
   *
   * @param Request $request Requisição do cliente.
   * @param Response $response Resposta do servidor.
   * @param array $args Parâmetros passados pela rota (se existirem).
   *
   * @return Response
   */
  public function selectAll(Request $request, Response $response, array $args) {
    // Buscar por todos os itens:
    $records = \DB::table("{{database.table}}")->select("*")->get();

    // Retornar item com sucesso:
    return $response->withJson(
      [
        "status" => "success",
        "data"   => $records
      ],
      200
    );
  }

  /**
   * Consulta um item.
   *
   * @param Request $request Requisição do cliente.
   * @param Response $response Resposta do servidor.
   * @param array $args Parâmetros passados pela rota (se existirem).
   *
   * @return Response
   */
  public function find(Request $request, Response $response, array $args) {
    // Buscar item pelo parâmetro de ID passado pela rota:
    $id = $args["id"] ?? 0;
    $record = {{model.className}}::find($id);

    // @error
    // Caso o item consultado não exista, uma notificação será enviada de volta
    // para o cliente apontando que não há valores associados a esta ID:
    if($record == null) {
      return $response->withJson(
        [
          "status"  => "error",
          "message" => "{{controller.messages.idNotFound}}"
        ],
        404
      );
    }

    // Retornar item com sucesso:
    return $response->withJson(
      [
        "status" => "success",
        "data"   => $record->export()
      ], 200
    );
  }

  /**
   * Adiciona um item.
   *
   * @param Request $request Requisição do cliente.
   * @param Response $response Resposta do servidor.
   * @param array $args Parâmetros passados pela rota (se existirem).
   *
   * @return Response
   */
  public function put(Request $request, Response $response, array $args) {
    // Parâmetros passados via POST/PATCH:
    $data = $request->getParsedBody();

    // Importar campos recebidos em um item. Os campos inválidos serão
    // buscados logo em seguida:
    $record = {{model.className}}::from($data);
    $invalidFields = $record->getInvalidFields();

    // @error
    // Caso o item possua campos inválidos, os erros serão retornados de volta
    // para que o cliente saiba o que há de errado com cada um deles:
    if(!empty($invalidFields)) {
      return $response->withJson(
        [
          "status"  => "fail",
          "message" => "{{controller.messages.invalidFields}}",
          "data"    => $invalidFields
        ],
        200
      );
    }

    // Criar este item no banco de dados:
    $record->create();

    // Retornar item criado com sucesso...
    return $response->withJson(
      [
        "status"  => "success",
        "message" => "{{controller.messages.put}}",
        "data"    => $record->export()
      ],
      200
    );
  }

  /**
   * Altera/modifica um item.
   *
   * @param Request $request Requisição do cliente.
   * @param Response $response Resposta do servidor.
   * @param array $args Parâmetros passados pela rota (se existirem).
   *
   * @return Response
   */
  public function patch(Request $request, Response $response, array $args) {
    // Parâmetros passados via POST/PATCH:
    $data = $request->getParsedBody();

    // Buscar item pelo parâmetro de ID passado pela rota:
    $id = $args["id"] ?? 0;
    $record = {{model.className}}::find($id);

    // @error
    // Caso o item consultado não exista, uma notificação será enviada de volta
    // para o cliente apontando que não há valores associados a esta ID:
    if($record == null) {
      return $response->withJson(
        [
          "status"  => "error",
          "message" => "{{controller.messages.idNotFound}}"
        ],
        404
      );
    }

    // Importar este item. A próxima etapa é buscar por campos inválidos:
    $record->import($data);
    $invalidFields = $record->getInvalidFields();

    // @error
    // Caso o item possua campos inválidos, os erros serão retornados de volta
    // para que o cliente saiba o que há de errado com cada um deles:
    if(!empty($invalidFields)) {
      return $response->withJson(
        [
          "status"  => "fail",
          "message" => "{{controller.messages.invalidFields}}",
          "data"    => $invalidFields
        ],
        200
      );
    }

    // Atualizar este item no banco de dados:
    $record->update();

    // Retornar item alterado/modificado com sucesso...
    return $response->withJson(
      [
        "status"  => "success",
        "message" => "{{controller.messages.patch}}",
        "data"    => $record->export()
      ],
      200
    );
  }

  /**
   * Remove um item.
   *
   * @param Request $request Requisição do cliente.
   * @param Response $response Resposta do servidor.
   * @param array $args Parâmetros passados pela rota (se existirem).
   *
   * @return Response
   */
  public function delete(Request $request, Response $response, array $args) {
    // Buscar item pelo parâmetro de ID passado pela rota:
    $id = $args["id"] ?? 0;
    $record = {{model.className}}::find($id);

    // @error
    // Caso o item consultado não exista, uma notificação será enviada de volta
    // para o cliente apontando que não há valores associados a esta ID:
    if($record == null) {
      return $response->withJson(
        [
          "status"  => "error",
          "message" => "{{controller.messages.idNotFound}}"
        ],
        200
      );
    }

    // Remover este item do banco de dados:
    $record->delete();

    // Retornar item removido com sucesso...
    return $response->withJson(
      [
        "status"  => "success",
        "message" => "{{controller.messages.delete}}",
        "data"    => $record->export()
      ],
      200
    );
  }
}
