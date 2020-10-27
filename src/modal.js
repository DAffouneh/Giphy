import React, {Component} from 'react';
import classes from './modal.module.css';

class Modal extends Component {
  
    render()
    {
       
        return(
           
            <div className={classes.Modal}>
           
                {this.props.children}
    
            </div>
    

        );
    }
}
   
export default Modal;