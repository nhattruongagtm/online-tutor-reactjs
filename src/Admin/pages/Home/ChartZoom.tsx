import React, { createContext, useContext, useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { ChartCircle, ChartCircleContext } from './ChartCircle';
import { ChartColumn, ChartColumnContext } from './ChartColumn';
import { Bar, Doughnut } from 'react-chartjs-2';
import { BubbleDataPoint, ChartData, ScatterDataPoint } from 'chart.js';
import { ChartCircleMain } from './ChartCircleMain';
import { ChartColumnMain } from './ChartColumnMain';

interface ChartZoomProps {
  type: number;
  name: string;
  options?: object;
  //   isOpen: boolean;
}

export const ChartZoom = ({ type, name, options }: ChartZoomProps) => {
  const dataColumn = useContext(ChartColumnContext);
  const dataCirle = useContext(ChartCircleContext);

  const [open, setOpen] = useState<boolean>(false);
  const [hidden, setHidden] = useState<boolean>(false);

  const handleClickOpen = () => {
    setOpen(true);
    // setHidden(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <i className="fas fa-search-plus" onClick={handleClickOpen}></i>
      <Dialog open={open} onClose={handleClose} className="chart__popup">
        <DialogTitle>{name}</DialogTitle>
        <DialogContent className="chart">
          {type === 1 ? (
            <ChartColumnMain/>  
          ) : (
            <ChartCircleMain/>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Thoát</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
