let initialState = false;
const athenticateUser = (state = initialState, action)=>{
    
    switch(action.type){
        case 'CHECK_LOGINS':
            {
                if(action.payload.username ==='admin' && action.payload.password === '123')
                    return state = true;
                else
                    return state = false;
            }
            break;
        case 'FORGET_PASS':
            {
                if(action.payload.email==='m.abdulwahid008@gmail.com')
                    return state = true;
                else
                    return state = false;
            }
            break;
        case 'SIGN_UP':
            {
                if(action.payload.email !== 'm.abdulwahid008@gmail.com')
                    return state = true;
                else
                    return state = false;    
            }
            break;
        default:
            return state;        
    }
}

export default athenticateUser;