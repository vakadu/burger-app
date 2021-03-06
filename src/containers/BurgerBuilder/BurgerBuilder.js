import React, { Component } from 'react';

import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

const INGRIDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}

class BurgerBuilder extends Component{

    constructor(props){
        super(props);
        this.state = {
            ingredients: {
                salad: 0,
                bacon: 0,
                cheese: 0,
                meat: 0
            },
            totalPrice: 4,
            purchasable: false,
            purchasing: false
        }
    }

    updatePurchaseState(ingridients){
        //console.log(ingridients, "ingridients1")
        const sum = Object.keys(ingridients)
            .map(igKey => {
                // console.log(ingridients[igKey], "ingridients[igKey]")
                // console.log(ingridients, "ingridients")
                // console.log(igKey, "igKey")
                return ingridients[igKey]
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0)
        this.setState({ purchasable: sum > 0 })
        //console.log(sum)
    }

    addIngridientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngridients = {
            ...this.state.ingredients
        }
        updatedIngridients[type] = updatedCount;
        const priceAddition = INGRIDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState({ totalPrice: newPrice, ingredients: updatedIngridients })
        this.updatePurchaseState(updatedIngridients)
    }

    removeIngridientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if (oldCount <= 0){
            return;
        }
        const updatedCount = oldCount - 1;
        const updatedIngridients = {
            ...this.state.ingredients
        }
        updatedIngridients[type] = updatedCount;
        const priceDeduction = INGRIDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;
        this.setState({ totalPrice: newPrice, ingredients: updatedIngridients })
        this.updatePurchaseState(updatedIngridients)
    }

    purchaseHandler = () => {
        this.setState({ purchasing: true })
    }

    purchaseCancelled = () => {
        this.setState({ purchasing: false })
    }

    purchaseContinue = () => {
        alert("Continue");
    }

    render(){
        const disabledInfo = {
            ...this.state.ingredients
        };
        for (let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        return(
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={ this.purchaseCancelled }>
                    <OrderSummary
                        price={ this.state.totalPrice }
                        ingredients={ this.state.ingredients }
                        purchaseCancelled={ this.purchaseCancelled }
                        purchaseContinue={ this.purchaseContinue }
                    />
                </Modal>
                <Burger ingredients={ this.state.ingredients }/>
                <BuildControls
                    ingridientAdded={ this.addIngridientHandler }
                    ingridientRemoved={ this.removeIngridientHandler }
                    disabled={ disabledInfo }
                    price={ this.state.totalPrice }
                    purchasable={ this.state.purchasable }
                    purchaseHandler={ this.purchaseHandler }/>
            </Aux>
        );
    }
}

export default BurgerBuilder;
