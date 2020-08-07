import './App.css';
import { useStyles } from "./template/styles/styles";

import React from 'react';
import { BrowserRouter } from "react-router-dom";
import CssBaseline from '@material-ui/core/CssBaseline';

import TopBar from "./template/topbar";
import SideBar from "./template/sidebar";
import Content from "./template/content";
import Routes from "./routes";

function App() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <CssBaseline />
      <BrowserRouter>
        <TopBar />
        <SideBar />
        <Content>
          <Routes />
        </Content>
      </BrowserRouter>
    </div>
  );
}

export default App;
