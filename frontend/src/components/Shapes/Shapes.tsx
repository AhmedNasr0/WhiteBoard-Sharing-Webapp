import { ChangeEvent, Dispatch } from "react"

interface IProps{
    tool:string,
    setTool:Dispatch<React.SetStateAction<string>>
}
const Shapes=(props:IProps)=>{

    function handleOnChange(e:ChangeEvent<HTMLInputElement>){
        props.setTool(e.currentTarget.value);
    }
    return(
        <>
            <div className="pencil d-flex gap-1 justify-content-center align-items-center ">
                <p className="m-0">Pencil</p>
                <input type="radio" name="shapes" value="pencil" checked={props.tool=='pencil'} onChange={handleOnChange} />
            </div>
            <div className="Line d-flex gap-1 justify-content-center align-items-center ">
                <p className="m-0">Line</p>
                <input type="radio" name="shapes" value="line" checked={props.tool=='line'} onChange={handleOnChange} />
            </div>
            <div className="Rectangle d-flex gap-1 justify-content-center align-items-center ">
                <p className="m-0">Rectangle</p>
                <input type="radio" name="shapes" value="rectangle" checked={props.tool=='rectangle'} onChange={handleOnChange} />
            </div>
        </>
    )
}
export default Shapes