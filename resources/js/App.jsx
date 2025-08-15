import React from "react";
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';

//LAYOUTS
import LayoutPublic from "./layouts/LayoutPublic";
import LayoutClient from "./layouts/LayoutClient";
import LayoutAdmin from "./layouts/LayoutAdmin";

//Public
import PageHome from "./pagepublic/PageHome";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";

//AUTH
import ProtectedRoutes from "./pageauth/ProtectedRoutes";
import Login from "./pageauth/Login";
import Register from "./pageauth/Register";

//ADMIN
import PanelAdmin from "./pageadmin/PanelAdmin";
import UserAll from "./pageadmin/UserAll";

//CLIENT
import PanelClient from "./pageclient/PanelClient";
import UserUpdate from "./pageadmin/UserUpdate";
import CategoriaAll from "./pageadmin/CategoriaAll";
import CategoriaStore from "./pageadmin/CategoriaStore";
import CategoriaUpdate from "./pageadmin/CategoriaUpdate";

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LayoutPublic/>}>
                    <Route index element={<PageHome/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/register" element={<Register/>}/>
                </Route>
                <Route element={<ProtectedRoutes/>}>
                    <Route path="/admin" element={<LayoutAdmin/>}>
                        <Route index element={<PanelAdmin/>}/>
                        <Route path="user" element={<UserAll/>}/>
                        <Route path="user/edit/:id" element={<UserUpdate/>}/>
                        <Route path="categoria" element={<CategoriaAll/>}/>
                        <Route path="categoria/create" element={<CategoriaStore/>}/>
                        <Route path="categoria/edit/:id" element={<CategoriaUpdate/>}/>
                    </Route>
                    <Route path="/client" element={<LayoutClient/>}>
                        <Route index element={<PageHome/>}/>
                        <Route index element={<PanelClient/>}/>
                    </Route>
                </Route>
            </Routes>
        </Router>
    );
}

export default App


if (document.getElementById('example')) {
    const Index = ReactDOM.createRoot(document.getElementById("example"));

    Index.render(
            <App/>
    )
}
