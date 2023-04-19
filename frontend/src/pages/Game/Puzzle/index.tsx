import React, { FC, useState } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const DragItem: FC<{ text: string; index: number }> = ({ text, index }) => {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: 'image',
        item: { index },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    }));

    console.log(isDragging);
    return (
        <div
            ref={drag}
            style={{
                cursor: 'pointer',
                opacity: isDragging ? 0 : 1,
                backgroundColor: 'red',
                border: '1px solid black',
                height: '10rem',
                width: '10rem',
                fontSize: '3rem',
                textAlign: 'center',
            }}
        >
            {text}
        </div>
    );
};
const Item: FC<{
    children: JSX.Element;
    index: number;
    swap: (index1: number, index2: number) => void;
}> = ({ children, swap, index }) => {
    const [{ isOver }, drop] = useDrop(() => ({
        accept: 'image',
        drop: (item: { index: number }) => swap(item.index, index),
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
        }),
    }));
    return (
        <div
            ref={drop}
            style={{
                border: '1px solid red',
                height: '10rem',
                width: '10rem',
            }}
        >
            {children}
        </div>
    );
};

export const Puzzle = () => {
    const [state, setstate] = useState(['A', 'B', 'C', 'D']);

    const swap = (index1: number, index2: number) => {
        setstate((prevstate) => {
            const newState = [...prevstate];
            const temp = newState[index1];
            newState[index1] = newState[index2];
            newState[index2] = temp;
            return newState;
        });
    };
    return (
        <DndProvider backend={HTML5Backend}>
            <div style={{ display: 'flex', flexWrap: 'wrap', width: '20rem' }}>
                {state.map((item, index) => {
                    return (
                        <Item index={index} swap={swap}>
                            <DragItem index={index} text={item} />
                        </Item>
                    );
                })}
            </div>
        </DndProvider>
    );
};
