import { useEffect, useState } from 'react';
import '/src/styles/slot.scss'

export default function Slot(props: any) {
    const SlotItem = (contents: string) => {
        return (
            <div className="slot-item">
                <p>{contents}</p>
            </div>
        )
    };

    const [ slotIsActive, setSlotIsActive ] = useState(true);

    const items: any[] = [ 
        SlotItem("1"),
    ];


    function slotWheelEngine() {
        while(slotIsActive) {
            for(let i = 0; i < items.length; i++) {
                
            }
        }
    }

    useEffect(() => {
        console.log("Item: ", items[0]);
    }, []);

    //function stopSlotWheel() { setSlotIsActive(false); }

    return (
        <div className="slot">
            
        </div>
    )
}