import TMPL_BASE from './tmpl_base.html';
import TMPL_CROSS from './tmpl_cross.html';
import TMPL_SUCCESS from './tmpl_success.html';
import TMPL_WARNING from './tmpl_warning.html';
import TMPL_ARROW_DOWN from './tmpl_arrow_down.html';
import TMPL_CHECKBOX_OFF from './tmpl_checkbox_off.html';
import TMPL_CHECKBOX_ON from './tmpl_checkbox_on.html';
import TMPL_CHECKBOX_ERROR from './tmpl_checkbox_error.html';
import TMPL_CHECKBOX_DISABLED from './tmpl_checkbox_disabled.html';
import TMPL_CHECKBOX_DISABLED_ON from './tmpl_checkbox_disabled_on.html';

import './icon.scss';
import { LightningElement, api} from 'lwc';

const ICONS = {
    'cross': TMPL_CROSS,
    'success': TMPL_SUCCESS,
    'warning': TMPL_WARNING,
    'arrow-down': TMPL_ARROW_DOWN,
    'checkbox-off': TMPL_CHECKBOX_OFF,
    'checkbox-on': TMPL_CHECKBOX_ON,
    'checkbox-error': TMPL_CHECKBOX_ERROR,
    'checkbox-disabled': TMPL_CHECKBOX_DISABLED,
    'checkbox-disabled-on': TMPL_CHECKBOX_DISABLED_ON
}

export default class Icon extends LightningElement {

    @api type;

    render(){
        return ICONS[this.type] || TMPL_BASE;
    }
}