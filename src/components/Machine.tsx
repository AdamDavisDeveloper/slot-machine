import Slot from "./Slot";
import '/src/styles/machine.scss'

export default function Machine(props: any) {
    return (
        <div id="Machine">
            <Slot />
            <Slot />
            <Slot />
        </div>
    );
};