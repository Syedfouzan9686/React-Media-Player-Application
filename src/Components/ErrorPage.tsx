import React, { Component } from 'react'
import '../CSS/ErrorPage.css'
import { Link } from 'react-router-dom'


class ErrorPage extends Component {

    

    render() {
        
        return (
            <div className='errordiv'>
                <h2>404 page not Found..!</h2>
                <Link to='/' > Return to Home..</Link>
            </div>
        )
    }
}
export default ErrorPage