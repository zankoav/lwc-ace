import '@lwc/synthetic-shadow';
import { createElement } from 'lwc';
import App from 'ace/app';

const appEl = createElement('ace-app', { is: App });
document.body.appendChild(appEl);