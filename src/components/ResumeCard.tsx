import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Button } from '@mui/material';


export default function ResumeCard() {
  return (
    <Card sx={{ minWidth: 240, backgroundColor: '#FAFAFA', width: 16, color: '#2F2F2F', pt: 2, px: 2}}>
      <CardContent>
        <h2 className='font-bold text-l mb-4'> Resumo</h2>
        <div className='font-medium text-sm flex justify-between mb-2'>
            <span>Entradas</span>
            <span style={{color: '#645FFB', fontWeight:'500'}}> R$ 200</span>
        </div>
        <div className='font-medium text-sm flex justify-between'>
            <span>Saídas</span>
            <span style={{color:'#FA8C10'}}> R$ 200</span>
        </div>
        <div className='border-t-2 border-slate-200 font-medium text-sm flex justify-between mt-4 py-2'>
            <span>Saldo</span>
            <span style={{color: '#3A9FF1'}}> R$ 129</span>
        </div>
      </CardContent>
    </Card>
  );
}