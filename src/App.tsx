import "@fontsource-variable/inter"

import { Box } from "@mui/material"
import Header from "./components/Header"
import Canvas from "./components/Canvas"

function App() {
    return (
        <Box height="100vh">
            <Header/>

            <Canvas/>
        </Box>
    )
}

export default App
