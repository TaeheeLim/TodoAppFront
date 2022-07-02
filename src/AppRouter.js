import React from 'react';
import "./index.css";
import App from './App';
import Login from './Login';
import SignUp from './SignUP';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import { Box, Typography } from '@material-ui/core';

function Copyright(){
    return (
        <Typography variant='body2' color="textSecondary" align="center">
            {"Copyright "}
            fsoftwareengineer, {new Date().getFullYear()}
            {"."}
        </Typography>
    );
}

class AppRouter extends React.Component {
    render(){
        return (
            <div>
                <Router>
                    <div>
                        <Routes>
                            <Route path="/login" element={<Login />} />
                            <Route path='/' element={<App />} />
                            <Route path='/signup' element={<SignUp />}/>
                        </Routes>
                    </div>
                    <Box mt={5}>
                        <Copyright />
                    </Box>
                </Router>
            </div>
        )
    }
}

export default AppRouter;