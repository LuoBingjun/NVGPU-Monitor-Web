import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import CircularProgressWithLabel from "./ProgressBar";

export default function GPUInfoCard(props) {
  const mem_rate = props.data.memory.used / props.data.memory.total;
  const power_rate = props.data.power.usage / props.data.power.limit;
  const mem_used = Math.round(props.data.memory.used / 1024 / 1024);
  const mem_total = Math.round(props.data.memory.total / 1024 / 1024);
  const power_used = Math.round(props.data.power.usage / 1000);
  const power_limit = Math.round(props.data.power.limit / 1000);

  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const descriptionElementRef = React.useRef(null);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  return (
    <Accordion defaultExpanded sx={{
      minWidth: '360px',
      maxWidth: '540px'
    }} {...props}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography align="left" >
          GPU #{props.id}: {props.data.name}
        </Typography>
      </AccordionSummary>
      <Divider />
      <AccordionDetails sx={{
        padding: '10px'
      }}>
        <Grid container spacing={4}>
          <Grid item xs={3}>
            <Stack spacing={1} sx={{
              alignItems: 'center',
              justifyContent: 'center',
              weight: '240px',
              height: '100%'
            }}>
              <CircularProgressWithLabel value={mem_rate * 100} size={72} />
              <Typography> <b>Memory</b></Typography>
              <Typography component="div" variant="caption">
                {mem_used} / {mem_total} MB
              </Typography>
            </Stack>
          </Grid>
          <Grid item xs={3}>
            <Stack spacing={1} sx={{
              justifyContent: 'center',
              alignItems: 'center',
              weight: '240px',
              height: '100%'
            }}>
              <CircularProgressWithLabel value={power_rate * 100} size={72} />
              <Typography> <b>Power</b></Typography>
              <Typography component="div" variant="caption">
                {power_used} / {power_limit} W
              </Typography>
            </Stack>
          </Grid>
          <Grid item xs={6}>
            {/* <Box sx={{ display: 'flex', flexDirection: 'column' }}> */}
            <Stack spacing={1} sx={{
              justifyContent: 'center',
              alignItems: 'center',
              height: '100%'
            }}>
              <Typography component="div" variant="body1">
                <b>Fan Speed:</b> {props.data.fan_speed} %
              </Typography>
              <Typography component="div" variant="body1">
                <b>Temperature:</b> {props.data.temp} &#8451;
              </Typography>
              <Button onClick={handleClickOpen()}>Running Process</Button>
            </Stack>

            {/* </Box> */}
          </Grid>
        </Grid>
      </AccordionDetails>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll='paper'
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">Running Process List</DialogTitle>
        <DialogContent dividers={true}>
          <DialogContentText
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
          >
            <TableContainer>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>PID</TableCell>
                    <TableCell>Process ID</TableCell>
                    <TableCell>Memory Usage</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {props.data.process.map((row) => (
                    <TableRow
                      key={row.pid}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {row.pid}
                      </TableCell>
                      <TableCell>{row.gpuInstanceId}</TableCell>
                      <TableCell>{Math.round(row.usedGpuMemory / 1024 / 1024)} MB</TableCell>
                    </TableRow>
                  )
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </Accordion>
  );
}
