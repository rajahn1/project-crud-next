import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Button } from '@mui/material';
import { UserServices } from '@/app/services/UserServices';
import { useEffect, useState } from 'react';



export default function ResumeCard() {
  const [extract, setExtract] = useState();

  async function handleGetExtract() {
    try {
      const { data } = await UserServices.getExtract();
      setExtract(data)

    } catch (error) {
      console.log(error);
    }
  }
    useEffect(() => {
      handleGetExtract();
    }, [extract])

  return (
    <Card sx={{ minWidth: 240, backgroundColor: '#FAFAFA', width: 16, color: '#2F2F2F', pt: 2, px: 2}}>
      <CardContent>
        <h2 className='font-bold text-l mb-4'> Resumo</h2>
        <div className='font-medium text-sm flex justify-between mb-2'>
            <span>Entradas</span>
            <span style={{color: '#645FFB', fontWeight:'500'}}> R$ {extract && extract.entrada}</span>
        </div>
        <div className='font-medium text-sm flex justify-between'>
            <span>Saídas</span>
            <span style={{color:'#FA8C10'}}> R$ {extract && extract.saida}</span>
        </div>
        <div className='border-t-2 border-slate-200 font-medium text-sm flex justify-between mt-4 py-2'>
            <span>Saldo</span>
            <span style={{color: '#3A9FF1'}}> R$ {extract && extract.entrada - extract.saida}</span>
        </div>
      </CardContent>
    </Card>
  );
}