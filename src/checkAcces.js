const checkAccess =()=>{
    if(localStorage.getItem("Acces")) return true;
    else return false;
}

export default checkAccess