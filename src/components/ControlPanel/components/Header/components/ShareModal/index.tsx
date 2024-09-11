import {
    Box,
    Button,
    Divider,
    Modal,
    Stack,
    TextField,
    Typography
} from "@mui/material";
import { CollabRoomMetadata, DbCollabRoomData } from "../../../../../../types";
import {
    child,
    push,
    ref,
    update
} from "firebase/database";
import { useAppDispatch, useAppSelector } from "../../../../../../state/store";

import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import StopIcon from "@mui/icons-material/Stop";
import encrypt from "../../../../../../utils/encrypt";
import firebase from "../../../../../../firebase";
import { setCollabRoomLink } from "../../../../../../state/collabRoom/reducer";

interface ShareModelProps {
    onClose: (newValue: boolean) => void;
    open: boolean;
}

const ShareModel: React.FC<ShareModelProps> = ({
    onClose,
    open,
}) => {
    const dispatch = useAppDispatch();

    const collabRoomLink= useAppSelector((state) => state.collabRoom.collabRoomLink);
    const localShapes = useAppSelector((state) => state.local.shapes);

    const handleCreateCollabRoom = async () => {
        const newCollabRoomKey = push(child(ref(firebase.db), "rooms")).key;

        if (newCollabRoomKey === null) {
            alert("Could not a collab room. Please try again.");
            return ;
        }

        const newCryptoKey = await window.crypto.subtle.generateKey(
            { "length": 128, "name": "AES-GCM" },
            true,
            ["encrypt", "decrypt"],
        );

        const exportedCryptoKey = (await window.crypto.subtle.exportKey("jwk", newCryptoKey)).k;

        if (exportedCryptoKey === undefined) {
            alert("Could not a collab room. Please try again.");
            return ;
        }

        const newCollabRoomData: DbCollabRoomData = {
            "shapes": localShapes
        };

        encrypt(newCollabRoomData, exportedCryptoKey)
            .then((encryptedData) => {
                const updates: {[key: string]: string} = {};
                updates[`/rooms/${newCollabRoomKey}`] = encryptedData;

                update(ref(firebase.db), updates)
                    .then(() => {
                        const collabRoomMetadata: CollabRoomMetadata = {
                            "collabRoomId": newCollabRoomKey,
                            "collabRoomKey": exportedCryptoKey
                        };

                        const collabRoomMetadataStringified = JSON.stringify(collabRoomMetadata);
                        const collabRoomMetadataBase64 = btoa(collabRoomMetadataStringified);
                        const collabRoomLink = window.location.origin + "/collab-room/" + collabRoomMetadataBase64;

                        console.log("collabRoomLink", collabRoomLink);

                        dispatch(setCollabRoomLink(collabRoomLink));
                    });
            })
            .catch((error) => console.error(error));
    };

    return (
        <Modal
            open={open}
            onClose={() => onClose(false)}
            sx={{ "pointerEvents": "all" }}
        >
            <Box sx={{
                "bgcolor": "background.paper",
                "borderRadius": "10px",
                "boxShadow": "24",
                "left": "50%",
                "p": 4,
                "position": ('absolute' as 'absolute'),
                "py": 6,
                "top": "50%",
                "transform": "translate(-50%, -50%)",
                "width": "35%"
            }}>
                {
                    (collabRoomLink.length > 0)
                        ? <>
                            <Stack spacing={2}>
                                <Typography variant="h4">
                                    Collab Room
                                </Typography>

                                <Typography variant="modelSectionContent" textAlign="left">
                                    Share the below link with others to invite them to your collab room.
                                </Typography>

                                <Stack 
                                    spacing={2} 
                                    direction="row"
                                    display="flex"
                                >
                                    <Stack spacing={0.5} flexGrow={1}>
                                        <Typography variant="subtitle1">Link</Typography>
                                        <TextField fullWidth value={collabRoomLink} size="medium"/>
                                    </Stack>

                                    <Box 
                                        display="flex"
                                        alignItems="flex-end"
                                    >
                                        <Button
                                            variant="contained"
                                            startIcon={<ContentCopyIcon/>}
                                            sx={(theme) => ({
                                                "& .MuiSvgIcon-root": {
                                                    "color": theme.palette.common.white
                                                },
                                                "&:hover": {
                                                    "backgroundColor": theme.palette.primary.dark
                                                },
                                                "backgroundColor": theme.palette.primary.main,
                                                "borderRadius": "5px",
                                                "boxShadow": "none",
                                                "height": "56px",
                                                "pointerEvents": "all",
                                                "textTransform": "capitalize",
                                            })}
                                        >
                                            Copy Link
                                        </Button>
                                    </Box>
                                </Stack>

                                <Divider sx={{ "py": "10px" }}/>

                                <Box
                                    width="100%"
                                    display="flex"
                                    justifyContent="center"
                                    pt={2}
                                >
                                    <Button 
                                        variant="outlined"
                                        color="error"
                                        startIcon={<StopIcon fontSize="large"/>}
                                        sx={{
                                            "borderRadius": "5px", 
                                            "height": "56px",
                                            "textTransform": "capitalize",
                                        }}
                                    >
                                        Stop Session
                                    </Button>
                                </Box>
                            </Stack>
                        </>
                        
                        : <>
                            <Stack spacing={1}>
                                <Typography 
                                    variant="modelSectionHeading"
                                    sx={(theme) => ({ "color": theme.palette.primary.main })}
                                    pb={4}
                                >
                                    Collab Room
                                </Typography>

                                <Typography variant="modelSectionContent">
                                    Create a collaboration room where you can create drawings with others.
                                </Typography>

                                <Typography variant="modelSectionContent">
                                    Click the button below to create an invite.
                                </Typography>
                            </Stack>

                            <Box 
                                width="100%"
                                display="flex"
                                justifyContent="center"
                                mt={6}
                            >
                                <Button
                                    variant="contained"
                                    onClick={handleCreateCollabRoom}
                                    sx={{
                                        "borderRadius": "10px",
                                        "height": "50px", 
                                        "width": "35%" 
                                    }}
                                >
                                    <Typography textTransform="capitalize">
                                        Create a Room
                                    </Typography>
                                </Button>
                            </Box>
                        </>
                }
            </Box>
        </Modal>
    );
};

export default ShareModel;
