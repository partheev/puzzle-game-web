import React, { FC } from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { puzzleData } from '../data/puzzleData';

const steps = ['Easy', 'Easy', 'Medium', 'Medium', 'Hard'];

interface Props {
    activeStep: number;
}
export const GameLevelStepper: FC<Props> = ({ activeStep }) => {
    return (
        <Box sx={{ width: '100%' }}>
            <Stepper alternativeLabel activeStep={activeStep}>
                {puzzleData.map((level, index) => {
                    const stepProps: { completed?: boolean } = {};
                    if (activeStep > index) {
                        stepProps.completed = true;
                    }
                    return (
                        <Step key={level.levelIndex}>
                            <StepLabel>{level.difficultyLevel}</StepLabel>
                        </Step>
                    );
                })}
            </Stepper>
        </Box>
    );
};
