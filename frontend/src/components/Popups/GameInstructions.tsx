import React, { FC } from 'react';
import { CustomDialog } from '../CustomDialog';
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { GameInstructionData } from '../../data/gameInstructions';
import { Button } from '@mui/material';

interface Props {
    handleClose: () => void;
    isStartButton?: boolean;
    handleStart?: () => void;
}
export const GameInstructions: FC<Props> = ({
    handleClose,
    handleStart,
    isStartButton,
}) => {
    return (
        <CustomDialog handleClose={() => {}}>
            <>
                <DialogTitle id='alert-dialog-title'>
                    Please read instructions carefully before starting game
                </DialogTitle>
                <DialogContent>
                    {GameInstructionData.map((instruction, index) => {
                        return (
                            <>
                                <div
                                    style={{
                                        display: 'flex',
                                        columnGap: '0.5rem',
                                    }}
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
                                {index === 1 && (
                                    <div
                                        style={{
                                            margin: '0.5rem 0',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'space-between',
                                        }}
                                    >
                                        <img
                                            width={'40%'}
                                            src='/images/image-chunks-preview.png'
                                            alt='preview'
                                        />
                                        <DoubleArrowIcon fontSize='large' />
                                        <img
                                            width={'40%'}
                                            src='/images/engineer-preview.jpg'
                                            alt='preview'
                                        />
                                    </div>
                                )}
                            </>
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
                    {isStartButton && (
                        <Button
                            variant='contained'
                            onClick={handleStart}
                            autoFocus
                        >
                            Start
                        </Button>
                    )}
                </DialogActions>
            </>
        </CustomDialog>
    );
};
