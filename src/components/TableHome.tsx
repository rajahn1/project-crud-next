import { UserServices } from '@/app/services/UserServices';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import DeleteModal from './ModalDeleteRegister';
import ModalEditRegister from './ModalEditRegister';
import { useEffect, useState } from 'react';
import { useLocalStorage } from 'react-use';
import { format } from 'date-fns';

function createData(
    data: string,
    dia_da_semana: string,
    descricao: string,
    categoria: string,
    valor: number
) {
  return { data, dia_da_semana, descricao, categoria, valor };
}

const rows = [
  createData('02/09/2022', 'quarta', 'açai', 'pix', 25)
];

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
  const [transactions, setTransactions] = useState();

  const handleGetTransactions = async () => {
    try {
      const { data }  = await UserServices.getTransaction();
      setTransactions(data);
      // console.log(transactions);

      if (!token) {
        return alert('você não está autorizado!')
      }
      // console.log(transactions);   
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    handleGetTransactions();
  }, [transactions]);

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
          {transactions && transactions.map((row, index) => (
            <TableRow hover
              key={index}
              sx={{borderTop: 0}}
            >
              <TableCell align='center' component="th" scope="row">
                {format(new Date(row.data), 'yyyy/MM/dd')}
              </TableCell>
              <TableCell align="center">{format(new Date(row.data), "eeee")}</TableCell>
              <TableCell align="center">{row.descricao}</TableCell>
              <TableCell align="center">{row.categoria_nome}</TableCell>
              <TableCell align="center">R${row.valor.toFixed(2)}</TableCell>
              <TableCell className='w-2' align="center">
                    <ModalEditRegister
                    transactionId={row.id}
                    />
              </TableCell>
                <TableCell className='w-2'>
                    <DeleteModal
                    transactionId={row.id}/>
                </TableCell>
              {/* <TableCell align="right"><CreateIcon/></TableCell>
              <TableCell align="right"><DeleteIcon/></TableCell> */}

            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}