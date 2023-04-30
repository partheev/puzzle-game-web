import React, { FC, useState } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { Alert, useMediaQuery } from '@mui/material';
import { TouchBackend } from 'react-dnd-touch-backend';
import { HTML5Backend } from 'react-dnd-html5-backend';

import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { changeImageOrder } from '../../store/slices/gameSlice';
import { puzzleData } from '../../data/puzzleData';
import { compareArrays } from '../../utils/utils';
import { detectMob } from '../../utils/detectMob';

const IMAGE_SIZE = '10rem';
const SMALL_IMAGE_SIZE = '5.5rem';
interface PuzzzleProps {
    pictureIds: number[];
}
const Picture: FC<{ pictureId: number; index: number }> = ({
    pictureId,
    index,
}) => {
    const isSmallScreen = useMediaQuery('(max-width:600px)');

    const [{ isDragging }, drag] = useDrag(() => ({
        type: 'image',
        item: { index },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    }));
    const levelIndex = useAppSelector((state) => state.game.currentLevelIndex);

    const pictureUrl = puzzleData[levelIndex].images.find(
        (image) => image.id === pictureId
    )?.url;
    return (
        <div
            ref={drag}
            style={{
                cursor: 'pointer',
                opacity: isDragging ? 0 : 1,
            }}
        >
            <img
                style={{
                    width: isSmallScreen ? SMALL_IMAGE_SIZE : IMAGE_SIZE,
                    marginBottom: '-4px',
                }}
                src={pictureUrl}
                alt='puzzleimage'
            />
        </div>
    );
};
const DropArea: FC<{
    children: JSX.Element;
    index: number;
    isCorrect: boolean;
}> = ({ children, index, isCorrect }) => {
    const isSmallScreen = useMediaQuery('(max-width:600px)');

    const dispatch = useAppDispatch();
    const [{ isOver }, drop] = useDrop(() => ({
        accept: 'image',
        drop: (item: { index: number }) => swap(item.index, index),
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
        }),
    }));

    const swap = (src: number, dest: number) => {
        // if (isCorrect) return;
        dispatch(
            changeImageOrder({
                srcIndex: src,
                destIndex: dest,
            })
        );
    };
    return (
        <div
            ref={drop}
            style={{
                border: '1px solid ' + (isCorrect ? 'green' : 'red'),
                width: isSmallScreen ? SMALL_IMAGE_SIZE : IMAGE_SIZE,
            }}
        >
            {children}
        </div>
    );
};

export const Puzzle: FC<PuzzzleProps> = ({ pictureIds }) => {
    const isSmallScreen = useMediaQuery('(max-width:600px)');
    const isMobile = detectMob();
    const currentLevelIndex = useAppSelector(
        (state) => state.game.currentLevelIndex
    );
    const currentImagesOrder = useAppSelector(
        (state) => state.game.currentImagesOrder
    );
    const correctImagesOrder = puzzleData[currentLevelIndex].correctImagesOrder;

    const isCorrect = compareArrays(currentImagesOrder, correctImagesOrder);
    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
        >
            <div style={{ marginBottom: '1rem' }}>
                {isCorrect ? (
                    <Alert severity='success'>
                        Picture arrangement is perfect. Now guess the word.
                    </Alert>
                ) : (
                    <Alert severity='error'>
                        Incorrect arrangement of pictures. Arrange pictures
                        properly to enter the word
                    </Alert>
                )}
            </div>
            <DndProvider
                backend={isMobile ? TouchBackend : HTML5Backend}
                options={isMobile ? { enableMouseEvents: true } : {}}
            >
                <div
                    style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        width: `${
                            (isSmallScreen ? 5.5 : 10) *
                            puzzleData[currentLevelIndex].size
                        }rem`,
                    }}
                >
                    {pictureIds.map((id, index) => {
                        return (
                            <DropArea
                                key={currentLevelIndex + ' ' + id + ' ' + index}
                                isCorrect={isCorrect}
                                index={index}
                            >
                                <Picture index={index} pictureId={id} />
                            </DropArea>
                        );
                    })}
                </div>
            </DndProvider>
        </div>
    );
};
