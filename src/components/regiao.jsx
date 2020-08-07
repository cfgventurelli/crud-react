import { useStyles, formControl } from "../template/styles/styles";

import React from 'react';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';

import DataTable from "../template/data-table";
import DeleteDialog from "../template/dialog-delete";

const MODE = {
  LIST: "LIST",
  FORM: "FORM"
};

const columns = [
  { id: 'codReg', label: 'ID', align: "right", sortable: true },
  { id: 'desReg', label: 'Descrição', sortable: true },
  { id: 'dtUltAlt', label: 'Última Alteração', align: "center", sortable: true },
  { id: 'actions', label: 'Ações', align: "center", sortable: false },
];

export default () => {
  const classes = useStyles();
  const formClasses = formControl();
  const [mode, setMode] = React.useState(MODE.LIST);
  const [list, setList] = React.useState([]);
  const [codReg, setCodReg] = React.useState(0);
  const [desReg, setDesReg] = React.useState();
  const [showDialog, setShowDialog] = React.useState(false);

  const handleChange = (event) => {
    setDesReg(event.target.value);
  };

  const handleNew = () => {
    setCodReg(0);
    setDesReg("");
    setMode(MODE.FORM);
  }

  const handleEdit = (obj) => {
    setCodReg(obj.codReg);
    setDesReg(obj.desReg);
    setMode(MODE.FORM);
  }

  const handleRemove = (obj) => {
    setCodReg(obj.codReg);
    setShowDialog(true);
  }

  const getList = () => {
    fetch('http://localhost:3003/api/regioes', {
      method: 'GET'
    }).then((response) => {
      return response.json()
    }).then((data) => {
      setList(data.data)
    }).catch(err => {
      console.log(err);
    });
  }

  const save = (event) => {
    event.preventDefault();

    const data = {
      des_reg: desReg
    };

    const method = codReg > 0 ? "PUT" : "POST";

    fetch('http://localhost:3003/api/regiao' + (codReg > 0 ? `/${codReg}` : ""), {
      method: method,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then((response) => {
      if (199 < response.status < 300) {
        getList();
        setMode(MODE.LIST);
      }
    }).catch(err => {
      console.log(err);
    });
  }

  const remove = (event) => {
    event.preventDefault();

    fetch(`http://localhost:3003/api/regiao/${codReg}`, {
      method: "DELETE",
    }).then((response) => {
      console.log(response);
      getList();
      setShowDialog(false);
    }).catch(err => {
      console.log(err);
    });
  }

  React.useEffect(() => { getList() }, []);
  const rows = list ? list.map((item) => ({
    codReg: item.COD_REG,
    desReg: item.DES_REG,
    dtUltAlt: (new Date(item.DT_ULT_ALT)).toISOString().slice(0, 19).replace('T', ' '),
  })) : [];

  if (mode === MODE.LIST) {

    return (
      <React.Fragment>
        <DataTable
          title="Região"
          columns={columns}
          data={rows}
          handleEdit={(obj) => handleEdit(obj)}
          handleDelete={(obj) => handleRemove(obj)}
        />
        <SpeedDial
          ariaLabel="SpeedDial"
          className={classes.speedDial}
          icon={<SpeedDialIcon />}
          open={false}
          onClick={() => handleNew()}
        />
        <DeleteDialog
          showDialog={showDialog}
          handleSubmit={remove}
          handleClose={() => setShowDialog(false)}
        />
      </React.Fragment>
    );
  } else {
    return (
      <Card>
        <form onSubmit={save} noValidate>
          <CardContent>
            <FormControl className={formClasses.root} disabled={true}>
              <InputLabel htmlFor="codReg">Código</InputLabel>
              <Input id="codReg" value={codReg} />
            </FormControl>
            <FormControl className={formClasses.root} required>
              <InputLabel htmlFor="desReg">Descrição</InputLabel>
              <Input id="desReg" value={desReg} onChange={handleChange} />
            </FormControl>
          </CardContent>
          <CardActions>
            <Button type="submit" variant="contained" color="primary">Salvar</Button>
            <Button
              variant="contained"
              color="default"
              onClick={() => setMode(MODE.LIST)}
            >
              Cancelar
            </Button>
          </CardActions>
        </form>
      </Card>
    );
  }
}