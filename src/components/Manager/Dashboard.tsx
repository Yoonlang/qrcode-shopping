import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from "@mui/material";
import { FormikProps } from "formik";
import { useState } from "react";
import { styled } from "styled-components";

import Icons from "@/components/Icons";
import {
  StyledAppBar,
  StyledDrawer,
  StyledList,
} from "@/components/Manager/DashboardItems";
import UserBoard from "@/components/Manager/OrderInfo/UserBoard";
import ProductBoard from "@/components/Manager/Product/ProductBoard";

const StyledBoardContainer = styled.div`
  display: flex;
  position: fixed;
  left: 200px;
  top: 70px;
  width: calc(100% - 200px);
  height: calc(100% - 70px);
`;

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
      <StyledBoardContainer>
        {menu === 0 ? (
          <UserBoard formik={formik} />
        ) : (
          <ProductBoard formik={formik} />
        )}
      </StyledBoardContainer>
    </>
  );
};

export default Dashboard;
