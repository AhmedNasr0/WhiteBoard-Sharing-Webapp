import { ChangeEvent } from "react"

interface IProps{
    setColor: React.Dispatch<React.SetStateAction<string>>
}
const Colors=(props:IProps)=>{
    function handleonChange(e:ChangeEvent<HTMLInputElement>){
        props.setColor(e.currentTarget.value)
    }
    return(
        <>
            <div className="d-flex gap-1 justify-content-center align-items-center">
                <p className="m-0">Set Color: </p>
                <input type="color" className="p-1 rounded" onChange={handleonChange}/>
            </div>
        </>
    )
}
export default Colors 