import {
  GridColumnMenuContainer,
  GridFilterMenuItem,
  HideGridColMenuItem,
} from "@mui/x-data-grid";

const CustomColumnMenu = (props) => {
  const { hideMenu, currentColumn, open } = props;
  return (
    <GridColumnMenuContainer
      hideMenu={hideMenu}
      currentColumn={currentColumn}
      open={open}
    >
      <GridFilterMenuItem onclick={hideMenu} column={currentColumn}>
        <HideGridColMenuItem onclick={hideMenu} column={currentColumn} />
      </GridFilterMenuItem>
    </GridColumnMenuContainer>
  );
};

export default CustomColumnMenu;
