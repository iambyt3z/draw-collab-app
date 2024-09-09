import { useParams } from "react-router-dom";
import Canvas from "../../components/Canvas"
import ControlPanel from "../../components/ControlPanel"
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setDrawingId, setRoomId } from "../../state/app/reducer";

const Home = () => {
    const dispatch = useDispatch();
    let { roomId, drawingId } = useParams();
    
    useEffect(() => {
        if (roomId !== undefined) {
            dispatch(setRoomId(roomId));
        }

        if (drawingId !== undefined) {
            dispatch(setDrawingId(drawingId));
        }
    }, [])

    return (
        <>
            <ControlPanel/>
            <Canvas/>
        </>
    );
};

export default Home;
