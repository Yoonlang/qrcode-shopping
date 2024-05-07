import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from "@mui/material";
import { useState } from "react";
import { FormikProps } from "formik";
import {
  StyledAppBar,
  StyledDiv,
  StyledDrawer,
  StyledList,
} from "./DashboardItems";
import Icons from "./Icons";
import UserBoard from "./UserBoard";
import ProductBoard from "./ProductBoard";

const Dashboard = ({ formik }: { formik: FormikProps<any> }) => {
  const [menu, setMenu] = useState(0);
  const drawerItems = ["user", "product"];

  const handleChangeMenu = (
    e: React.MouseEvent<HTMLElement>,
    index: number
  ) => {
    setMenu(index);
  };

  return (
    <>
      <StyledAppBar>
        <div>YOUNGWON</div>
        <div>{Icons["x"]}</div>
        <div>MAEIL</div>
      </StyledAppBar>
      <StyledDrawer variant="permanent" anchor="left">
        <Toolbar />
        <StyledList>
          <div>MENU</div>
          {drawerItems.map((item, index) => (
            <ListItem key={item}>
              <ListItemButton onClick={(e) => handleChangeMenu(e, index)}>
                <ListItemIcon>
                  {index % 2 == 0 ? Icons["person_dark"] : Icons["list"]}
                </ListItemIcon>
                <ListItemText primary={item} />
              </ListItemButton>
            </ListItem>
          ))}
        </StyledList>
      </StyledDrawer>
      <StyledDiv>
        {menu === 0 ? (
          <UserBoard formik={formik} />
        ) : (
          <ProductBoard formik={formik} />
        )}
      </StyledDiv>
    </>
  );
};

export default Dashboard;
