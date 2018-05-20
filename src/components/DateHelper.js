/**
 * recebe uma data em formato americano e converte para o formato brasileiro
 * @param {String} date_str data e hora no formato americano 
 * @return {String} final_string data e hora em formato brasileiro
 */
export function convertToBrazilian(date_str) {
    const explode = date_str.split("T");
    let date = explode[0];
    let time = explode[1].substr(0,5);
    let date_explode = date.split("-");
    let date_format = `${date_explode[2]}/${date_explode[1]}/${date_explode[0]}`;
    let final_string = `${date_format} às ${time}`;

    return final_string;
}