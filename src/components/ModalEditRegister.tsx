import { UserServices } from '@/app/services/UserServices';
import { GlobalContext } from '@/context/GlobalContext';
import { actualHour } from '@/utils/FunctionHour';
import CreateIcon from '@mui/icons-material/Create';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import * as React from 'react';

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

export default function ModalEditRegister({ transactionId }) {
  const [open, setOpen] = React.useState(false);
  const handleClose = () => setOpen(false);
  const [form, setForm] = React.useState({
    descricao: '',
    valor: 0,
    data: '',
    categoria_id: 0,
    tipo: ''
  });

  const [select, setSelect] = React.useState({id: '', nome: ''});

  const { categorias, setCategorias, config } = React.useContext(GlobalContext)

  async function handleOpen() {
    setOpen(true);
    try {
      const { data } = await UserServices.getTransactionId(transactionId, config);
      const localOptions = [...categorias];
      const myOption = localOptions.find((item) => item.id === data.categoria_id);
      setSelect({id: myOption.id, nome: myOption.descricao});
      setForm({...form, valor: Number(data.valor), categoria_id: data.categoria_id, data: data.data.slice(0,10), descricao:data.descricao, tipo: data.tipo})
    } catch (error) {
      alert(error.response.data.mensagem);
    }
  }

  function handleOnChange(e) {
    const { name, value } = e.target;
    setForm({...form, [name]: value});
  }

  function handleChangeSelect(e) {
    const localOptions = [...categorias];
    const myOption = localOptions.find((item) => item.id === parseInt(e.target.value));
    setSelect({id: myOption.id, nome: myOption.descricao});
    setForm({...form, categoria_id: myOption.id});
  }
  
  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.valor || !form.categoria_id || !form.data || !form.descricao){
      return alert('preencha todos os campos!');
    }

    if (form.data.length !== 10) {
      return alert('por favor insira a data no formato "31/11/2021" ')
    }
    
    try {
      setForm({...form, data: `${form.data} ${actualHour}`});
      const { data } = await UserServices.editTransaction(form, transactionId, config);
      handleClose();
    } catch (error) {
      alert(error.response.data.mensagem);
    }
  };

  return (
    <div>
      <CreateIcon onClick={handleOpen} className='mr-2 cursor-pointer hover:scale-110'/>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
            <form onSubmit={handleSubmit} className='flex flex-col justify-center gap-4'>
                <div className='flex justify-between mb-4'>
                    <h1 className='text-2xl' style={titleStyle}>Editar Registro</h1>
                    <img onClick={handleClose} className='cursor-pointer w-4' src="/Icon-Exit.svg" alt="icon-exist" />
                </div>
                {/* <div className='w-full flex justify-center'>
                    <button className='text-[#FAFAFA] rounded-sm h-8 text-xs bg-[#3A9FF1] w-1/2'>Entrada</button>
                    <button className='text-[#FAFAFA] rounded-sm h-8 text-xs bg-[#B9B9B9] w-1/2'>Saída</button>
                </div> */}
                <div className='flex flex-col gap-2'>
                    <div className='flex flex-col'>
                        <span className='text-l' style={spanInputStyle}> Valor</span>    
                        <input
                        
                        onChange={handleOnChange}
                        name='valor'
                        value={form.valor}
                        type="text" className='p-2 border border-slate-500 h-10' />
                    </div>
                    <div className='flex flex-col'>
                        <span className='text-l' style={spanInputStyle}> Categoria</span>    
                        <select 
                        value={select.id}
                        onChange={(e) => handleChangeSelect(e)}
                        className='p-2 border border-slate-500 h-10'>
                          {categorias && categorias.map((cat) => (
                            <option key={cat.id} value={cat.id}>{cat.descricao}</option>
                          ))}
                        </select>
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
                <Button type='submit' sx={addButtonStyle} variant='contained'> Confirmar </Button>
            </form>
        </Box>
      </Modal>
    </div>
  );
}