import { ShapeProps } from "../../types";

interface InitialCollabRoomState {
    collabRoomId: string;
    collabRoomKey: string;
    collabRoomLaserPoints: number[];
    collabRoomLink: string;
    collabRoomShapes: ShapeProps[];
}

const initialCollabRoomState: InitialCollabRoomState = {
    "collabRoomId": "",
    "collabRoomKey": "",
    "collabRoomLaserPoints": [],
    "collabRoomLink": "",
    "collabRoomShapes": [],
};

export default initialCollabRoomState;
