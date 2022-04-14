import React, {useState} from 'react';
import BanksList from "../BanksList/BanksList";
import AddForm from "../AddForm/AddForm";

const BanksManagement = ({toggler, setToggler}) => {

    const [currentId, setCurrentId] = useState(null)

    return (
        <div>
            {!toggler
                ? <BanksList setCurrentId={setCurrentId} setToggler={setToggler}/>
                : <AddForm setToggler={setToggler} currentId={currentId} setCurrentId={setCurrentId}/>
            }
        </div>
    );
};

export default BanksManagement;