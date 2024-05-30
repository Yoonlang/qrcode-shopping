import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from "@mui/material";
import { useState } from "react";
import { FormikProps } from "formik";
import { StyledAppBar, StyledDrawer, StyledList } from "./DashboardItems";
import Icons from "./Icons";
import UserBoard from "./UserBoard";
import ProductBoard from "./ProductBoard";
import styled from "styled-components";

const StyledBoardContainer = styled.div`
  display: flex;
  position: absolute; // 바깥 HTML 태그 수정 전 임시 처리
  left: 200px;
  width: calc(100% - 200px);
  height: 100%;
  margin-top: 70px;
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
