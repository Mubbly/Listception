import * as React from 'react';
import {Dispatch, SetStateAction} from 'react';

type InputData = {
    value: string,
    timestamp: string
}

// TODO: Find if something like this exists
type SetStateFunction<T> = Dispatch<SetStateAction<T>>;

type AddItemInputProps = {
    value: string;
    timestamp: string;
    listOfItems: string[];
    handleInput: Dispatch<SetStateAction<InputData>>;
    handleSubmit: Dispatch<SetStateAction<string[]>>;
    handleShowing: Dispatch<SetStateAction<boolean>>;
    handleError: Dispatch<SetStateAction<string>>;
};

export const AddItemInput = (props: AddItemInputProps): JSX.Element => {
    return (
        <input
            type='text'
            className='add-item-input'
            placeholder='Insert text and press enter'
            ref={input => input && input.focus()}
            value={props.value}
            onChange={(event): void => {
                // Get new item
                const newItem = {
                  value: event.target.value,
                  timestamp: new Date().toLocaleString(),
                };
                // Set new item
                props.handleInput(newItem);
            }}
            onKeyDown={(event) => {
                addNewItemToList(event, props);
            }}
        />
    );
};

const addNewItemToList = (event: any, props: AddItemInputProps): void => {
    const ENTER_KEY = 13;
    let pressedKey = event.which || event.keyCode || 0;

    if (pressedKey === ENTER_KEY) {
        let currentList = props.listOfItems;
        let itemToAdd = props.value;

        // Prevent from adding the same exact item twice
        if (currentList.includes(itemToAdd)) {
            props.handleError('This item is already in the list. Please add another one.');
            return;
        }
        // Update existing list with new item
        let listWithNewItem = currentList.concat(itemToAdd);
        // Display the new list
        props.handleSubmit(listWithNewItem);
        // Initialize the input by removing last data
        let emptyInputData = {value: '', timestamp: ''};
        props.handleInput(emptyInputData);
        // Hide the input (and error if present) again after submit
        props.handleShowing(false);
        props.handleError('');
    }
};