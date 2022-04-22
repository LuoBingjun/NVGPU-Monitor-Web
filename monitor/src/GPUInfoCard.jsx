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
    <Accordion sx={{
      minWidth: '360px',
      maxWidth: '720px'
    }} {...props}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography align="left" >
          GPU #{props.id}: {props.data.name}
        </Typography>
        <Button onClick={handleClickOpen()}>Process List</Button>
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
              <Typography>Memory</Typography>
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
              <Typography>Power</Typography>
            </Stack>
          </Grid>
          <Grid item xs={6}>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography component="div" variant="body1">
                <b>Memory Usage:</b> <br/> {mem_used} MB / {mem_total} MB
              </Typography>
              <Typography component="div" variant="body1">
                <b>Power Usage:</b> <br/> {power_used} W / {power_limit} W (P{props.data.power.state})
              </Typography>
              <Typography component="div" variant="body1">
                <b>Fan Speed:</b> {props.data.fan_speed} %
              </Typography>
              <Typography component="div" variant="body1">
                <b>Temperature:</b> {props.data.temp} C
              </Typography>
            </Box>
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
        <DialogTitle id="scroll-dialog-title">Subscribe</DialogTitle>
        <DialogContent dividers={true}>
          <DialogContentText
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
          >
            {[...new Array(50)]
              .map(
                () => `Cras mattis consectetur purus sit amet fermentum.
Cras justo odio, dapibus ac facilisis in, egestas eget quam.
Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
Praesent commodo cursus magna, vel scelerisque nisl consectetur et.`,
              )
              .join('\n')}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </Accordion>
  );
}
