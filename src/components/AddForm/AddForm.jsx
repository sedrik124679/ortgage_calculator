import React, {useEffect, useState} from 'react';
import {Button, Paper, TextField, Typography} from "@mui/material";
import {styles} from './AddForm.styles';
import {useDispatch, useSelector} from "react-redux";
import {addNewBank, updateBank} from "../../store/banksSlice";
import {Close} from "@mui/icons-material";
import {v4 as uuidv4} from 'uuid';

const AddForm = ({setToggler, currentId, setCurrentId}) => {

    const [postData, setPostData] = useState({
        id: uuidv4(),
        BankName: '',
        InterestRate: '',
        MaximumLoan: '',
        MinimumDownPayment: '',
        LoanTerm: ''
    });

    const dispatch = useDispatch()
    const bank = useSelector(state => currentId ? state.banks.banks.find(bank => bank.id === currentId) : null)

    useEffect(() => {
        if (bank) {
            setPostData(bank)
        }
    }, [currentId, bank])


    const submitHandler = (e) => {
        e.preventDefault()

        let fieldsEmpty = postData.BankName === '' || postData.InterestRate === '' || postData.LoanTerm === '' || postData.MaximumLoan === '' || postData.MinimumDownPayment === ''
        let fieldsLessZero = postData.InterestRate <= 0 || postData.MaximumLoan <= 0 || postData.MinimumDownPayment <= 0 || postData.LoanTerm <= 0

        if (postData.InterestRate > 100 || postData.MinimumDownPayment > 100) {
            alert('Percent can not be higher than 100')
            return
        }

        if (postData.MaximumLoan.length > 14) {
            alert('Maximum loan is very big')
            return
        }

        if (fieldsLessZero) {
            if (fieldsEmpty) {
                alert('Some of your fields is empty')
                return
            }
            alert('Fields can not be less than 0')
            return
        }

        if (currentId) {
            dispatch(updateBank(postData))
            setToggler(false)
            setCurrentId(null)
        } else {
            dispatch(addNewBank(postData))
            setToggler(false)
        }
    }

    return (
        <Paper sx={{width: '50%', m: '0 auto', mt: '2rem', position: 'relative'}}>
            <Close sx={{position: 'absolute', right: '0', cursor: 'pointer'}}
                   onClick={() => setToggler(false)}>close</Close>
            <form autoComplete={'off'} noValidate style={styles.formStyles} onSubmit={submitHandler}>
                <Typography sx={{mt: '10px'}} align={'center'}>{currentId ? 'Update' : 'Create new'} bank</Typography>
                <TextField sx={{mt: '10px'}} required label="Bank name" type={'text'}
                           value={postData.BankName}
                           onChange={(e) => setPostData({...postData, BankName: e.target.value})}/>
                <TextField sx={{mt: '10px'}} required label="Interest rate" type={"number"}
                           value={postData.InterestRate}
                           onChange={(e) => setPostData({...postData, InterestRate: e.target.value})}/>
                <TextField sx={{mt: '10px'}} required label="Maximum loan" type={"number"}
                           value={postData.MaximumLoan}
                           onChange={(e) => setPostData({...postData, MaximumLoan: e.target.value})}/>
                <TextField sx={{mt: '10px'}} required label="Minimum down payment" type={"number"}
                           value={postData.MinimumDownPayment}
                           onChange={(e) => setPostData({...postData, MinimumDownPayment: e.target.value})}/>
                <TextField sx={{mt: '10px'}} required label="Loan term" type={"number"}
                           value={postData.LoanTerm}
                           onChange={(e) => setPostData({...postData, LoanTerm: e.target.value})}/>
                <Button type={"submit"} sx={{mt: '10px'}} variant={"contained"} color={'primary'}
                        size={'large'}>Create</Button>
            </form>
        </Paper>
    );
};

export default AddForm;