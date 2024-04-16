/* eslint-disable @typescript-eslint/no-explicit-any */
import { MouseEvent, MutableRefObject, useEffect, useLayoutEffect, useState } from "react"
import rough from "roughjs"
import IUser from "../../interfaces/Iuser"
import { Socket } from "socket.io-client"
import { RoughGenerator } from "roughjs/bin/generator"
import { RoughCanvas } from "roughjs/bin/canvas"
// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface Iprops{
    canvasRef: MutableRefObject<HTMLCanvasElement | null>|null,
    contextRef:MutableRefObject<CanvasRenderingContext2D|undefined | null>|null,
    color:string,
    elements:any,
    setElements:any,
    tool:string,
    user:IUser|null ,
    socket:Socket
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const rough_Generator:RoughGenerator= rough.generator()

const WhiteBoard=(props:Iprops)=>{
    const [img,setImg]=useState('');
    useEffect(()=>{
        props.socket.on("whiteboardDataResponse",(data)=>{
            setImg(data.img);
        })
    })

    if(!props.user?.isPresenter){
        return(
            <div className="w-100 rounded-1 h-100 border border-dark border-2 overflow-hidden">
                <img src={img} alt="real time app" style={{height:window.innerHeight*2 }} />
            </div>
        )
    }

    const [IsDrawing,setIsDrawing]=useState(false)
    
    useEffect(()=>{
        const canvas:HTMLCanvasElement|undefined|null=props.canvasRef?.current 
        const context:CanvasRenderingContext2D|undefined|null=canvas?.getContext("2d")
        if(canvas){
            canvas.width=window.innerWidth*2 
            canvas.height=window.innerHeight*2 
        }
        if(context){
            context.strokeStyle=props.color ;
            context.lineWidth=2
            context.lineCap="round"
        }
        if(props.contextRef!=null || props.contextRef!=undefined) props.contextRef.current=context
    },[])
    useLayoutEffect(()=>{
        if(props.canvasRef?.current!=null&&props.contextRef?.current!=null && props.contextRef?.current!=undefined && props.canvasRef?.current!=undefined){
            const roughGen:RoughCanvas=rough.canvas(props.canvasRef.current);
            
            if(props.elements.length >0 ){
                props.contextRef.current.clearRect(0,0,props.canvasRef.current.width,props.canvasRef.current.height);
            }

            props.elements.forEach((element:any)=>{
                if(element.type === "pencil")
                    roughGen.linearPath(element.path,{stroke:element.stroke ,strokeWidth:1,roughness:0});
                else if(element.type==="line")
                    roughGen.draw(roughGen.line(element.offsetX,element.offsetY,element.width,element.height,{stroke:element.stroke ,strokeWidth:1,roughness:0}));
                else if(element.type==="rectangle")
                    roughGen.draw(roughGen.rectangle(element.offsetX,element.offsetY,element.width,element.height,{stroke:element.stroke ,strokeWidth:1,roughness:0}));
                }
            )
        const canvasImage=props.canvasRef.current.toDataURL();
        props.socket.emit("whiteBoardData",canvasImage);    
        }
    },[props.elements])
    

    function startDrawing(e:MouseEvent<HTMLDivElement>){
        const {offsetX,offsetY}=e.nativeEvent 
        if(props.tool==="pencil"){
            props.setElements(
                (prevElement:any) =>[...prevElement,{
                    type:"pencil",
                    offsetX,
                    offsetY,
                    path:[[offsetX,offsetY]],
                    stroke:props.color
                    }
                ]
            )
        }
        else if(props.tool==="line"){
            props.setElements(((prevElement:any) =>[...prevElement,{
                type:"line",
                offsetX,
                offsetY,
                width:offsetX,
                height:offsetY,
                stroke:props.color
            }]))
        }
        else if(props.tool==="rectangle"){
            props.setElements(((prevElement:any) =>[...prevElement,{
                type:"rectangle",
                offsetX,
                offsetY,
                width:0,
                height:0,
                stroke:props.color
            }]))
        }
        setIsDrawing(true)
    }
    function finishDrawing(){
        if(props.contextRef?.current!=null || props.contextRef?.current!=undefined) props.contextRef.current.closePath()
        setIsDrawing(false)
    }
    function drawing(e:MouseEvent<HTMLDivElement>){
        if(IsDrawing){
            const {offsetX,offsetY}=e.nativeEvent 
            if(props.tool==="pencil"){
                const {path} = props.elements[props.elements.length-1] as any;
                const newPath=[...path,[offsetX,offsetY]]
                props.setElements(((prevElement:any) =>
                    prevElement.map((ele:any,index:number)=>{
                        if(index === props.elements.length-1){
                            return {
                                ...ele ,
                                path:newPath
                            }
                        }
                        else return ele 
                    })
                ))
            }
            if(props.tool==="line"){
                props.setElements(((prevElement:any) =>
                    prevElement.map((ele:any,index:number)=>{
                        if(index === props.elements.length-1){
                            return {
                                ...ele ,
                                width:offsetX,
                                height:offsetY
                            }
                        }else return ele 
                    })
                ))
            }
            if(props.tool==="rectangle"){
                props.setElements(((prevElement:any) =>
                    prevElement.map((ele:any,index:number)=>{
                        if(index === props.elements.length-1){
                            return {
                                ...ele ,
                                width:offsetX-ele.offsetX,
                                height:offsetY-ele.offsetY
                            }
                        }else return ele 
                    })
                ))
            }
        }
    }

    return(
        <>
            <div className="w-100 h-100 border border-dark border-2 overflow-hidden"
                onMouseDown={startDrawing}
                onMouseUp={finishDrawing}
                onMouseMove={drawing}
            >
            <canvas  ref={props.canvasRef}/>
            </div>
        </>
    )
}
export default WhiteBoard