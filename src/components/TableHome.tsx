import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import ModalEditRegister from './ModalEditRegister';
import DeleteModal from './ModalDeleteRegister';

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
          {rows.map((row, index) => (
            <TableRow hover
              key={index}
              sx={{borderTop: 0}}
            >
              <TableCell align='center' component="th" scope="row">
                {row.data}
              </TableCell>
              <TableCell align="center">{row.dia_da_semana}</TableCell>
              <TableCell align="center">{row.descricao}</TableCell>
              <TableCell align="center">{row.categoria}</TableCell>
              <TableCell align="center">{row.valor}</TableCell>
              <TableCell className='w-2' align="center">
                    <ModalEditRegister />
              </TableCell>
                <TableCell className='w-2'>
                    <DeleteModal/>
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