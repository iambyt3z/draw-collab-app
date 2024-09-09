import "@fontsource-variable/inter"
import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="room/:roomId" element={<Home/>}/>
            <Route path="drawing/:drawingId" element={<Home/>}/>
        </Routes>
    );
};

export default App;
