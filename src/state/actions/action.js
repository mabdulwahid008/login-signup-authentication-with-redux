export const checkLogins = (data)=>{
    return{
        type : 'CHECK_LOGINS',
        payload: data
    }
}

export const updatePass = (data)=>{
    return{
        type: 'FORGET_PASS',
        payload: data
    }
}

export const signUp = (data)=>{
    return{
        type: 'SIGN_UP',
        payload: data
    }
}