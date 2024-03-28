import { useEffect, useState, ReactElement } from 'react';
import ViteLogo from '/vite.svg';
import HTMLLogo from '/html.svg';
import ReactLogo from '/react.svg';
import NodeLogo from '/nodejs.svg';
import RubyLogo from '/ruby.svg';
import HaskellLogo from '/haskell.svg';
import RustLogo from '/rust.svg';
import FirebaseLogo from '/firebase.svg';
import SpinAgain from '/spinagain.svg';
import '/src/styles/slot.scss'

import { slotItemPosition } from './Machine';

export default function Slot(props: {
    id: number, // Describes which slot wheel
    machineIsActive: boolean, // Set true when user wagers 1 or more coin
    activeSlotID: number,
    submitSlotPositions: (data: slotItemPosition) => void,
}) {
    const { id, machineIsActive, activeSlotID, submitSlotPositions } = props;
    const [ slotIsActive, setSlotIsActive ] = useState<boolean>(false);
    const [ currentIndex, setCurrentIndex ] = useState<currentIndex>({id: 1, currentIndex: 0});
    const animationSpeed: number = 40 * id; // Each subsequent slot spins slower than the previous.

    const itemDefinitions: SlotItem[] = [
        //id: reference to item type/value -- imgPath: Vite import of image (top of file)
        { id: 1, imgPath: ViteLogo      },
        { id: 2, imgPath: HTMLLogo      },
        { id: 3, imgPath: ReactLogo     },
        { id: 4, imgPath: NodeLogo      },
        { id: 5, imgPath: RubyLogo      },
        { id: 6, imgPath: HaskellLogo   },
        { id: 7, imgPath: RustLogo      },
        { id: 8, imgPath: FirebaseLogo  },
        { id: 9, imgPath: SpinAgain     },
    ];

    const slotItems: ReactElement[] = itemDefinitions.map(def => CreateSlotItem(def));

    // ------------- Interfaces -------------
    interface SlotItem      { id: number, imgPath: string };
    interface currentIndex  { id: number, currentIndex: number };

    // ------------- Effect Hooks -------------
    useEffect(() => {
        setSlotIsActive(!!machineIsActive);
    }, [machineIsActive]);


    useEffect(() => {
        if(activeSlotID === 0) return;
        if(activeSlotID >= id) {
            const wrappedIndex = (index: number) => (index + itemDefinitions.length) % itemDefinitions.length;
            submitSlotPositions({
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