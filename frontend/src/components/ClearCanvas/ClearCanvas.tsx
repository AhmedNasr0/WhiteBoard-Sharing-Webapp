import { MutableRefObject, SetStateAction } from "react"

interface IProps{
    canvasRef:MutableRefObject<HTMLCanvasElement | null>
    setElements:React.Dispatch<SetStateAction<number[]>>
}

const ClearCanvasbtn=(props:IProps)=>{
    function handleClearCanvas(){
        const canvas:HTMLCanvasElement | null=props.canvasRef.current
        const context:CanvasRenderingContext2D|null|undefined=canvas?.getContext("2d")
        if(context!=null && canvas !=null){
            context.fill="white" as never
            context.clearRect(0,0,canvas.width,canvas.height);
        }
        props.setElements([]);
    }
    return (
        <>
            <button type="submit" className="btn my-3 btn-danger" onClick={handleClearCanvas}>Clear All</button>
        </>
    )
}
export default ClearCanvasbtn