
declare var jquery: any;
declare var $: any;
declare var window: any;

export class Settings {
    static apiBase = window.env.apiUrl;
    static currentYear = (new Date()).getFullYear();
}