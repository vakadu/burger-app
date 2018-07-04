import React from 'react';

import BuildControl from './BuildControl/BuildControl';
import classes from './BuildControls.css';
const controls = [
    { label: 'Salad', type: 'salad' },
    { label: 'Bacon', type: 'bacon' },
    { label: 'Cheese', type: 'cheese' },
    { label: 'Meat', type: 'meat' },
]

const buildControls = (props) => (
    <div className={ classes.BuildControls }>
        <p>Current Price: <strong>{ props.price.toFixed(2) }</strong></p>
        {
            controls.map(ctrl => (
                <BuildControl
                    key={ ctrl.label }
                    label={ ctrl.label }
                    added={ () => props.ingridientAdded(ctrl.type) }
                    removed={ () => props.ingridientRemoved(ctrl.type) }
                    disabled={ props.disabled[ctrl.type] }
                    price={ props.price }/>
            ))
        }
        <button onClick={ props.purchaseHandler } disabled={ !props.purchasable } className={ classes.OrderButton }>Order Now</button>
    </div>
)

export default buildControls;
