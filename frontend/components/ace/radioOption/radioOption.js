
import { LightningElement, api } from 'lwc';
import './radioOption.scss';

export default class RadioOption extends LightningElement {

    @api option;
    @api disabled;

    get cssClasses(){
        let result = "ace-radio-option"
        if(this.disabled){
            result += " ace-radio-option_disabled"
        }
        if(this.option.selected){
            result += " ace-radio-option_selected"
        }
        return result;
    }

    clickHandler(){
        this.dispatchEvent(new CustomEvent('radiochange', {
            detail: this.option.value
        }));
    }
}