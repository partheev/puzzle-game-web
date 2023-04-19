import React, { FC } from 'react';
import { CustomDialog } from '../CustomDialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { GameInstructionData } from '../../data/gameInstructions';
import { Button } from '@mui/material';

interface Props {
    handleClose: () => void;
}
export const GameInstructions: FC<Props> = ({ handleClose }) => {
    return (
        <CustomDialog handleClose={() => {}}>
            <>
                <DialogTitle id='alert-dialog-title'>
                    Please read instructions carefully before starting game
                </DialogTitle>
                <DialogContent>
                    {GameInstructionData.map((instruction, index) => {
                        return (
                            <div
                                style={{ display: 'flex', columnGap: '0.5rem' }}
                            >
                                <DialogContentText>
                                    {index + 1}.
                                </DialogContentText>
                                <DialogContentText
                                    key={index}
                                    id='alert-dialog-description'
                                >
                                    {instruction}{' '}
                                </DialogContentText>
                            </div>
                        );
                    })}
                </DialogContent>
                <DialogActions
                    sx={{
                        marginX: '1rem',
                        marginBottom: '1rem',
                        display: 'flex',
                        justifyContent: 'space-between',
                    }}
                >
                    <Button variant='text' onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant='contained' onClick={handleClose} autoFocus>
                        Start
                    </Button>
                </DialogActions>
            </>
        </CustomDialog>
    );
};
