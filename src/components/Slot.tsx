import { useEffect, useState, ReactElement } from 'react';
import ViteLogo from '/public/vite.svg';
import '/src/styles/slot.scss'

export default function Slot(props: {
    machineIsActive: boolean,
}) {
    const { machineIsActive } = props;
    const [ slotIsActive, setSlotIsActive ] = useState<boolean>(false);

    // Interfaces
    interface SlotItem { id: number, imgPath: string };

    // Effect Hooks
    useEffect(() => {
        setSlotIsActive(!!machineIsActive);
    }, [machineIsActive]);

    useEffect(() => {
        console.log("Item: ", slotItems[0]);
    }, []);


    const slotDefinitions: SlotItem[] = [
        { id: 1, imgPath: ViteLogo },
        { id: 2, imgPath: ViteLogo },
        { id: 3, imgPath: ViteLogo },
    ];
    const slotItems: ReactElement[] = [ 
        SlotItem(slotDefinitions[0]),
        SlotItem(slotDefinitions[1]),
        SlotItem(slotDefinitions[2]),
    ];

    function SlotItem(contents: SlotItem): ReactElement {
        return (
            <div className="slot-item">
                <p>{contents.id}</p>
            </div>
        )
    };



    function slotWheelEngine() {
        while(slotIsActive) {
            for(let i = 0; i < slotItems.length; i++) {
                
            }
        }
    }

    //function stopSlotWheel() { setSlotIsActive(false); }

    return (
        <div className="slot">
            
        </div>
    )
}