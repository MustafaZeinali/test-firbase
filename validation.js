
export function isNameValid (item){
    const regex = /^[\p{L} ]{2,50}$/u;
    const trimmed = item.trim();
    /*if (trimmed.length<2 || trimmed.length >50){
        return { valid: false, message: " you should be between 2 and 50 letters"}
    }*/
    if(!regex.test(trimmed)){
        return {valid: false , message: "name should only contain letters"}
    }
    return {valid: true, message:""};
}

export function isEmailValid(email){
    // i magonna put code here s oyou need to give me code 
    const regexMail =  /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(typeof email !== "string"){
        return {valid:false , message:"Email must be string"}
    }
    const trimmed = email.trim()
    if(!regexMail.test(trimmed)){
        return {valid: false , meassage: "it is wrong"}
    }
    return {valid:true , messasge:""}
}