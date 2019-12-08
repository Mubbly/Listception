import * as React from 'react';
import {useState} from "react";
import {AddItemButton} from "./AddItemButton";
import {AddItemInput} from "./AddItemInput";
import { For } from "react-loops";
import "./List.scss";

export const List: React.FC = (): JSX.Element => {
    let [listOfItems, setListOfItems] = useState(['']);
    let [showInput, setShowInput] = useState(false);
    let [newItem, setNewItem] = useState({value: '', timestamp: ''});
    let [errorMessage, setErrorMessage] = useState('');

    return (
        <section className='wrapper'>
            <h1>Listception</h1>
            {showInput && <AddItemInput
                value={newItem.value}
                timestamp={newItem.timestamp}
                listOfItems={listOfItems}
                handleShowing={setShowInput}
                handleInput={setNewItem}
                handleError={setErrorMessage}
                handleSubmit={setListOfItems}/>}
            {errorMessage && <div className='error-message'>{errorMessage}</div>}
            <AddItemButton
                value={showInput}
                handleButton={setShowInput}/>
            <ul className='whole-list'>
                <For of={listOfItems} as={item =>
                    item && <li key={item} value={item}>{item}</li>
                }/>
            </ul>
        </section>
    );
};