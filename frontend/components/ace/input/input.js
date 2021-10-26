
import { LightningElement, api } from 'lwc';
import './input.scss';

export default class Input extends LightningElement {
   
    @api name;
    @api label;
    @api value = '';
    @api iconShow;
    @api required;
    @api requiredMessage;
    @api minLength;
    @api minLengthMessage;
    @api maxLength;
    @api maxLengthMessage;
    @api regx;
    @api regxMessage;
    @api disabled;

    @api isValid(){
        const isRequiredError = this.required && !this.value;
        const isMinLengthError = this.minLength && (this.value.length < parseInt(this.minLength));
        const isMaxLengthError = this.maxLength && this.maxLengthMessage && (this.value.length > parseInt(this.maxLength));
        const isRegxError = this.regx && (!(new RegExp(this.regx)).test(this.value));

        return !(isRequiredError || isMinLengthError || isMaxLengthError || isRegxError);
    }

    @api validate(){
        this.usedByUser = true;
        return this.isValid();
    }
 
    isFocus;
    pressedMe;
    usedByUser = false;

    get ID(){
        return `id-${this.name}`;
    }
    get message(){
        let message = '';

        if(this.minLength && this.value.length < parseInt(this.minLength)){
            message = this.minLengthMessage;
        }

        if(this.maxLength && this.value.length > parseInt(this.maxLength)){
            message = this.maxLengthMessage;
        }
        
        if(this.regx && (!(new RegExp(this.regx)).test(this.value))){
            message = this.regxMessage;
        }

        if(this.required && !this.value){
            message = this.requiredMessage;
        }

        return message;
    }

    get isRequired(){
        return this.required || this.minLength;
    }

    get cssContainer(){
        let result = "ace-input__container";

        if(this.isFocus || this.value) {
            result += " ace-input__container_active";
        }

        if(this.disabled){
            result += " ace-input__container_disabled";
        }else if(this.usedByUser){
            if(this.isValid()){
                result += " ace-input__container_success";
            }else{
                result += " ace-input__container_error";
            }
            
        }
        return result;
    }

    get iconType(){
        let result = false;
        if(this.iconShow && this.usedByUser){
            result = this.isValid() ? 'success' : 'cross';
        }
        return result;
    }

    startDown(event){
        const target = event.target || event.changedTouches[0];
        if(target !== this.template.querySelector('input')){
            event.preventDefault();
        }
        this.pressedMe = true;
        setTimeout(()=>{this.pressedMe = false}, 4);
    }

    focusHandler(){
        if(!this.disabled){
            this.isFocus = true;
        }
    }

    blurHandler(){
        if(!this.pressedMe){
            this.isFocus = false;
        }
        this.usedByUser = true;
    }
    
    inputHandler(event){
        let val = event.target.value;
        if(
            this.disabled || 
            (this.maxLength && !this.maxLengthMessage && val.length > parseInt(this.maxLength))
        ){
            this.value = this.value;
        }else{
            this.value = val;
        }

        if(!this.usedByUser && this.isValid()){
            this.usedByUser = true;
        }
        
        this.dispatchEvent(new CustomEvent('aceinput',{
            detail:{
                name: this.name,
                label: this.label,
                value: this.value,
                isValid: this.isValid()
            }
        }));
    }

    connectedCallback(){
        if(
            this.value && 
            this.maxLength && 
            !this.maxLengthMessage && 
            this.value.length > parseInt(this.maxLength)
        ){
            this.value = this.value.substr(0, parseInt(this.maxLength));
        }

        if(this.value){
            this.validate();
        }
    }

    renderedCallback(){
        if(this.disabled){
            this.template.querySelector('input').disabled = 'disabled';
        }
    }
}