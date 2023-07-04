import { ITransactionsRes } from '@/app/interfaces/IUsersServices';
import { UserServices } from '@/app/services/UserServices';
import { GlobalContext } from '@/context/GlobalContext';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { format } from 'date-fns';
import { useContext, useEffect, useState } from 'react';
import { useLocalStorage } from 'react-use';
import DeleteModal from './ModalDeleteRegister';
import ModalEditRegister from './ModalEditRegister';

const tableHeadStyle = {
  color: '#000',
  fontSize: '14px',
  fontFamily: 'Lato',
  fontStyle: 'normal',
  fontWeight: '700',
  backgroundColor: '#FAFAFA'
}

export default function TableHome() {
  const [token, ,] = useLocalStorage('token');
  const [transactions, setTransactions] = useState<ITransactionsRes[]>();
  const context = useContext(GlobalContext);

  if (!context){
    alert('error');
    return null;
  }
  const { config } = context;

  const handleGetTransactions = async () => {
    try {
      const { data }  = await UserServices.getTransaction(config);
      setTransactions(data);
      if (!token) {
        return alert('você não está autorizado!')
      }
    } catch (error:any) {
      alert(error.response.data.mensagem);
    }
  }

  useEffect(() => {
    handleGetTransactions();
  }, [transactions]);

  const exitColor = {
    color: '#FA8C10'
  }

  const entryColor = {
    color: '#645FFB'
  }
  return (
    <TableContainer className=' max-w-3xl flex flex-col gap-4'>
      <Table size='small'>
        <TableHead className='shadow-sm' sx={tableHeadStyle}>
          <TableRow>
            <TableCell align='center'>Data</TableCell>
            <TableCell align="center">Dia da Semana</TableCell>
            <TableCell align="center">Descrição</TableCell>
            <TableCell align="center">Categoria</TableCell>
            <TableCell align="center">Valor</TableCell>
            <TableCell align="center"></TableCell>
            <TableCell align="center"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {transactions && transactions.map((row, key) => (
            <TableRow hover
              key={key}
              sx={{borderTop: 0}}
            >
              <TableCell align='center' component="th" scope="row">
                {row.data.slice(0,10)}
                {/* {format(new Date(row.data), 'dd/MM/yyyy HH:mm:ss')} */}
              </TableCell>
              <TableCell align="center">{format(new Date(row.data), "eeee")}</TableCell>
              <TableCell align="center">{row.descricao}</TableCell>
              <TableCell align="center">{row.categoria_nome}</TableCell>
              <TableCell sx={row.tipo === 'entrada' ? entryColor : exitColor} align="center">R${row.valor.toFixed(2)}</TableCell>
              <TableCell className='w-2' align="center">
                    <ModalEditRegister
                    transactionId={row.id}
                    />
              </TableCell>
                <TableCell className='w-2'>
                    <DeleteModal
                    transactionId={row.id}/>
                </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}