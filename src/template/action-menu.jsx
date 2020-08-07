import React from "react";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

const options = [
  {
    id: "edit",
    icon: EditIcon,
    name: "Editar",
  },
  {
    id: "delete",
    icon: DeleteIcon,
    name: "Excluir",
  }
];

const ITEM_HEIGHT = 48;

export default (props) => {
  const { handleEdit, handleDelete } = props;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleAction = (action, obj) => {
    action(obj);
    handleClose();
  }

  return (
    <div>
      <IconButton
        aria-label="more"
        aria-controls="long-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: "20ch",
          },
        }}
      >
        {options.map((option) => (
          <MenuItem key={option.name} onClick={(event) => handleAction(option.id === "edit" ? handleEdit : handleDelete, props.obj)}>
            <ListItemIcon>
              <option.icon fontSize="small" />
            </ListItemIcon>
            {option.name}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}
