
import { LightningElement, api } from 'lwc';
import './selectOption.scss';

export default class SelectOption extends LightningElement {

    @api option;

    get cssClasses(){
        return this.option.selected ? "ace-select-option ace-select-option_selected" : "ace-select-option";
    }

    clickHandler(){
        this.dispatchEvent(new CustomEvent('selectchange', {
            detail: this.option.value
        }));
    }
}