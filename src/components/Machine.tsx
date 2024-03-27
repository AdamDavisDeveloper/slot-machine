import { useEffect, useState } from "react";
import Slot from "./Slot";
import '/src/styles/machine.scss'

export default function Machine(props: any) {
    const [ machineIsActive, setMachineIsActive ]   = useState<boolean>(false);
    const [ activeSlotID, setActiveSlotID ]         = useState<number>(0);
    const [ wager, setWager ]                       = useState<number>(0);


    useEffect(() => {
        if(wager === 1) setMachineIsActive(true);
    }, [wager]);

    useEffect(() => {
        console.log(machineIsActive);
    }, [machineIsActive]);

    return (
        <div id="Machine">
            <span>{`${wager}`}</span>
            <div id="Slots">
                <Slot id={1} machineIsActive={machineIsActive} />
                <Slot id={2} machineIsActive={machineIsActive} />
                <Slot id={3} machineIsActive={machineIsActive} />
            </div>
            {
                wager <3 && 
                <button onClick={() => setWager((wager) => wager + 1)}>Wager</button>
            }
            {/* <button onClick={() => }>Stop</button> */}
        </div>
    );
};