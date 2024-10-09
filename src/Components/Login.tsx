
import React, { Component, FormEventHandler } from 'react'
import '../CSS/Login.css'
import '@fortawesome/fontawesome-free/css/all.min.css';

interface Loginprops_Type {
    isLogin: boolean,
    handleLogin_close: () => void,
    storagehandle: { loginstatus: boolean }
    handleStorage_true: () => void,
}
interface Login_Type {
    gmail: string,
    password: string,
    gmailError: string,
    passwordError: string
}
class Login extends Component<Loginprops_Type, Login_Type> {
    constructor(props: any) {
        super(props)
        this.state = {
            gmail: '',
            password: '',
            gmailError: '',
            passwordError: ''
        }
    }

    clear() {
        this.setState({ gmail: '' })
        this.setState({ password: '' })
        this.setState({ gmailError: '' })
        this.setState({ passwordError: '' })

    }
    componentDidMount(){
        this.clear() 
        console.log("login component")
    }

    handleStorage() {
        const { handleStorage_true, storagehandle } = this.props;

        console.log(storagehandle);

        if (storagehandle.loginstatus) {
            localStorage.setItem('credentials', JSON.stringify(storagehandle));
        }


        // localStorage.setItem('password',this.state.password);
    }
    validate(event:any) {
        event.preventDefault();
       
        const { handleLogin_close, handleStorage_true, storagehandle } = this.props;
        if(this.state.gmail.trim() === '' ){
            this.setState({ gmailError: 'Enter Gmail ' });
            
        }
         if(this.state.password.trim() === ''){
            this.setState({ passwordError: 'Enter password' })
        }
        if(this.state.gmail.length !=0) {
            this.setState({ gmailError: 'Gmail does not match' });
            
        }
        if(this.state.password.length !=0) {
            this.setState({ passwordError: ' password does not match' })
        }

        if (this.state.gmail === 'admin@gmail.com' && this.state.password === 'admin') {
            alert("admin name is valid");
            handleStorage_true();
            
            this.clear(); 
            handleLogin_close();

        }
       
    }
    
    onChangeGmail(event: React.ChangeEvent<HTMLInputElement>) {
        this.setState({ gmail: event.target.value })
    }
    onChangePassword(event: React.ChangeEvent<HTMLInputElement>) {
        this.setState({ password: event.target.value })
    }

    render() {
        const { isLogin, handleLogin_close } = this.props;
        if (!isLogin) {
            return;
        }
        console.log(localStorage.getItem('Gmail'));
        return (
            <div className='login_Overlay'>
                {/* <div className='login_Content'> */}

                <div className='loginContainer'>


                    <form>

                        <div className='logindiv'>
                            <h2 className='login_heading'>Login</h2>
                            <div className='namediv'>
                                <label htmlFor="name">Enter Gmail</label>
                                <input className='gmail' type='text' name='Gmail' value={this.state.gmail} onChange={this.onChangeGmail.bind(this)} />
                                <i className='fa fa-envelope gmail_icon' />
                                {/* <div> */}
                                <p className='gmailerror'>{this.state.gmailError}</p>
                                {/* </div> */}
                            </div>

                            <div className='passworddiv'>
                                <label htmlFor='password'>Enter Password </label>
                                <input type='text' className='password' name='password' value={this.state.password} onChange={this.onChangePassword.bind(this)} />
                                <i className='fa fa-lock gmail_icon' />
                                <p className='gmailerror'>{this.state.passwordError}</p>
                            </div>
                            <button className='submit_btn' type='submit' onClick={(event)=>this.validate(event)}>Submit </button>
                        </div>
                        {/* <button onClick={handleLogin_close}>Close</button> */}
                    </form>

                </div>
                {/* </div> */}
            </div>
        )
    }
}

export default Login