import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { UserServices } from '@/app/services/UserServices';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const addButtonStyle = {
    backgroundColor: 'rgb(139 92 246)',
    fontWeight: '700',
    borderRadius: '0.125rem',
    fontSize: '0.75rem',
    py: 1
};

const spanInputStyle = {
    fontFamily: 'Rubik',
    fontStyle: 'normal',
    fontWeight: '500',
}

const titleStyle = {
    color: '#000',
    fontStyle: 'normal',
    fontWeight:' 700',
};


export default function ModalAddRegister() {
  const [open, setOpen] = React.useState(false);
  const [selectSaida, setSelectSaida] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [form, setForm] = React.useState({
    valor: '',
    data: '',
    descricao: '',
    categoria_id: 1,
    tipo: ''
  })
  const [exitColor, setExitColor] = React.useState('');
  const [entryColor, setEntryColor] = React.useState('');

  React.useEffect(() => {
    setForm({...form, tipo: selectSaida ? 'saida' : 'entrada'})
    if (selectSaida) {
      setEntryColor('#B9B9B9');
      setExitColor('#FF576B');
    } else {
      setEntryColor('#3A9FF1'),
      setExitColor('#B9B9B9')
    }
  }, [selectSaida])



  function handleOnChange(e) {
    const { name, value } = e.target;

    setForm({...form, [name]: value});
  }
  
  async function handleSubmit(e) {
    e.preventDefault();

    if (!form.valor || !form.categoria_id || !form.data || !form.descricao){
      return alert('preencha todos os campos!');
    }

    try {
      const { data } = await UserServices.addTransaction(form);
      console.log(data);
    } catch (error) {
      console.log(error)
    }
  };

  const entryButton = {
    backgroundColor: entryColor
  }

  const exitButton = {
    backgroundColor: exitColor
  }

  return (
    <div className='w-full'>
      <Button className='w-full' sx={addButtonStyle} variant='contained' onClick={handleOpen}>Adicionar Registro</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
            <form onSubmit={handleSubmit} className='flex flex-col justify-center gap-4'>
                <div className='flex justify-between mb-4'>
                    <h1 className='text-2xl' style={titleStyle}>Adicionar Registro</h1>
                    <img onClick={handleClose} className='cursor-pointer w-4' src="/Icon-Exit.svg" alt="icon-exist" />
                </div>
                <div className='w-full flex justify-center'>
                    <button style={entryButton} type='button' onClick={() => setSelectSaida(false)} className='text-[#FAFAFA] rounded-sm h-8 text-xs w-1/2'>Entrada</button>
                    <button style={exitButton} type='button' onClick={() => setSelectSaida(true)} className='text-[#FAFAFA] rounded-sm h-8 text-xs w-1/2'>Saída</button>
                </div>
                <div className='flex flex-col gap-2'>
                    <div className='flex flex-col'>
                        <span className='text-l' style={spanInputStyle}> Valor</span>    
                        <input
                        
                        onChange={handleOnChange}
                        name='valor'
                        value={form.valor}
                        type="number" className='p-2 border border-slate-500 h-10' />
                    </div>
                    <div className='flex flex-col'>
                        <span className='text-l' style={spanInputStyle}> Categoria</span>    
                        <input
                        
                        //  onChange={handleOnChange}
                         name='categoria'
                        //  value={form.categoria}
                         type="text" className='p-2 border border-slate-500 h-10' />
                    </div>
                    <div className='flex flex-col'>
                        <span className='text-l' style={spanInputStyle}> Data</span>    
                        <input
                         
                         onChange={handleOnChange}
                         name='data'
                         value={form.data}
                         type="text" className='p-2 border border-slate-500 h-10' />
                    </div>
                    <div className='flex flex-col'>
                        <span className='text-l' style={spanInputStyle}> Descrição</span>    
                        <input
                        
                         onChange={handleOnChange}
                         name='descricao'
                         value={form.descricao} 
                        type="text" className='p-2 border border-slate-500 h-10' />
                    </div>
                </div>
                <Button type='submit' sx={addButtonStyle} variant='contained'> Adicionar </Button>
            </form>
        </Box>
      </Modal>
    </div>
  );
}