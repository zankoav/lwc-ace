
import { LightningElement, api } from 'lwc';
import './select.scss';

export default class Select extends LightningElement {
    @api name;
    @api label;
    @api value = '';
    @api iconShow;
    @api required;
    @api requiredMessage;
    @api disabled;

    @api set options(items){
        this.items = items;
    };

    get options(){
        let result = [];
        if(!this.required){
            result.push({
                label: '- None -',
                value: 'none'
            });
        }
        result = [...result,...this.items].map(item => {
            return {...item, selected:item.value === this.value};
        });
       return result || [];
    }

    @api isValid(){
        if(this.required){
            return !!this.value;
        }else{
            return true;
        }
    }

    @api validate(){
        this.usedByUser = true;
        return this.isValid();
    }
 
    items;
    isFocus;
    usedByUser = false;

    get tabIndex(){
        return this.isFocus ? 0 : -1;
    }

    get ID(){
        return `id-${this.name}`;
    }

    get selectedLabel(){
        return this.options.find(item => item.value === this.value)?.label;
    }

    get message(){
        let message = '';

        if(this.required && !this.value){
            message = this.requiredMessage;
        }

        return message;
    }

    get cssContainer(){
        let result = "ace-select__container";

        if(this.disabled){
            result += " ace-select__container_disabled";
            if(this.value){
                result += " ace-select__container_value";
            }
        }else if(this.isFocus) {
            result += " ace-select__container_active";
        }else if(this.usedByUser){
            if(this.isValid()){
                if(this.value){
                    result += " ace-select__container_success";
                }else{
                    result += " ace-select__container_empty";
                }
            }else{
                result += " ace-select__container_error";
            }
        }
        return result;
    }

    get cssOptions(){
        return this.isFocus ? "ace-select__options ace-select__options_active" : "ace-select__options";
    }

    get iconType(){
        let result = false;
        if(this.iconShow && this.usedByUser && !this.isFocus){
            result = this.isValid() ? 'success' : 'cross';
        }
        return result;
    }

    focusHandler(event){
        if(!this.disabled){
            this.isFocus = true;
        }
    }

    blurHandler(){
        this.isFocus = false;
        this.usedByUser = true;
    }
    
    changeCurrentOption(event){
        this.isFocus = false;
        setTimeout(()=>{
            this.value = event.detail === 'none' ? "" : event.detail;
            this.isFocus = false;
            this.validate();
            this.dispatchEvent(new CustomEvent('aceselect',{
                detail:{
                    name: this.name,
                    label: this.label,
                    value: this.value,
                    isValid: this.isValid()
                }
            }));
        }, 4);
    }

    connectedCallback(){
        if(this.value){
            this.validate();
        }
    }
}