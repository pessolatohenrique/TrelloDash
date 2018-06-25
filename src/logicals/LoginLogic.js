import { createToast } from '../common/ToastHelper';
import { showError, catchLoginError } from '../common/ErrorHelper';
import { saveSession } from '../common/AuthHelper';
import { browserHistory } from 'react-router';

export default class LoginLogic {
    static authorize(key, token) {
        const base_url = ` https://api.trello.com/1/tokens/${token}/member?key=${key}&token=${token}`;
        
        fetch(base_url)
        .then(response => {
            catchLoginError(response);
            return response.json();
        })
        .then(user_info => {
            saveSession(key, token, user_info);
            browserHistory.push('/general');
            createToast("Logado com sucesso!");
        })
        .catch(error => {
            showError(error);
        });
    }
}