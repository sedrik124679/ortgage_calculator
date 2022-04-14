import React from 'react';
import {useSelector} from "react-redux";
import BankItem from "./BankItem/BankItem";
import {styles} from './BanksList.styles';
import {Button, Collapse, Container, Typography} from "@mui/material";
import {AddBox} from "@mui/icons-material";
import {TransitionGroup} from "react-transition-group";

const BanksList = ({setCurrentId, setToggler}) => {

    const banks = useSelector(state => state.banks.banks)

    if (banks.length === 0) return <Button sx={{display: 'flex', margin: '0 auto', mt: '2rem', mb: '2rem'}} onClick={() => setToggler(true)} variant={"outlined"} startIcon={<AddBox color={'success'}/>}>New bank</Button>

    // return (
    //     <>
    //         <Button sx={{display: 'flex', margin: '0 auto', mt: '2rem', mb: '2rem'}} onClick={() => setToggler(true)} variant={"outlined"} startIcon={<AddBox color={'success'}/>}>
    //             New bank
    //         </Button>
    //         <Container style={styles.banksList}>
    //             {banks.map(bank => <BankItem bank={bank} setToggler={setToggler} setCurrentId={setCurrentId} key={bank.id}/>)}
    //         </Container>
    //     </>
    // );

    return (
        <>
            <Button sx={{display: 'flex', margin: '0 auto', mt: '2rem', mb: '2rem'}} onClick={() => setToggler(true)} variant={"outlined"} startIcon={<AddBox color={'success'}/>}>
                New bank
            </Button>
            <Container style={styles.banksList}>
                <TransitionGroup style={styles.banksList}>
                    {banks.map(bank => <Collapse key={bank.id}><BankItem bank={bank} setToggler={setToggler} setCurrentId={setCurrentId} /></Collapse>)}
                </TransitionGroup>
            </Container>
        </>
    );
};

export default BanksList;