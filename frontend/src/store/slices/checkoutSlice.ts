import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import type { Product } from "../../types/product";

import type { CheckoutForm } from "../../types/checkout";

import type { Transaction } from "../../types/transaction";

interface CheckoutState {

    selectedProduct: Product | null;
    customer: CheckoutForm | null;

    transaction: Transaction  | null;
    isOpen: boolean;

}

const initialState: CheckoutState = {

    selectedProduct: null,
    isOpen: false,
    customer: null,
    transaction: null,

};

const checkoutSlice = createSlice({

    name: "checkout",

    initialState,

    reducers: {

        setSelectedProduct(state, action: PayloadAction<Product>) {

            state.selectedProduct = action.payload;

        },

        clearSelectedProduct(state) {

            state.selectedProduct = null;

        },
        openModal(state) {

            state.isOpen = true;

        },

        closeModal(state) {

            state.isOpen = false;

        },

        setCustomer(state, action: PayloadAction<CheckoutForm>) {

            state.customer = action.payload;

        },

        setTransaction(state, action: PayloadAction<Transaction>) {

            state.transaction = action.payload;

        },

    }

});

export const {

    setSelectedProduct,
    clearSelectedProduct,
    openModal,
    closeModal,
    setCustomer,
    setTransaction,

} = checkoutSlice.actions;

export default checkoutSlice.reducer;