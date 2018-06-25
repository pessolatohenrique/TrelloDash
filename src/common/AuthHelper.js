/**
 * salva informações referentes ao login do usuário
 * as informações serão utilizadas em outros pontos da aplicação
 * @param { String } key chave de acesso
 * @param { String } token chave de acesso
 * @param { Object } user_info informações do usuário fornecidos pelo Trello
 * @return void
 */
export function saveSession(key, token, user_info) {
    localStorage.setItem("key", key);
    localStorage.setItem("token", token);
    localStorage.setItem("avatar_hash", user_info.avatarHash);
    localStorage.setItem("fullname", user_info.fullName);
    localStorage.setItem("username", user_info.username);
    localStorage.setItem("email", user_info.email);
}

/**
 * exclui dados referentes a uma sessão de usuário
 * utilizado no ato do logout
 */
export function destroySession() {
    localStorage.removeItem("key");
    localStorage.removeItem("token");
    localStorage.removeItem("avatar_hash");
    localStorage.removeItem("fullname");
    localStorage.removeItem("username");
    localStorage.removeItem("email");
}

/**
 * obtem a chave e o token gravados no localstorage e retorna a URL de chamada para
 * estes valores
 * @return { String } url_auth Url de a ser utilizada pra autorização
 */
export function getAuthParameters(first_parameter = false) {
    const key = localStorage.getItem("key");
    const token = localStorage.getItem("token");

    let url_auth = `key=${key}&token=${token}`;

    return url_auth;
}