import { IModalEditProp } from '@/app/interfaces/IUsersServices';
import { UserServices } from '@/app/services/UserServices';
import { GlobalContext } from '@/context/GlobalContext';
import DeleteIcon from '@mui/icons-material/Delete';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import * as React from 'react';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 200,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  alignItems: 'center',
  gap: 1
};

export default function DeleteModal({ transactionId }:IModalEditProp) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const context = React.useContext(GlobalContext);

  if (!context) {
    alert('error');
    return null;
  }
  const { config } = context;
  
  async function handleDelete() {
    try {
      const { data } = await UserServices.deleteTransaction(transactionId, config)
      setOpen(false);
    } catch (error:any) {
      alert(error.response.data.mensagem);
    }
}
  return (
    <div>
      <DeleteIcon className='cursor-pointer hover:scale-110' onClick={handleOpen} />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
            <span>Apagar item ?</span>
            <div className='flex gap-2'>
                <Button onClick={handleDelete} variant='contained' sx={{color: 'white', backgroundColor: 'green'}}>Sim</Button>
                <Button onClick={handleClose} variant='contained' className=' hover:bg-red' sx={{color: 'white', backgroundColor: 'red'}}>Não</Button>
            </div>
        </Box>
      </Modal>
    </div>
  );
}