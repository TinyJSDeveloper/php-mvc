/**
 * @class Toast
 *
 * @description
 * Abstração para os toasts da biblioteca "Toastify". Como as funções possuem
 * uma declaração muito longa, é mais fácil manter um pequeno subset de toasts
 * disponível em um único lugar afim de abstrair seu uso.
 */
class Toast {
  static info(message) {
    return Toastify(
      {
        "text": message,
        "duration": 3000,
        "gravity": "top",
        "position": "center",
        "backgroundColor": "#3b4351",
        "close": true
      }
    ).showToast();
  }

  static success(message) {
    return Toastify(
      {
        "text": message,
        "duration": 3000,
        "gravity": "top",
        "position": "center",
        "backgroundColor": "#32b643",
        "close": true
      }
    ).showToast();
  }

  static error(message) {
    return Toastify(
      {
        "text": message,
        "duration": 3000,
        "gravity": "top",
        "position": "center",
        "backgroundColor": "#e85600",
        "close": true
      }
    ).showToast();
  }
}
