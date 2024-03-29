//import { useState, useEffect } from 'react';
import '/src/styles/machine.scss'

export default function Crossbars(props: {
    wager: number,
    matchingSlotRows: any,
}) {
    const { wager, matchingSlotRows } = props;

    function crossbarFlashing(type: string) {
        return matchingSlotRows.has(type) ? 'flashing' : '';
    }

    function crossbarActive(requiredWager: number) {
        return wager >= requiredWager ? 'bar-active' : '';
    }

    return (
        <div id="Crossbars">
            <div id="CB-2" className={`crossbar horizontal-2 ${ crossbarActive(2) } ${crossbarFlashing('top')} `}></div>
            <div id="CB-1" className={`crossbar horizontal-1 ${ crossbarActive(1) } ${crossbarFlashing('center')}       `}></div>
            <div id="CB-4" className={`crossbar diag-forward ${ crossbarActive(3) } ${crossbarFlashing('diagForward')}  `}></div>
            <div id="CB-5" className={`crossbar diag-backward ${ crossbarActive(3) } ${crossbarFlashing('diagBackward')}`}></div>
            <div id="CB-3" className={`crossbar horizontal-3 ${ crossbarActive(2) } ${crossbarFlashing('bottom')}       `}></div>
        </div>
    );
};