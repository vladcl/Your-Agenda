import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Axios from "axios";
import { useNavigate } from "react-router-dom";


export default function FormDialog(props) {
  const navigate = useNavigate();
  const [editValues, setEditValues] = useState({
    id: props.id,
    name: props.name,
    description: props.description,
    category: props.category,
    status: props.status,
  });

  const handleChangeValues = (values) => {
    setEditValues((prevValues) => ({
      ...prevValues,
      [values.target.id]: values.target.value,
    }));
  };

  const handleClose = () => {
    props.setOpen(false);
  };

  const handleEditActivities = () => {
    Axios.put('http://localhost:3001/edit', {
      id: editValues.id,
      name: editValues.name,
      description: editValues.description,
      status: editValues.status,
    }, {
      headers: {
        'x-access-token': localStorage.getItem('token'),
      }
    }).then(() => {
      props.setListCard(
        props.listCard.map((value) => {
          return value.id === editValues.id
            ? {
              id: editValues.id,
              name: editValues.name,
              description: editValues.description,
              status: editValues.status,
            }
            : value;
        })
      );
    }).catch((err) => {
      if (err.response.status === 401) {
        navigate('/login')
      }
    });;
    handleClose();
  };

  const handleDeleteActivities = () => {
    Axios.delete(`http://localhost:3001/delete/${editValues.id}`, {
      headers: {
        'x-access-token': localStorage.getItem('token'),
      }
    }).then(() => {
      props.setListCard(
        props.listCard.filter((value) => {
          return value.id !== editValues.id;
        })
      );
    }).catch((err) => {
      if (err.response.status === 401) {
        navigate('/login')
      }
    });;
    handleClose();
  };

  return (
    <Dialog
      open={props.open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Editar</DialogTitle>
      <DialogContent>
        <TextField
          disabled
          margin="dense"
          id="id"
          label="ID da atividade"
          defaultValue={props.id}
          type="text"
          fullWidth
        />
        <TextField
          disabled
          margin="dense"
          id="name"
          label="Nome da Atividade"
          defaultValue={props.name}
          type="text"
          onChange={handleChangeValues}
          fullWidth
        />
        <TextField
          disabled
          margin="dense"
          id="description"
          label="Descrição da atividade"
          defaultValue={props.description}
          type="text"
          onChange={handleChangeValues}
          fullWidth
        />
        <TextField
          disabled
          margin="dense"
          id="date_and_hour_initial"
          label="Data e Hora de Início"
          defaultValue={props.date_and_hour_initial}
          type="text"
          onChange={handleChangeValues}
          fullWidth
        />
        <TextField
          disabled
          margin="dense"
          id="date_and_hour_final"
          label="Data e Hora de Término"
          defaultValue={props.date_and_hour_final}
          type="text"
          onChange={handleChangeValues}
          fullWidth
        />
        <TextField
          autoFocus
          margin="dense"
          id="status"
          label="Status da Atividade"
          defaultValue={props.status}
          type="text"
          onChange={handleChangeValues}
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button color="primary" onClick={() => handleDeleteActivities()}>
          Excluir
        </Button>
        <Button color="primary" onClick={() => handleEditActivities()}>
          Salvar
        </Button>
      </DialogActions>
    </Dialog>

  );
}