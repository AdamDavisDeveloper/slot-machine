import { useEffect, useState, ReactElement } from 'react';
import { SlotItem } from './Machine';
import { slotItemPositions } from './Machine';
import { itemDefinitions } from './Machine';
import '/src/styles/slot.scss'

export default function Slot(props: {
    id: number, // Describes which slot wheel
    machineIsActive: boolean, // Set true when user wagers 1 or more coin
    activeSlotID: number,
    submitItemPositions: (data: slotItemPositions) => void,
}) {
    // ------------- States -------------
    const { id, machineIsActive, activeSlotID, submitItemPositions } = props;
    const [ slotIsActive, setSlotIsActive ] = useState<boolean>(false);
    const [ currentIndex, setCurrentIndex ] = useState<currentIndex>({id: 1, currentIndex: 0});

    const animationSpeed: number = 40 * id; // Each subsequent slot spins slower than the previous.
    const slotItems: ReactElement[] = itemDefinitions.map(def => CreateSlotItem(def));

    // ------------- Interfaces -------------
    interface currentIndex  { id: number, currentIndex: number };

    // ------------- Effect Hooks -------------
    useEffect(() => {
        setSlotIsActive(!!machineIsActive);
    }, [machineIsActive]);


    useEffect(() => {
        if(activeSlotID === 0) return;
        if(activeSlotID >= id) {
            const wrappedIndex = (index: number) => (index + itemDefinitions.length) % itemDefinitions.length;
            submitItemPositions({
                id: id, 
                positions: [
                    { id: itemDefinitions[wrappedIndex(currentIndex.currentIndex - 1)].id, currentIndex: currentIndex.currentIndex - 1}, 
                    { id: itemDefinitions[wrappedIndex(currentIndex.currentIndex)].id, currentIndex: currentIndex.currentIndex},
                    { id: itemDefinitions[wrappedIndex(currentIndex.currentIndex + 1)].id, currentIndex: currentIndex.currentIndex + 1},
                ]
            });
        }
        setSlotIsActive(!(activeSlotID >= id));
    }, [activeSlotID, currentIndex]);
    

    useEffect(() => {
        if(!slotIsActive) return;
        const timer = setTimeout(() => {
            setCurrentIndex((prevState: currentIndex) => ({
                id: itemDefinitions[(prevState.currentIndex + 1) % slotItems.length].id,
                currentIndex: (prevState.currentIndex + 1) % slotItems.length
            }));
            //setCurrentIndex((curr) => (curr + 1) % slotItems.length);
        }, animationSpeed);
        return () => clearTimeout(timer);
    }, [currentIndex, slotIsActive, slotItems.length]);
    

    // ------------- Utility Functions -------------
    function getWrappedIndex(index: number, length: number): number {
        if (index < 0) return length - 1;
        if (index >= length) return 0;
        return index;
    };    


    function CreateSlotItem(definition: SlotItem): ReactElement {
        return <img key={definition.id} src={definition.imgPath} alt="slot item icon" />;
    };

    return (
        <>
            <div className="slot-window">
                <div className="slot">
                    <div className="slot-item">
                        { slotItems[getWrappedIndex(currentIndex.currentIndex - 1, slotItems.length)] }
                    </div>
                    <div className="slot-item">
                        { slotItems[currentIndex.currentIndex] }
                    </div>
                    <div className="slot-item">
                        { slotItems[getWrappedIndex(currentIndex.currentIndex + 1, slotItems.length)] }
                    </div>
                </div>
            </div>
        </>
    )
}