/**
 * Utilitários para manipulação de datas no fuso horário America/Sao_Paulo.
 */

const TIMEZONE = 'America/Sao_Paulo';

/**
 * Obtém a data atual formatada como YYYY-MM-DD no fuso de SP.
 */
export const getTodayDateString = () => {
    return new Intl.DateTimeFormat('fr-CA', {
        timeZone: TIMEZONE,
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    }).format(new Date());
};

/**
 * Formata uma string de data para exibição amigável (ex: 24 de Março).
 */
export const formatDateDisplay = (dateString) => {
    const [year, month, day] = dateString.split('-');
    const date = new Date(year, month - 1, day);
    
    return new Intl.DateTimeFormat('pt-BR', {
        day: 'numeric',
        month: 'long'
    }).format(date);
};

/**
 * Verifica se uma data armazenada é anterior ao dia de hoje em SP.
 */
export const isPastDay = (storedDateString) => {
    const today = getTodayDateString();
    return storedDateString !== today;
};
