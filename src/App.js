import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getBanksFromJSON} from "./store/banksSlice";
import data from './data.json'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import BanksManagement from "./components/Pages/BanksManagement";
import Navbar from "./components/UI/Navbar/Navbar";
import MortgageCalculator from "./components/Pages/MortgageCalculator";
import MortgagesPages from "./components/Pages/MortgagesPages";

function App() {

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getBanksFromJSON(data))
    }, [dispatch])

    const [toggler, setToggler] = useState(false)

    const mortgages = useSelector(state => state.banks.currentMortgage)

    return (
        <BrowserRouter>
            <Navbar toggler={toggler} setToggler={setToggler} />
            <Routes>
                <Route path={'/'} element={<BanksManagement toggler={toggler} setToggler={setToggler} />} />
                <Route path={'/calculator'} element={<MortgageCalculator />} />
                {mortgages.length ? <Route path={'/mortgages'} element={<MortgagesPages />} /> : null}
            </Routes>
        </BrowserRouter>
    );
}

export default App;
