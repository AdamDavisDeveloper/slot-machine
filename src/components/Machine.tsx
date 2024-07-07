// ------- Regular Imports ------
import { useEffect, useState } from "react";
import Slot from "./Slot";
import Crossbars from "./Crossbars";
import { SlotPatternOne, SlotPatternTwo, SlotPatternThree } from "../Data/Patterns/FR-LG";
import '/src/styles/machine.scss'
// Interfaces
export interface slotItemPositions { id: number, positions: { id: number, currentIndex: number }[] };
export interface MachineRows {
    centerMatch: boolean,
    topMatch: boolean,
    bottomMatch: boolean,
    diagForwardMatch: boolean,
    diagBackwardMatch: boolean,
};

const slotOneItems = (SlotPatternOne);
const slotTwoItems = (SlotPatternTwo);
const slotThreeItems = (SlotPatternThree);


export default function Machine(props: {
    adjustUserCoins: (adjustment: number) => void,
    setCurrentPayout: (payout: number) => void,
    usersCoins: number,
}) {
    const { usersCoins, adjustUserCoins, setCurrentPayout } = props;

    // Slot State
    const [machineIsActive, setMachineIsActive] = useState<boolean>(false);
    const [activeSlotID, setActiveSlotID] = useState<number>(0); // Used to determine which slot to stop + when all slots have been stopped
    const [wager, setWager] = useState<number>(0);
    const [childStates, setChildStates] = useState<any>({});
    const [matchingSlotRowNames, setMatchingSlotRowNames] = useState<Set<string>>(new Set());

    // Effect Hooks
    useEffect(() => {
        if (wager === 1) {
            setMachineIsActive(true);
            setMatchingSlotRowNames(new Set()); // reset flashing rows when new round starts
        }
    }, [wager]);

    useEffect(() => {
        const allSlotsHaveBeenStopped = !!(childStates["3"]);
        if (allSlotsHaveBeenStopped) determineMatchingRows();
    }, [childStates]);


    // Utility Functions
    const addRowNameToSet = (name: string) => {
        setMatchingSlotRowNames(prev => new Set(prev.add(name)))
    };


    function doIndexesMatch(first: number, second: number, third: number): boolean {
        return (first === second && second === third) ? true : false;
    }

    function determineMatchingRows() {
        const slotOne = childStates["1"], slotTwo = childStates["2"], slotThree = childStates["3"];
        if (!slotOne || !slotTwo || !slotThree) {
            console.error("One or more slots have not submitted their positions.");
            return;
        };
        const machineRows: MachineRows = { // TODO: needs renaming?
            centerMatch:        doIndexesMatch(slotOne.positions[1].id, slotTwo.positions[1].id, slotThree.positions[1].id),
            topMatch:           doIndexesMatch(slotOne.positions[0].id, slotTwo.positions[0].id, slotThree.positions[0].id),
            bottomMatch:        doIndexesMatch(slotOne.positions[2].id, slotTwo.positions[2].id, slotThree.positions[2].id),
            diagForwardMatch:   doIndexesMatch(slotOne.positions[2].id, slotTwo.positions[1].id, slotThree.positions[0].id),
            diagBackwardMatch:  doIndexesMatch(slotOne.positions[0].id, slotTwo.positions[1].id, slotThree.positions[2].id),
        };
        determinePayout(machineRows);
    };

    function determinePayout(rows: MachineRows): any {
        const slotOne = childStates["1"]
        let payout: number = 0;

        const allMatchingSlots: number[] = []; // When a matching row is confirmed, the item ID is pushed here

        switch (wager) {
            case 1: {
                if (rows.centerMatch) { allMatchingSlots.push(slotOne.positions[1].id); addRowNameToSet('center') }
            }; break;
            case 2: {
                if (rows.centerMatch) { allMatchingSlots.push(slotOne.positions[1].id); addRowNameToSet('center') }
                if (rows.topMatch) { allMatchingSlots.push(slotOne.positions[0].id); addRowNameToSet('top') }
                if (rows.bottomMatch) { allMatchingSlots.push(slotOne.positions[2].id); addRowNameToSet('bottom') }
            }; break;
            case 3: {
                if (rows.bottomMatch) { allMatchingSlots.push(slotOne.positions[2].id); addRowNameToSet('bottom') }
                if (rows.centerMatch) { allMatchingSlots.push(slotOne.positions[1].id); addRowNameToSet('center') }
                if (rows.topMatch) { allMatchingSlots.push(slotOne.positions[0].id); addRowNameToSet('top') }
                if (rows.diagForwardMatch) { allMatchingSlots.push(slotOne.positions[2].id); addRowNameToSet('diagForward') }
                if (rows.diagBackwardMatch) { allMatchingSlots.push(slotOne.positions[2].id); addRowNameToSet('diagBackward') }
            }; break;
        };

        for (let matchID of allMatchingSlots) {
            switch (matchID) {
                case 1: payout = payout + 6; break;
                case 2: payout = payout + 8; break;
                case 3: payout = payout + 8; break;
                case 4: payout = payout + 15; break;
                case 5: payout = payout + 15; break;
                case 6: payout = payout + 100; break;
                case 7: payout = payout + 300; break;
                // Possible power ups, etc..
                case 8: payout = payout + 0; break;
                case 9: payout = payout + 0; break;
            }
        }
        setCurrentPayout(payout)
        adjustUserCoins(payout);
        resetMachine();
    }

    function resetMachine(): void {
        setActiveSlotID(0);
        setWager(0);
        setCurrentPayout(0);
        setMachineIsActive(false);
        setChildStates({});
    }

    function wagerMaxed(): boolean {
        return !!(wager >= 3);
    }

    function stopSlot() { setActiveSlotID((id) => id + 1) };

    const receiveItemPositions = (slotPositions: slotItemPositions) => {
        setChildStates((prevState: any) => ({ ...prevState, [slotPositions.id]: slotPositions }));
    };

    return (
        <>
            <div id="Machine">
                <div id="Slots">
                    <Slot
                        id={1}
                        activeSlotID={activeSlotID}
                        machineIsActive={machineIsActive}
                        slotItemDefinitions={slotOneItems}
                        submitItemPositions={receiveItemPositions} />
                    <Slot
                        id={2}
                        activeSlotID={activeSlotID}
                        machineIsActive={machineIsActive}
                        slotItemDefinitions={slotTwoItems}
                        submitItemPositions={receiveItemPositions} />
                    <Slot
                        id={3}
                        activeSlotID={activeSlotID}
                        machineIsActive={machineIsActive}
                        slotItemDefinitions={slotThreeItems}
                        submitItemPositions={receiveItemPositions} />
                </div>

                {/* Crossbars hide behind the slot windows */}
                <Crossbars wager={wager} matchingSlotRows={matchingSlotRowNames} />
                <div id="MachineControls">
                    <button
                        className={`${wagerMaxed() ? 'disabled' : ''}`}
                        onClick={() => {
                            if (usersCoins <= 0) {
                                window.alert("You've run out of coins!");
                                adjustUserCoins(23);
                            } else {
                                setWager((wager) => wager + 1);
                                adjustUserCoins(-1);
                            }
                        }}>{wagerMaxed() ? 'Max' : 'Wager'}</button>
                    <button id="StopButton" className={`${machineIsActive ? '' : 'disabled'}`} onClick={stopSlot}>Stop</button>
                </div>
            </div>
        </>
    );
};
