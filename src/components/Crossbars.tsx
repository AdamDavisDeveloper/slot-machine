import '/src/styles/machine.scss'

export default function Crossbars(props: {
    wager: number,
}) {
    const { wager } = props;

    function crossbarActive(requiredWager: number) {
        return wager >= requiredWager ? 'bar-active' : '';
    }

    return (
        <div id="Crossbars">
            <div id="CB-2" className={`crossbar horizontal-2 ${ crossbarActive(2) }`}></div>
            <div id="CB-1" className={`crossbar horizontal-1 ${ crossbarActive(1) }`}></div>
            <div id="CB-4" className={`crossbar diag-forward ${ crossbarActive(3) }`}></div>
            <div id="CB-5" className={`crossbar diag-backward ${ crossbarActive(3) }`}></div>
            <div id="CB-3" className={`crossbar horizontal-3 ${ crossbarActive(2) }`}></div>
        </div>
    );
};