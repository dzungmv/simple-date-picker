'use client';

import { useEffect, useRef, useState } from 'react';

interface DatePickerProps {
    callback: (date: string) => void;
}

export default function DatePicker({ callback }: DatePickerProps) {
    const [day, setDay] = useState<string>('');
    const [month, setMonth] = useState<string>('');
    const [year, setYear] = useState<string>('');

    const dayBoxRef = useRef<HTMLDivElement>(null);
    const monthBoxRef = useRef<HTMLDivElement>(null);
    const yearBoxRef = useRef<HTMLDivElement>(null);

    const [dayBox, setDayBox] = useState<boolean>(false);
    const [monthBox, setMonthBox] = useState<boolean>(false);
    const [yearBox, setYearBox] = useState<boolean>(false);

    const days = Array.from(Array(31), (_, i) => i + 1);
    const months = Array.from(Array(12), (_, i) => i + 1);
    const startYear = 1929;
    const endYear = new Date().getFullYear();
    const years = Array.from(
        { length: endYear - startYear },
        (_, i) => startYear + i + 1
    );

    useEffect(() => {
        if (day && month && year) {
            const date = `${day}/${month}/${year}`;
            callback(date);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [day, month, year]);

    useEffect(() => {
        const clickOutSide = (e: any) => {
            if (dayBoxRef.current && !dayBoxRef.current.contains(e.target)) {
                setDayBox(false);
            }
        };

        document.addEventListener('mousedown', clickOutSide);

        return () => {
            document.removeEventListener('mousedown', clickOutSide);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dayBoxRef.current]);

    useEffect(() => {
        const clickOutSide = (e: any) => {
            if (
                monthBoxRef.current &&
                !monthBoxRef.current.contains(e.target)
            ) {
                setMonthBox(false);
            }
        };

        document.addEventListener('mousedown', clickOutSide);

        return () => {
            document.removeEventListener('mousedown', clickOutSide);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [monthBoxRef.current]);

    useEffect(() => {
        const clickOutSide = (e: any) => {
            if (yearBoxRef.current && !yearBoxRef.current.contains(e.target)) {
                setYearBox(false);
            }
        };

        document.addEventListener('mousedown', clickOutSide);

        return () => {
            document.removeEventListener('mousedown', clickOutSide);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [yearBoxRef.current]);
    return (
        <div className='w-full flex items-center gap-2'>
            <div className='w-full relative'>
                <span
                    className='pl-2 py-2 border rounded-lg flex items-center justify-between hover:bg-gray-200 cursor-pointer select-none'
                    onClick={() => setDayBox((prev) => !prev)}
                >
                    {day ? day : 'Day'}
                </span>
                {dayBox && (
                    <div
                        ref={dayBoxRef}
                        className=' absolute top-[100%] bg-white shadow-sm w-full rounded-md mt-1 border py-1 transition-colors h-[300px] overflow-auto'
                    >
                        {days.map((item: number, index: number) => {
                            return (
                                <div
                                    className='w-full hover:bg-gray-300 p-1 px-2 py-2 cursor-pointer text-sm'
                                    onClick={() => {
                                        setDay(item.toString());
                                        setDayBox(false);
                                    }}
                                    key={index}
                                >
                                    {item}
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
            <div className='w-full relative'>
                <span
                    className='pl-2 py-2 border rounded-lg flex items-center justify-between hover:bg-gray-200 cursor-pointer select-none'
                    onClick={() => setMonthBox((prev) => !prev)}
                >
                    {month ? month : 'Month'}
                </span>
                {monthBox && (
                    <div
                        ref={monthBoxRef}
                        className=' absolute top-[100%] bg-white shadow-sm w-full rounded-md mt-1 border py-1 transition-colors h-[300px] overflow-auto'
                    >
                        {months.map((item: number, index: number) => {
                            return (
                                <div
                                    className='w-full hover:bg-gray-300 p-1 px-2 py-2 cursor-pointer text-sm'
                                    onClick={() => {
                                        setMonth(item.toString());
                                        setMonthBox(false);
                                    }}
                                    key={index}
                                >
                                    {item}
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>

            <div className='w-full relative'>
                <span
                    className='pl-2 py-2 border rounded-lg flex items-center justify-between hover:bg-gray-200 cursor-pointer select-none'
                    onClick={() => setYearBox((prev) => !prev)}
                >
                    {year ? year : 'Year'}
                </span>
                {yearBox && (
                    <div
                        ref={yearBoxRef}
                        className=' absolute top-[100%] bg-white shadow-sm w-full rounded-md mt-1 border py-1 transition-colors h-[300px] overflow-auto'
                    >
                        {years.map((item: number, index: number) => {
                            return (
                                <div
                                    className='w-full hover:bg-gray-300 p-1 px-2 py-2 cursor-pointer text-sm'
                                    onClick={() => {
                                        setYear(item.toString());
                                        setYearBox(false);
                                    }}
                                    key={index}
                                >
                                    {item}
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}
