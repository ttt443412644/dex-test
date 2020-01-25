import * as React from "react";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import "./TabPanel.css";

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

//панель с товарами
export function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

export function a11yProps(index: any) {
  return {
    id: `tab-${index}`,
    "aria-controls": `tabpanel-${index}`
  };
}
