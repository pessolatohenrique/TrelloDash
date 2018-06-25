import React, { Component } from 'react';

export default class LoginRules extends Component {
    render() {
        return (
            <div className="instrucoes">
                <ol>
                    <li>Realize o login no Trello.</li>
                    <li>Acesse <a href="https://trello.com/app-key" target="_blank" rel="noopener noreferrer" >aqui</a> e <strong>copie</strong> a chave fornecida.
                    </li>
                    <li>Acesse 
                        <a href="https://trello.com/1/authorize?expiration=never&scope=read,write,account&response_type=token&name=Server%20Token&key=*KEY*" target="_blank" rel="noopener noreferrer"> aqui
                        </a>, substitua o trecho <strong>*KEY*</strong> e copie o valor de token fornecido.
                    </li>
                    <li>
                        Cole a chave e o token nos campos abaixo, e realize a submisão do formulário.
                    </li>
                </ol>
            </div>
        );
    }
}