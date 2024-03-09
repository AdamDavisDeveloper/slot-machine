import { useEffect, useState, ReactElement } from 'react';
import ViteLogo from '/public/vite.svg';
import HTMLLogo from '/public/html.svg';
import ReactLogo from '/public/react.svg';
import NodeLogo from '/public/nodejs.svg';
import RubyLogo from '/public/ruby.svg';
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


    function SlotItem(contents: SlotItem): ReactElement {
        return <img src={contents.imgPath} alt="slot item icon" />;
    };

    const slotDefinitions: SlotItem[] = [
        { id: 1, imgPath: ViteLogo },
        { id: 2, imgPath: HTMLLogo },
        { id: 3, imgPath: ReactLogo },
        { id: 4, imgPath: NodeLogo },
        { id: 5, imgPath: RubyLogo },
    ];
    const slotItems: ReactElement[] = slotDefinitions.map(def => SlotItem(def));




    function Engine() {
        while(slotIsActive) {
            for(let i = 0; i < slotItems.length; i++) {
                
            }
        }
    }

    //function stopSlotWheel() { setSlotIsActive(false); }

    return (
        <div className="slot">
            { slotItems.map((item) => {
                return (
                    <div className="slot-item">
                        { item }
                    </div>
                );
              })
            }
        </div>
    )
}