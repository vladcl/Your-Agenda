import React from 'react';
import './card.css';
import FormDialog from '../dialog/dialog';

export default function Card(props) {
    const [open, setOpen] = React.useState(false);

    const handleClickCard = () => {
        setOpen(true);
    }

    

    const formatDate = (date) => {
        let dateObject = new Date(date);

        const option = {
            year: 'numeric',
            month: 'long',            
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',           
        }
      return dateObject.toLocaleDateString('pt-BR', option)

      
    
    }
    
    

    return (
        <>
        <FormDialog open={open} 
        setOpen={setOpen} 
        id={props.id}
        name={props.name} 
        description={props.description} 
        date_and_hour_initial={props.date_and_hour_initial} 
        date_and_hour_final={props.date_and_hour_final} 
        status={props.status}
        listCard={props.listCard}
        setListCard={props.setListCard}/>
        
    <div className='card--container' onClick={() => handleClickCard()}>
        <h1 className='card--title'>{props.name}</h1>
        <p className='card--id'>{props.id}</p>
        <p className='card--description'>{props.description}</p>
        <p className='card--dateAndHourInitial'>{formatDate(props.date_and_hour_initial)}</p>
        <p className='card--dateAndHourFinal'>{formatDate(props.date_and_hour_final)}</p>
        <p className='card--status'>{props.status}</p>
    </div>
    </>
    )
};