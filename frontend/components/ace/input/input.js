
import { LightningElement, api } from 'lwc';
import './input.scss';

export default class Input extends LightningElement {

    @api type;
    @api placeholder;

}