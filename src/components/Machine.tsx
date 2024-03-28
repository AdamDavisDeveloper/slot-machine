import { useEffect, useState } from "react";
import Slot from "./Slot";
import Crossbars from "./Crossbars";
import '/src/styles/machine.scss'

export interface slotItemPosition { id: number, positions: {id: number, currentIndex: number}[] };

export default function Machine(props: {
    adjustUserCoins: (adjustment: number) => void,
}) {
    const [ machineIsActive, setMachineIsActive ]   = useState<boolean>(false);
    const [ activeSlotID, setActiveSlotID ]         = useState<number>(0); // Used to determine which slot to stop + when all slots have been stopped
    const [ wager, setWager ]                       = useState<number>(0);
    const [ childStates, setChildStates ]           = useState<any>({});

    
    const { adjustUserCoins } = props;
    
    useEffect(() => {
        if(wager === 1) setMachineIsActive(true);
        console.log(wager, machineIsActive);
    }, [wager]);

    useEffect(() => {
        console.log(childStates)
        if(childStates["3"]) calculateWinnings();
    }, [childStates]);

    function doIndexesMatch(first: number, second: number, third: number): boolean {
        return (first === second && second === third) ? true : false;
    }

    function calculateWinnings() {
        const slotOne = childStates["1"], slotTwo = childStates["2"], slotThree = childStates["3"];

        if (!slotOne || !slotTwo || !slotThree) {
            console.error("One or more slots have not submitted their positions.");
            return;
        }
        console.log("Calculating winnings....");
        console.log(slotOne, slotTwo, slotThree)
        const machineRows = {
            center:         doIndexesMatch(slotOne.positions[1].id, slotTwo.positions[1].id, slotThree.positions[1].id),
            top:            doIndexesMatch(slotOne.positions[0].id, slotTwo.positions[0].id, slotThree.positions[0].id),
            bottom:         doIndexesMatch(slotOne.positions[2].id, slotTwo.positions[2].id, slotThree.positions[2].id),
            diagForward:    doIndexesMatch(slotOne.positions[2].id, slotTwo.positions[1].id, slotThree.positions[0].id),
            diagBackward:   doIndexesMatch(slotOne.positions[0].id, slotTwo.positions[1].id, slotThree.positions[2].id),
        };
        console.log("machineRows:", machineRows);
        console.log("diagBack row:", slotOne.positions[0].id, slotTwo.positions[1].id, slotThree.positions[2].id);
        if(wager === 1) {
            if(machineRows.center) {
                console.log("Center win", slotOne.positions[1].id);
            }
            else console.log("No win :(");
            
        }
        if(wager === 2) {
            if(machineRows.center)  console.log("Center win", slotOne.positions[1].id);
            if(machineRows.top)     console.log("Top win", slotOne.positions[0].id);
            if(machineRows.bottom)  console.log("Bottom win", slotOne.positions[2].id);
            else console.log("No win :(");
        }
        if(wager === 3) {
            if(machineRows.center)          console.log("Center win", slotOne.positions[1].id);
            if(machineRows.top)             console.log("Top win", slotOne.positions[0].id);
            if(machineRows.bottom)          console.log("Bottom win", slotOne.positions[2].id);
            if(machineRows.diagForward)     console.log("DiagFW win", slotOne.positions[2].id);
            if(machineRows.diagBackward)    console.log("DiagBW win", slotOne.positions[2].id);
            else console.log("No win :(");
        }
        //resetMachine();
    };
    
    function resetMachine(): void {
        setActiveSlotID(0);
        setWager(0);
        setMachineIsActive(false);
        setChildStates({});
        adjustUserCoins(20); //TODO: this needs to be actual prize amounts and moved elsewhere.
    }
    
    function wagerMaxed(): boolean {
        return !!(wager >= 3);
    }
    
    function stopSlot() { setActiveSlotID((id) => id + 1) };

    const receiveChildState = (slotPositions: slotItemPosition) => {
        setChildStates((prevState: any) => ({ ...prevState, [slotPositions.id]: slotPositions }));
    };

    return (
        <>
            <div id="Machine">
                <span>{`${wager}`}</span>
                <div id="Slots">
                    <Slot id={1} machineIsActive={machineIsActive} activeSlotID={activeSlotID} submitSlotPositions={receiveChildState} />
                    <Slot id={2} machineIsActive={machineIsActive} activeSlotID={activeSlotID} submitSlotPositions={receiveChildState} />
                    <Slot id={3} machineIsActive={machineIsActive} activeSlotID={activeSlotID} submitSlotPositions={receiveChildState} />
                </div>

                <button className={`${wagerMaxed() ? 'disabled' : ''}`} onClick={() => setWager((wager) => wager + 1)}>{wagerMaxed() ? 'Max' : 'Wager'}</button>


                {/* Crossbars hide behind the slot windows */}
                <Crossbars wager={wager} />
            </div>
            <button id="StopButton" onClick={stopSlot}>Stop</button>
        </>
    );
};