import React, { Component } from 'react'
import { Route, Router, Routes } from 'react-router-dom'
import Login from './Login'
import ErrorPage from './ErrorPage'



class Main extends Component {


    render() {
        
        return (
            <div>
             <Routes>

                {/* <Route path='/login' element={<Login/>} /> */}
                {/* <Route path='/*' element={<ErrorPage />}></Route> */}
             </Routes>
                <h2>Hello WOrld</h2>
            </div>
        )
    }
}
export default Main