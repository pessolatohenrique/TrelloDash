import { createErrorToast } from '../common/ToastHelper';

/**
 * exibe o erro encontrado em formato de Toast
 * @param { String } error erro encontrado no throw 
 * @return void
 */
export function showError(error) {
    const message = `Ocorreu o seguinte erro: ${error}`;
    createErrorToast(message);
}

/**
 * captura o erro obtido de acordo com a response
 * verifica se é exibido o status ou o status/texto
 * @param { Object } response objeto com a resposta enviada
 */
export function catchError(response) {
    if (!response.ok) {
        if (response.statusText === "") {
            throw Error(`${response.status}`); 
        } else {
            throw Error(`${response.status} - ${response.statusText}`);
        }
        
    }
}

export function catchLoginError(response) {
    if (!response.ok) {
        throw Error('Chave ou token inválidos. Verifique!');
    }
}