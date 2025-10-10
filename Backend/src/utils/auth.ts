import bcrypt from  'bcrypt'


export const hashcontrasena =async (contrasena:string)=>{
    const salt = await bcrypt.genSalt(10)
    return await bcrypt.hash(contrasena,salt)
}

export const checkContrasena =async (contrasena:string,hash:string) =>{
    

    return await bcrypt.compare(contrasena,hash)
    
    
}