import logo from './logo.svg';
import './App.css';
import CCDC from "./components/CCDC";
import {Route, Routes} from "react-router-dom";
import CCDCCreate from "./components/CCDCCreate";
function App() {
    return (
        <>
            <Routes>
                <Route path={"/ccdc"} element={<CCDC/>}></Route>
                <Route path={"/ccdc/create"} element={<CCDCCreate/>}></Route>
            </Routes>
        </>
    );
}

export default App;
