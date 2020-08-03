import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom'

import Landing from './pages/Landing';
import TeacherForm from './pages/TeacherForm';
import TeacherList from './pages/Teacher';

function Routes() {
    return (
        <BrowserRouter>
            <Route path="/" component={Landing} exact/>
            <Route path="/study" component={TeacherForm}/>
            <Route path="/give-classes" component={TeacherList}/>


        </BrowserRouter>
    )
}

export default Routes;