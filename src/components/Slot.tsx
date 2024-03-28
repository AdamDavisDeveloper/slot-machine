import { useEffect, useState, ReactElement } from 'react';
import ViteLogo from '/vite.svg';
import HTMLLogo from '/html.svg';
import ReactLogo from '/react.svg';
import NodeLogo from '/nodejs.svg';
import RubyLogo from '/ruby.svg';
import '/src/styles/slot.scss'

const animationSpeed: number = 500;

export default function Slot(props: {
    id: number, // Describes which slot wheel
    machineIsActive: boolean,
}) {
    const { id, machineIsActive } = props;
    const [ slotIsActive, setSlotIsActive ] = useState<boolean>(false);
    const [ currentIndex, setCurrentIndex ] = useState<number>(1);

    const itemDefinitions: SlotItem[] = [
        { id: 1, imgPath: ViteLogo  },
        { id: 2, imgPath: HTMLLogo  },
        { id: 3, imgPath: ReactLogo },
        { id: 4, imgPath: NodeLogo  },
        { id: 5, imgPath: RubyLogo  },
        { id: 6, imgPath: HTMLLogo  },
    ];

    const slotItems: ReactElement[] = itemDefinitions.map(def => CreateSlotItem(def));

    // Interfaces
    interface SlotItem { id: number, imgPath: string };

    // Effect Hooks
    useEffect(() => {
        setSlotIsActive(!!machineIsActive);
    }, [machineIsActive]);

    useEffect(() => {
        if(!slotIsActive) return;
        const timer = setTimeout(() => {
            setCurrentIndex((curr) => (curr + 1) % slotItems.length);
        }, animationSpeed);
        return () => clearTimeout(timer);
    }, [currentIndex, slotIsActive, slotItems.length]);
    

    function getWrappedIndex(index: number, length: number): number {
        if (index < 0) {
            return length - 1;
        }
        if (index >= length) {
            return 0;
        }
        return index;
    };    


    function CreateSlotItem(definition: SlotItem): ReactElement {
        return <img src={definition.imgPath} alt="slot item icon" />;
    };

    //function stopSlotWheel() { setSlotIsActive(false); }

    return (
        <>
            <div className="slot-window">
                <div className="slot">
                    <div className="slot-item">
                        { slotItems[getWrappedIndex(currentIndex - 1, slotItems.length)] }
                    </div>
                    <div className="slot-item">
                        { slotItems[currentIndex] }
                    </div>
                    <div className="slot-item">
                        { slotItems[getWrappedIndex(currentIndex + 1, slotItems.length)] }
                    </div>
                </div>
            </div>
        </>
    )
}