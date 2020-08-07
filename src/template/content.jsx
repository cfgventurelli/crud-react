import { useStyles } from "./styles/styles";

import React from 'react';

export default (props) => {
  const classes = useStyles();

  return (
    <main className={classes.content}>
      <div className={classes.toolbar} />
      {props.children}
    </main>
  );
}
