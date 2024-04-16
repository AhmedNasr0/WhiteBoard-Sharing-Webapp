function uuid():string{
    const S4=()=>{
      return (((Math.random()+1)*0x10000)|0).toString(16).substring(1);
    }
    return (
      S4()+S4()+'-'+S4()+'-'+S4()+'-'+S4()+'-'+S4()+S4()+S4()
    )
}

export default uuid