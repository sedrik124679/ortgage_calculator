import React from 'react';
import {Card, CardActions, CardContent, IconButton, Typography} from "@mui/material";
import { Edit, HighlightOff } from "@mui/icons-material";
import {styles} from './BankItem.styles'
import {useDispatch} from "react-redux";
import {deleteBankFromState} from "../../../store/banksSlice";

const BankItem = ({bank, setCurrentId, setToggler}) => {
    const {id, BankName, InterestRate, MaximumLoan, MinimumDownPayment, LoanTerm} = bank
    const dispatch = useDispatch()
    const updateHandler = (id) => {
        setCurrentId(id)
        setToggler(true)
    }


    return (
        <Card style={styles.bankItem}>
            <CardContent>
                <Typography variant={'h5'} component={'h1'} align={'center'}>{BankName}</Typography>
                <Typography variant={'h6'} component={'p'} align={'center'}>Interest Rate - {InterestRate} %</Typography>
                <Typography variant={'h6'} component={'p'} align={'center'}>Maximum Loan - {MaximumLoan} $</Typography>
                <Typography variant={'h6'} component={'p'} align={'center'}>Minimum Down Payment - {MinimumDownPayment} %</Typography>
                <Typography variant={'h6'} component={'p'} align={'center'}>Loan Term - {LoanTerm} month</Typography>
            </CardContent>
            <CardActions sx={{justifyContent: 'end'}}>
                <IconButton onClick={() => updateHandler(id)}>
                    <Edit color={'primary'}/>
                </IconButton>
                <IconButton onClick={() => dispatch(deleteBankFromState(id))}>
                    <HighlightOff color={'error'}/>
                </IconButton>
            </CardActions>
        </Card>
    );
};

export default BankItem;