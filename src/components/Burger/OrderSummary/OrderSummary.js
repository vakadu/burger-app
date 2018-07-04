import React from 'react';

import Aux from '../../../hoc/Aux';
import Button from '../../UI/Button/Button';

const orderSummary = (props) => {
    const ingridientSummary = Object.keys(props.ingredients)
        .map(igKey => {
            return <li key={igKey}>{ igKey }: { props.ingredients[igKey] }</li>
        })
    return (
        <Aux>
            <h3>Your Order</h3>
            <p>Ingridients</p>
            <ul>
                { ingridientSummary }
            </ul>
            <p>{ props.price.toFixed(2) }</p>
            <p>Continue to Checkout?</p>
            <Button btnType="Danger" clicked={ props.purchaseCancelled }>Cancel</Button>
            <Button btnType="Success" clicked={ props.purchaseContinue }>Continue</Button>
        </Aux>
    );
}

export default orderSummary;
