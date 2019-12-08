import * as React from 'react';
import { Dispatch, SetStateAction } from 'react';

type AddItemButtonProps = {
    value: boolean;
    handleButton: Dispatch<SetStateAction<boolean>>;
};

export const AddItemButton = (props: AddItemButtonProps): JSX.Element => {
    return (
        <button type='button'
                className='add-item-btn'
                onClick={(event): void => {
                    // Set the input visibility to opposite of what it already is. Showing -> hide, hiding -> show.
                    props.handleButton(!props.value);
                }}
        >
            {props.value ? 'Hide input' : 'Add item'}
        </button>
    );
};