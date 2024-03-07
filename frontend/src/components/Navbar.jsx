//import { Search } from "@material-ui/icons";
//import Badge from "@mui/material/Badge";
//import { ShoppingCartOutlined } from "@material-ui/icons";
import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useAuth } from "./AuthContext";

const Container = styled.div`
  height: 60px;
  background-color: #4caf50;
`;

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

/*const Language = styled.span`
  font-size: 14px;
  cursor: pointer;
`;*/

/*const SearchContainer = styled.div`
  border: 0.5px solid lightgray;
  display: flex;
  align-items: center;
  margin-left: 25px;
  padding: 5px;
`;*/

/*const Input = styled.input`
  border: none;
`;*/

const Center = styled.div`
  flex: 1;
  text-align: center;
`;

const Logo = styled.h3`
  font-weight: bold;
`;

const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const MenuItems = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;

  text-decoration: none; /* Remove default underline */
  padding: 10px 15px;
  border: 1px solid #333; /* Add border for a button-like appearance */
  border-radius: 5px;
  background-color: teal; /* Add your desired background color */
  color: #fff; /* Add your desired text color */
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #45a049; /* Add your desired hover background color */
  }
`;

const Navbar = () => {
  //const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { isLoggedIn, logout } = useAuth();

  /*const handleLogout = () => {
    // Add your logout logic here
    setIsLoggedIn(false);
  };*/

  return (
    <Container>
      <Wrapper>
        <Left></Left>
        <Center>
          <Logo>DRUG RECOMMENDATION SYSTEM</Logo>
        </Center>
        <Right>
          {!isLoggedIn ? (
            <>
              <Link to="/register">
                <MenuItems>REGISTER</MenuItems>
              </Link>
              <Link to="/login">
                <MenuItems>LOGIN</MenuItems>
              </Link>
            </>
          ) : (
            <MenuItems onClick={logout}>LOGOUT</MenuItems>
          )}

          {/*<Link to="/register">
            <MenuItems>REGISTER</MenuItems>
          </Link>
          <Link to="/login">
            <MenuItems>LOGIN</MenuItems>
          </Link>*/}
        </Right>
      </Wrapper>
    </Container>
  );
};

/*const Navbar = () => {
  return (
    <Router>
      <Container>
        <Wrapper>
          <Left>
            <Language>EN</Language>
            <SearchContainer>
              <Input />
              <Search style={{ color: "gray", fontSize: 16 }} />
            </SearchContainer>
          </Left>
          <Center>
            <Logo>LAMA.</Logo>
          </Center>
          <Right>
            <Link to="/register">
              <MenuItems>REGISTER</MenuItems>
            </Link>
            <MenuItems>LOGIN</MenuItems>
            <MenuItems>
              <Badge badgeContent={4} color="primary"></Badge>
              <ShoppingCartOutlined />
            </MenuItems>
          </Right>
        </Wrapper>
      </Container>
      <Routes>
        <Route path="/register" component={Register} />
      </Routes>
  </Router>
  );
};*/

export default Navbar;
