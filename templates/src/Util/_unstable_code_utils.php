<?php

/**
 * Determina se uma requisição foi feita via AJAX.
 *
 * @param Request $request Requisição do cliente.
 *
 * @return boolean
 */
public function isAjax(Request $request) {
  return (
    strtolower($request->getHeaderLine("Content-Type"    )) === "application/json" &&
    strtolower($request->getHeaderLine("X-Requested-With")) === "xmlhttprequest"
  );
}

/**
 * Cria uma mensagem para ser enviada de volta ao cliente.
 *
 * @param string $status Status da mensagem (`'success'`, `'fail'`, `'error'`).
 * @param string $message Mensagem de notificação.
 * @param any $data Dados da mensagem.
 * @param int $code Código de resposta HTTP para esta mensagem.
 */
private function createMessage($status = "success", $message = null, $data = null, $code = 200) {
  // Estrutura da mensagem (JSON).
  $message = [
    "status" => $status,
    "message" => $message,
    "data" => $data
  ];

  return $message;
}
