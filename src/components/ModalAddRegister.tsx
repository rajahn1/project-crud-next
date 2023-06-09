import { UserServices } from '@/app/services/UserServices';
import { GlobalContext } from '@/context/GlobalContext';
import { actualHour } from '@/utils/FunctionHour';
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


export default function ModalAddRegister() {
  const [mounted, setMounted] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [selectSaida, setSelectSaida] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setForm({...form, valor: 0, data: '', descricao: '', categoria_id: 0});
    setSelect({...select, id: 0});
  }

  const [form, setForm] = React.useState({
    valor: 0,
    data: '',
    descricao: '',
    categoria_id: 0,
    tipo: ''
  })
  const [exitColor, setExitColor] = React.useState('');
  const [entryColor, setEntryColor] = React.useState('');

  const [select, setSelect] = React.useState({id: 0, nome: ''});

  const context = React.useContext(GlobalContext);

  if (!context) {
    alert('error');
    return null;
  }
  const { categorias, setCategorias, config } = context;
  
  async function getCategorias() {
    try {
      const { data } = await UserServices.getCategoria(config);
      setCategorias(data);
    } catch (error:any) {
      alert(error.response.data.mensagem);
    }
  }

  React.useEffect(() => {
    setMounted(true);
    setForm({...form, tipo: selectSaida ? 'saida' : 'entrada'})
    if (selectSaida) {
      setEntryColor('#B9B9B9');
      setExitColor('#FF576B');
    } else {
      setEntryColor('#3A9FF1'),
      setExitColor('#B9B9B9')
    }

    getCategorias();
  }, [selectSaida]);

  if (!mounted) {
    return null;
  }

  function handleOnChange(e:any) {
    const { name, value } = e.target;
    
    setForm({...form, [name]: value});
  };

  function handleChangeSelect(e:any) {
    const localOptions = [...categorias];

    const myOption = localOptions.find((item) => item.id === parseInt(e.target.value));

    if (!myOption) {
      return
    }

    setSelect({id: myOption.id, nome: myOption.descricao});
    setForm({...form, categoria_id: myOption.id});
  }
  
  async function handleSubmit(e:any) {
    e.preventDefault();

    if (!form.valor || !form.categoria_id || !form.data || !form.descricao){
      return alert('preencha todos os campos!');
    }

    if (form.data.length !== 10) {
      return alert('por favor insira a data no formato "31/11/2021" ')
    }

    try {
      setForm({...form, data: `${form.data} ${actualHour}`});
      const { data } = await UserServices.addTransaction(form, config);
      handleClose();
    } catch (error:any) {
      alert(error.response.data.mensagem);
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
                        <select 
                        value={select.id}
                        onChange={(e) => handleChangeSelect(e)}
                        className='p-2 border border-slate-500 h-10'>
                          <option value={0}> Selecione uma categoria </option>
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
                <Button type='submit' sx={addButtonStyle} variant='contained'> Adicionar </Button>
            </form>
        </Box>
      </Modal>
    </div>
  );
}