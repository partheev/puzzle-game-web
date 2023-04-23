import React from 'react';
import { CustomDialog } from '../CustomDialog';
import {
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
} from '@mui/material';
import { useAppDispatch } from '../../hooks/redux';
import { gameStart, showResumeGamePopup } from '../../store/slices/gameSlice';
import { useNavigate } from 'react-router-dom';
export const ResumeGame = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const handleNewGame = () => {
        navigate('/game');
        dispatch(gameStart());
        dispatch(showResumeGamePopup(false));
    };
    const handleResumeGame = () => {
        navigate('/game');
        dispatch(showResumeGamePopup(false));
    };

    const handleCancel = () => {
        dispatch(showResumeGamePopup(false));
    };
    return (
        <CustomDialog handleClose={() => {}}>
            <>
                <DialogTitle id='alert-dialog-title'>
                    Do you want to resume the puzzle?{' '}
                </DialogTitle>
                <DialogContent>
                    By resuming you can start the puzzle from wherever you ended
                    last time. Or you can choose to start new game
                </DialogContent>
                <DialogActions>
                    <div
                        style={{
                            width: '100%',
                            display: 'flex',
                            justifyContent: 'space-between',
                        }}
                    >
                        <Button sx={{ width: '20%' }} onClick={handleCancel}>
                            CANCEL
                        </Button>
                        <div>
                            <Button onClick={handleNewGame}>
                                START NEW GAME
                            </Button>
                            <Button onClick={handleResumeGame}>RESUME</Button>
                        </div>
                    </div>
                </DialogActions>
            </>
        </CustomDialog>
    );
};
