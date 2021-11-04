
import { LightningElement, api } from 'lwc';
import './radio.scss';

export default class Radio extends LightningElement {

    @api options = []
    @api required
    @api requiredMessage
    @api value
    @api label
    @api name
    @api disabled
    @api vertical

    usedByUser

    get opts(){
        return this.options.map(item => {
            return {...item, selected: item.value === this.value}
        })
    }

    get cssContainer(){
        let result = "ace-radio";

        if(this.vertical){
            result += " ace-radio_vertical";
        }

        if(this.disabled){
            result += " ace-radio_disabled";
        }
        
        if(this.usedByUser && !this.isValid()){
            result += " ace-radio_error";
        }

        return result;
    }

    @api validate(){
        this.usedByUser = true
        return this.isValid()
    }

    @api isValid(){
        return this.required ? !!this.value : true
    }

    changeHandler(event){
        if(!this.disabled){
            this.value = event.detail
            this.usedByUser = true
            this.dispatchEvent(new CustomEvent('aceradio',{
                detail:{
                    name: this.name,
                    label: this.label,
                    value: this.value,
                    isValid: this.isValid()
                }
            }))
        }
    }

}