import React from 'react';
import {AppBar, Button, Toolbar, Typography} from "@mui/material";
import {Link} from "react-router-dom";
import {styles} from './Navbar.styles';
import {useSelector} from "react-redux";

const Navbar = () => {

    const mortgages = useSelector(state => state.banks.currentMortgage)
    console.log(mortgages)
    return (
        <AppBar position="static">
            <Toolbar style={styles.container}>
                <Typography variant="h6">
                    Mortgage Calculator
                </Typography>
                <div className="links">
                    <Button color="primary"><Link style={styles.link} to={'/'}>Home page</Link></Button>
                    <Button color="primary"><Link style={styles.link} to={'/calculator'}>Calculator page</Link></Button>
                    {mortgages.length ? <Button color="primary"><Link style={styles.link} to={'/mortgages'}>Mortgages</Link></Button> : null}
                </div>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;