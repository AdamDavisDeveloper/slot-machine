import { useEffect, useState } from "react";
import Slot from "./Slot";
import Crossbars from "./Crossbars";
import '/src/styles/machine.scss'

export default function Machine(props: {
    adjustUserCoins: (adjustment: number) => void,
}) {
    const [ machineIsActive, setMachineIsActive ]   = useState<boolean>(false);
    const [ activeSlotID, setActiveSlotID ]         = useState<number>(0);
    const [ wager, setWager ]                       = useState<number>(0);

    const { adjustUserCoins } = props;

    useEffect(() => {
        if(wager === 1) setMachineIsActive(true);
        console.log(wager, machineIsActive);
    }, [wager]);

    useEffect(() => {
        if(activeSlotID === 3) resetMachine();
    }, [activeSlotID]);

    function resetMachine(): void {
        setActiveSlotID(0);
        setWager(0);
        setMachineIsActive(false);
        adjustUserCoins(20); //TODO: this needs to be actual prize amounts.
    }

    function wagerMaxed(): boolean {
        return !!(wager >= 3);
    }

    function stopSlot() { setActiveSlotID((id) => id + 1) };

    return (
        <>
            <div id="Machine">
                <span>{`${wager}`}</span>
                <div id="Slots">
                    <Slot id={1} machineIsActive={machineIsActive} activeSlotID={activeSlotID} />
                    <Slot id={2} machineIsActive={machineIsActive} activeSlotID={activeSlotID} />
                    <Slot id={3} machineIsActive={machineIsActive} activeSlotID={activeSlotID} />
                </div>

                <button className={`${wagerMaxed() ? 'disabled' : ''}`} onClick={() => setWager((wager) => wager + 1)}>{wagerMaxed() ? 'Max' : 'Wager'}</button>


                {/* Crossbars hide behind the slot windows */}
                <Crossbars wager={wager} />
            </div>
            <button id="StopButton" onClick={stopSlot}>Stop</button>
        </>
    );
};