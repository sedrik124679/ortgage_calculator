import React from 'react';
import {useSelector} from "react-redux";
import {Container, Grid, Typography} from "@mui/material";

const MortgagesPages = () => {

    const mortgages = useSelector(state => state.banks.currentMortgage)
    return (
        <Container>
            <Grid container sx={{mt: '1rem'}} style={mortgages.length === 1 ? {display: 'flex', justifyContent: 'center'} : null}>
                {mortgages.map(mortgage => {
                    return <Grid item sx={{ mt: '2rem', bgcolor: '#7f7b7b', p: '1rem', borderRadius: '15px'}} md={6} xs={12} key={mortgage.id}>
                        <Typography align={'center'}>{mortgage.bankName}</Typography>
                        <Typography align={'center'}>Loan Term - {mortgage.loanTerm} month</Typography>
                        <Typography align={'center'}>Interest rate - {mortgage.interestRate} %</Typography>
                        <Typography align={'center'}>Every month - {mortgage.everyMonth} $</Typography>
                        <Typography align={'center'}>Sum - {mortgage.sum} $</Typography>
                    </Grid>
                })}
            </Grid>
        </Container>
    );
};

export default MortgagesPages;