import React,{Component} from 'react'
import '../CSS/loginTimeout.css'
import { Link } from 'react-router-dom';

interface Loginprops_Type {
    isloginTimeout:boolean,
    handlecloseLogin:()=>void;
}
class LoginTimeout extends Component<Loginprops_Type>{

    render(){
        const{ isloginTimeout,handlecloseLogin }=this.props;
        if(!isloginTimeout){
            return;
        }
        return(
            <div className='loginoverlay'>
                <div className='logincontent'>
                    <div className='logintext'>
                        
                        <p>Hello, Lets get started!</p>
                        <p>You are almost there! Click the button below to complete signing in</p>
                      <button className='signin_btn'  onClick={handlecloseLogin} >Sign In</button>
                      {/* <Link to='/login'>Login</Link> */}
                        </div>
                </div>

            </div>
        )
    }
}
export default LoginTimeout 