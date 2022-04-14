import React, {useEffect, useState} from 'react';
import {
    Button,
    Container,
    FormControl,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    TextField,
    Typography
} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {calculateValue} from "../../helpers/helpers";
import {addNewMortgage} from "../../store/banksSlice";

const MortgageCalculator = () => {

    const dispatch = useDispatch()

    const banks = useSelector(state => state.banks.banks)
    const [select, setSelect] = useState('')
    const selectedBank = useSelector(state => select ? state.banks.banks.find(bank => bank.BankName === select) : null)
    const [initianLoan, setInitianLoan] = useState('')
    const [downPayment, setDownPayment] = useState('')

    useEffect(() => {
        if (selectedBank) {
            setDownPayment(initianLoan * (selectedBank.MinimumDownPayment / 100))
        }
    }, [selectedBank, initianLoan])
    const handleSubmit = (e) => {
        e.preventDefault()
        if (selectedBank) {
            if (Number(initianLoan) > Number(selectedBank.MaximumLoan) || initianLoan <= 0) {
                alert('You entered invalid data')
            } else {
                let variable = initianLoan - downPayment
                let sum = calculateValue(variable, selectedBank.InterestRate, selectedBank.LoanTerm)
                dispatch(addNewMortgage({
                    id: `${selectedBank.id}-mortgage`,
                    bankName: selectedBank.BankName,
                    interestRate: selectedBank.InterestRate,
                    everyMonth: Math.ceil(sum),
                    sum: Math.ceil(sum * selectedBank.LoanTerm + downPayment),
                    loanTerm: selectedBank.LoanTerm
                }))
                alert('New credit')
                clear()
            }
        } else {
            alert('Select bank')
        }
    }

    const clear = () => {
        setInitianLoan('')
        setSelect('')
        setDownPayment('')
    }

    return (
        <Container sx={{mt: '2rem'}} style={selectedBank ? {display: "flex", flexDirection: 'column-reverse'} : null}>
            <Paper sx={{p: '2rem'}}>
                <Typography variant={'h5'} align={'center'}>Calculate form</Typography>
                <form onSubmit={handleSubmit} style={{marginTop: '1rem'}}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Select bank</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label="Age"
                            value={select}
                            onChange={(e) => setSelect(e.target.value)}
                        >
                            {banks.map(bank => <MenuItem key={`${bank.id}-select`}
                                                         value={bank.BankName}>{bank.BankName}</MenuItem>)}
                        </Select>
                    </FormControl>
                    <TextField required fullWidth sx={{mt: '1rem'}} label={'Initial loan'} type={'number'}
                               value={initianLoan} onChange={(e) => setInitianLoan(e.target.value)}/>
                    <TextField disabled fullWidth sx={{mt: '1rem'}} type={'number'} label={'Down payment'}
                               value={downPayment ? downPayment : '0'}/>
                    <Button fullWidth size={'large'} sx={{mt: '1rem'}} color={'secondary'} variant={'contained'}
                            type={'submit'}>Calculate</Button>
                </form>
            </Paper>
            {selectedBank
                ? <Paper sx={{mb: '1rem'}}>
                    <Typography align={'center'}>Selected bank</Typography>
                    <Typography align={'center'}>{selectedBank.BankName}</Typography>
                    <Typography align={'center'}>Max Loan - {selectedBank.MaximumLoan} $</Typography>
                    <Typography align={'center'}>Min down payment - {selectedBank.MinimumDownPayment} %</Typography>
                    <Typography align={'center'}>Interest rate - {selectedBank.InterestRate} %</Typography>
                </Paper>
                : null
            }
        </Container>
    );
};

export default MortgageCalculator;