import React, { useEffect, useState } from 'react';
import { useClockStyles } from './useClockSyles';

function AnalaogClock() {
    const [londonTime, setLondonTime] = useState({
        hourDegree: 0,
        minuteDegree: 0,
        secondsDegree: 0
    });
    const [pstTime, setPstTime] = useState({
        hourDegree: 0,
        minuteDegree: 0,
        secondsDegree: 0
    });
    const londonClockStyles = useClockStyles(londonTime.hourDegree, londonTime.minuteDegree, londonTime.secondsDegree);
    const pstClockStyles = useClockStyles(pstTime.hourDegree, pstTime.minuteDegree, pstTime.secondsDegree);

    function getTime() {
        const now = new Date();

        //london time
        const londonTime = new Date(now.toLocaleString('en-GB', { timeZone: 'Europe/London' }));
        const londonHours = londonTime.getHours();
        const londonMinutes = londonTime.getMinutes();
        const londonSeconds = londonTime.getSeconds();

        //pacific time
        const pstTime = new Date(now.toLocaleString('en-US', { timeZone: 'America/Los_Angeles' }));
        const pstHours = pstTime.getHours();
        const pstMinutes = pstTime.getMinutes();
        const pstSeconds = pstTime.getSeconds();

        setLondonTime({
            hourDegree: (londonHours / 12) * 360 + (londonMinutes / 60) * 30,
            minuteDegree: (londonMinutes / 60) * 360 + (londonSeconds / 60) * 6,
            secondsDegree: (londonSeconds / 60) * 360
        });
        setPstTime({
            hourDegree: (pstHours / 12) * 360 + (pstMinutes / 60) * 30,
            minuteDegree: (pstMinutes / 60) * 360 + (pstSeconds / 60) * 6,
            secondsDegree: (pstSeconds / 60) * 360
        });
    }

    useEffect(() => {
        const interval = setInterval(getTime, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div>
            <h1>PST Time Zone</h1>

            <div style={pstClockStyles.clockContainer}>
                <div style={pstClockStyles.clockCenter}></div>
                <div style={pstClockStyles.hourHand} ></div>
                <div style={pstClockStyles.minuteHand} ></div>
                <div style={pstClockStyles.secondsHand}></div>
            </div>
            <h1>London, UK Time Zone</h1>

            <div style={londonClockStyles.clockContainer}>
                <div style={londonClockStyles.clockCenter}></div>
                <div style={londonClockStyles.hourHand} ></div>
                <div style={londonClockStyles.minuteHand} ></div>
                <div style={londonClockStyles.secondsHand}></div>
            </div>
        </div>
    );
}

export default AnalaogClock;