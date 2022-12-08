import React from "react";
import { useTheme } from "@mui/material/styles";
import { Typography, AppBar, Tab, Tabs, Grid, Box } from "@mui/material";
import Paper from "@mui/material/Paper";

import Signin from "../compose/signin";
import Signup from "../compose/signup";

interface TabPanelProps {
  children?: React.ReactNode;
  dir?: string;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

export default function FullWidthTabs() {
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  console.log(process.env.REACT_APP_HELLO_WORLD);

  return (
    <Grid
      container
      alignItems="center"
      justifyContent="center"
      direction="column"
    >
      <Box sx={{ bgcolor: "primary.dark", width: 600, mt: 5 }}>
        <Paper>
          <AppBar position="static">
            <Tabs
              value={value}
              onChange={handleChange}
              indicatorColor="secondary"
              textColor="inherit"
              variant="fullWidth"
              aria-label="full width tabs example"
            >
              <Tab label="ログイン" {...a11yProps(0)} />
              <Tab label="新規登録" {...a11yProps(1)} />
            </Tabs>
          </AppBar>
          <TabPanel value={value} index={0} dir={theme.direction}>
            <Signin />
          </TabPanel>
          <TabPanel value={value} index={1} dir={theme.direction}>
            <Signup />
          </TabPanel>
        </Paper>
      </Box>
    </Grid>
  );
}
