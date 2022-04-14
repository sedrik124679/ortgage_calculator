import {createSlice} from "@reduxjs/toolkit";

const banksSlice = createSlice({
    name: 'banks',
    initialState: {
        banks: [],
        currentMortgage: []
    },
    reducers: {
        getBanksFromJSON(state, action) {
            state.banks = action.payload
        },
        addNewBank(state, action) {
            state.banks.push(action.payload)
        },
        deleteBankFromState(state, action) {
            state.banks = state.banks.filter(bank => bank.id !== action.payload)
        },
        updateBank(state, action) {
            state.banks = state.banks.map(bank => bank.id === action.payload.id ? action.payload : bank)
        },
        addNewMortgage(state, action) {
            state.currentMortgage.push(action.payload)
        }
    }
})

export const {getBanksFromJSON, addNewBank, deleteBankFromState, updateBank, addNewMortgage} = banksSlice.actions;

export default banksSlice.reducer