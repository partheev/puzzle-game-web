import React, { FC, useState, useRef, useEffect } from 'react';

interface Props {}

const FieldSize = 5;
let currentAnswerIndex = 0;
const AnswerInputField: FC<Props> = (props): JSX.Element => {
    const [answer, setanswer] = useState<string[]>(
        new Array(FieldSize).fill('')
    );
    const [activeAnswerIndex, setactiveAnswerIndex] = useState(0);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleOnChange = ({
        target,
    }: React.ChangeEvent<HTMLInputElement>): void => {
        const { value } = target;
        const newAnswer = [...answer];
        console.log(target);
        newAnswer[currentAnswerIndex] = !value
            ? ''
            : value.substring(value.length - 1).toUpperCase();

        if (!value) setactiveAnswerIndex(currentAnswerIndex - 1);
        else setactiveAnswerIndex(currentAnswerIndex + 1);

        setanswer(newAnswer);
    };

    const handleOnKeyDown = (
        e: React.KeyboardEvent<HTMLInputElement>,
        index: number
    ) => {
        currentAnswerIndex = index;
        if (e.key === 'Backspace') {
            // e.preventDefault();
            setactiveAnswerIndex(currentAnswerIndex - 1);
        }
    };

    useEffect(() => {
        inputRef.current?.focus();
    }, [activeAnswerIndex]);

    return (
        <div
            style={{
                display: 'flex',
                alignItems: 'center',
                columnGap: '1.5rem',
                marginBottom: '2rem',
            }}
        >
            <h3>Enter word</h3>
            <div>
                {answer.map((_, index) => {
                    return (
                        <React.Fragment key={index}>
                            <input
                                style={{
                                    width: '2.5rem',
                                    height: '3.5rem',
                                    marginRight: '0.5rem',
                                    borderRadius: '10px',
                                    textAlign: 'center',
                                    fontSize: '1.7rem',
                                    outlineColor: 'skyblue',
                                    border: '1px solid gray',
                                }}
                                ref={
                                    index === activeAnswerIndex
                                        ? inputRef
                                        : null
                                }
                                value={answer[index]}
                                onChange={(e) => handleOnChange(e)}
                                onKeyDown={(e) => handleOnKeyDown(e, index)}
                                type='text'
                                className='w-12 h-12 border-2 rounded bg-transparent outline-none text-center font-semibold text-xl spin-button-none border-gray-400 focus:border-gray-700 focus:text-gray-700 text-gray-400 transition'
                            />
                            {index === answer.length - 1 ? null : (
                                <span className='w-2 py-0.5 bg-gray-400' />
                            )}
                        </React.Fragment>
                    );
                })}
            </div>
        </div>
    );
};

export default AnswerInputField;
