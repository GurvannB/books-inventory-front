import {Box, Button, Divider, Modal, Typography} from "@mui/material";

type Props = {
    open: boolean,
    title: string,
    message: string,
    onClose: VoidFunction,
    cancelLabel?: string,
    onCancel: VoidFunction,
    confirmLabel?: string,
    onConfirm: VoidFunction
}

export default function ConfirmModal({open, title, message, onClose, cancelLabel, onCancel, confirmLabel, onConfirm}: Props) {
    return (
        <Modal open={open}
               onClose={onClose}
               aria-labelledby="modal-modal-title"
               aria-describedby="modal-modal-description">
            <Box sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 500,
                bgcolor: 'background.paper',
                border: '2px solid #000',
                boxShadow: 24,
                p: 4,
                outline: 'none'
            }}>
                <div className='flex flex-col gap-4'>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        {title}
                    </Typography>
                    <Typography id="modal-modal-description" sx={{mt: 2}}>
                        {message}
                    </Typography>
                    <Divider />
                    <div className='flex gap-2 justify-center'>
                        <Button variant='contained'
                                color='secondary'
                                className='!shadow-none'
                                sx={{fontWeight: 'bold'}}
                                onClick={onCancel}>
                            {cancelLabel ?? 'Annuler'}
                        </Button>
                        <Button variant='contained'
                                color='error'
                                className='!shadow-none'
                                sx={{fontWeight: 'bold'}}
                                onClick={onConfirm}>
                            {confirmLabel ?? 'Confirmer'}
                        </Button>
                    </div>
                </div>
            </Box>
        </Modal>
    );
}