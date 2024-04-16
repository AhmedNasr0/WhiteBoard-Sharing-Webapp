
interface IProps{
    history:number[],
    elements:number[],
    setHistory:React.Dispatch<React.SetStateAction<number[]>>,
    setElements:React.Dispatch<React.SetStateAction<number[]>>,
    
}
const UndoRedo=(props:IProps)=>{
    function undo(){
        if(props.elements.length===1){
            props.setElements([]);
        }
        props.setHistory((prvHistory)=>[
            ...prvHistory,
            props.elements[props.elements.length-1]
        ])
        props.setElements((prvElement)=>
            prvElement.slice(0,prvElement.length-1)
        )
    }
    function redo(){
        props.setElements((prvElement)=>[
            ...prvElement,
            props.history[props.history.length-1]
        ])
        props.setHistory((prvHistory)=>
            prvHistory.slice(0,prvHistory.length-1)
        )
    }
    return(
        <>
            <button className="btn my-3 btn-primary" disabled={props.elements.length===0} onClick={undo}>Undo</button>
            <button className="btn my-3 border text-primary border-primary" disabled={props.history.length<1} onClick={redo}>Redo</button>
        </>
    )
}
export default UndoRedo