import React, { FC } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';

interface Props {
    handleClose: () => void;
    children: JSX.Element;
}
export const CustomDialog: FC<Props> = ({ children, handleClose }) => {
    return (
        <div>
            <Dialog
                open={true}
                onClose={handleClose}
                aria-labelledby='alert-dialog-title'
                aria-describedby='alert-dialog-description'
            >
                {children}
            </Dialog>
        </div>
    );
};
