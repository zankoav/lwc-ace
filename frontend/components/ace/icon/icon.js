import TMPL_BASE from './tmpl_base.html';
import TMPL_CROSS from './tmpl_cross.html';
import TMPL_SUCCESS from './tmpl_success.html';
import TMPL_WARNING from './tmpl_warning.html';
import TMPL_ARROW_DOWN from './tmpl_arrow_down.html';
import './icon.scss';
import { LightningElement, api} from 'lwc';

const ICONS = {
    'cross': TMPL_CROSS,
    'success': TMPL_SUCCESS,
    'warning': TMPL_WARNING,
    'arrow-down': TMPL_ARROW_DOWN
}

export default class Icon extends LightningElement {

    @api type;

    render(){
        return ICONS[this.type] || TMPL_BASE;
    }
}