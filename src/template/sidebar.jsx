import { useStyles } from "./styles/styles";

import React from 'react';
import { Link } from "react-router-dom";
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeIcon from '@material-ui/icons/Home';
import RoomIcon from '@material-ui/icons/Room';

export default () => {
  const classes = useStyles();

  return (
    <Drawer
      className={classes.drawer}
      variant="permanent"
      classes={{
        paper: classes.drawerPaper,
      }}
      anchor="left"
    >
      <div className={classes.toolbar}>
        <List>
          <ListItem button component={Link} to="/" >
            <ListItemIcon><HomeIcon /></ListItemIcon>
            <ListItemText primary="Home" />
          </ListItem>
        </List>
      </div>
      <Divider />
      <List>
        <ListItem button component={Link} to="/regiao" >
          <ListItemIcon><RoomIcon /></ListItemIcon>
          <ListItemText primary="Região" />
        </ListItem>
      </List>
    </Drawer>
  );
}
