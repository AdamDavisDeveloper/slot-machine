import { useEffect, useState } from 'react';
import ViteLogo from '/public/vite.svg';
import '/src/styles/slot.scss'

export default function Slot(props: {
    machineIsActive: boolean,
}) {
    const { machineIsActive } = props;
    const [ slotIsActive, setSlotIsActive ] = useState<boolean>(false);

    // Effect Hooks
    useEffect(() => {
        setSlotIsActive(!!machineIsActive);
    }, [machineIsActive]);

    useEffect(() => {
        console.log("Item: ", items[0]);
    }, []);


    const slotItems = [
        { id: 1, imgPath: ViteLogo },
        { id: 2, imgPath: ViteLogo },
        { id: 3, imgPath: ViteLogo },
    ];
    const items: any[] = [ 
        SlotItem(slotItems[0]),
        SlotItem(slotItems[1]),
        SlotItem(slotItems[2]),
    ];

    function SlotItem(contents: {id: number, imgPath: string}) {
        return (
            <div className="slot-item">
                <p>{contents.id}</p>
            </div>
        )
    };



    function slotWheelEngine() {
        while(slotIsActive) {
            for(let i = 0; i < items.length; i++) {
                
            }
        }
    }

    //function stopSlotWheel() { setSlotIsActive(false); }

    return (
        <div className="slot">
            
        </div>
    )
}