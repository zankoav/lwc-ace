import './app.scss';
import { LightningElement } from 'lwc';


export default class App extends LightningElement {

    constructor(){
        super();
    }

    get opts(){
        return  [
            {
                label:'Option 1',
                value:'opt_1'
            },
            {
                label:'Option 2',
                value:'opt_2'
            },
            {
                label:'Option 3',
                value:'opt_3'
            },
            {
                label:'Option 4',
                value:'opt_4'
            }
        ];
    }
}
