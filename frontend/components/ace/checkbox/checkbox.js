
import { LightningElement, api } from 'lwc';
import './checkbox.scss';

export default class Checkbox extends LightningElement {


    @api checked = "off";
    @api required;
    @api name;
    @api label;
    @api requiredMessage;
    @api disabled;

    get cssComponent() {
        let result = "ace-checkbox";
        if(this.disabled){
            result += " ace-checkbox_disabled";
        }else{
            if(this.required && this.usedByUser && !this.isValid()){
                result += " ace-checkbox_error";
            }
        }
        return result;
    }

    get iconType(){
        let type = 'checkbox-off';
        if(this.usedByUser){
            if(this.isValid()){
                if(this.checked === "on"){
                    type = 'checkbox-on';
                }
            }else{
                type = 'checkbox-error';
            }
        }else if(this.disabled){
            type = this.checked === 'on' ? 'checkbox-disabled-on' : 'checkbox-disabled';
        }
        return type; 
    }

    usedByUser = false;
    
    clickHandler(){
        if(!this.disabled){
            this.checked = this.checked === "off" ? "on" : "off";
            this.validate();

            this.dispatchEvent(new CustomEvent('acecheckbox',{
                detail:{
                    name: this.name,
                    checked: this.checked === 'on',
                    isValid: this.isValid()
                }
            }));
        }
    }

    @api validate(){
        if(!this.disabled){
            this.usedByUser = true;
        }
        return this.isValid();
    }

    @api isValid(){
        if(this.required){
            return this.checked === "on";
        }else{
            return true;
        }
    }

    connectedCallback(){
        if(this.checked === "on"){
            this.validate();
        }
    }

    renderedCallback(){
        this.template.querySelector('.ace-checkbox__label').innerHTML = this.label;
    }
}