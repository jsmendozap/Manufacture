import React, { useState } from 'react';
import devfull from 'media/Devfull.png';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
  } from 'reactstrap';
import { Link } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";
import Solicitudes from 'components/Solicitudes';
import { OpenDialogContext } from 'contex/OpenDialog';
import PrivateComponent from './PrivateComponent';
import { useUsuario } from 'contex/usuarioContext';

const Header = (props) => {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);
    const { user, logout } = useAuth0();
    const { usuarios } = useUsuario()

    const cerrarSesion = () => {
        logout({ returnTo: window.location.origin })
        localStorage.setItem('Token', null)
    }

    const [open, setOpen] = useState(false)
    const filtro = usuarios.filter(usuario => usuario.rol === "inactivo")

    return (
        <header >
            <OpenDialogContext.Provider value={{ open, setOpen }}>
                <Navbar color="light" light expand="md" >
                    <img src={devfull} style={{height: "35px", paddingRight: "20px", paddingLeft: "10px"}} alt="logo"/>
                    <NavbarBrand href="/bienvenida">Manufactura</NavbarBrand>
                    <NavbarToggler onClick={toggle} />
                    <Collapse isOpen={isOpen} navbar>
                        <Nav className="mr-auto" navbar>
                            <PrivateComponent roleList={['vendedor', 'administrador' ]}>
                                <UncontrolledDropdown nav inNavbar>
                                    <DropdownToggle nav caret>
                                        Ventas
                                    </DropdownToggle>
                                    <DropdownMenu right>
                                        <DropdownItem href="">
                                        <Link to="/gven-nueva" style={{textDecoration: 'none', color: 'black'}}>
                                            Nueva venta
                                        </Link>
                                        </DropdownItem>
                                        <DropdownItem href="">
                                            <Link to="/gven-admin" style={{textDecoration: 'none', color: 'black'}}>
                                                Gestión venta
                                            </Link>
                                        </DropdownItem>
                                    </DropdownMenu>
                                </UncontrolledDropdown>
                                <PrivateComponent roleList={['administrador' ]}>
                                    <UncontrolledDropdown nav inNavbar>
                                        <DropdownToggle nav caret>
                                            Productos
                                        </DropdownToggle>
                                        <DropdownMenu right>
                                            <DropdownItem href="">
                                                <Link to="/gprod-agregar" style={{textDecoration: 'none', color: 'black'}}>
                                                    Nuevo producto
                                                </Link>
                                            </DropdownItem>
                                            <DropdownItem href="">
                                                <Link to="/gprod-admin" style={{textDecoration: 'none', color: 'black'}}>
                                                    Gestión producto
                                                </Link>
                                            </DropdownItem>
                                        </DropdownMenu>
                                    </UncontrolledDropdown>
                                    <UncontrolledDropdown nav inNavbar>
                                        <DropdownToggle nav caret>
                                            Usuarios
                                        </DropdownToggle>
                                        <DropdownMenu right>
                                            <DropdownItem href="">
                                                <Link to="/gusu-agregar" style={{textDecoration: 'none', color: 'black'}}>
                                                    Registrar usuario
                                                </Link>
                                            </DropdownItem>
                                            <DropdownItem href="">
                                                
                                                    <Link to="/gusu-admin" style={{textDecoration: 'none', color: 'black'}}>
                                                        Gestión usuario
                                                    </Link>
                                            </DropdownItem>
                                        </DropdownMenu>
                                    </UncontrolledDropdown>
                                </PrivateComponent>
                            </PrivateComponent>
                            <UncontrolledDropdown nav inNavbar style={{position: "absolute", right: "0", bottom: "0"}}>
                                <DropdownToggle style={{paddingRight: '3vh'}} nav caret>
                                    <span style={{paddingRight: '1vh'}}> {user.name} </span>
                                    {user.picture ? <img src={user.picture} alt="Foto" style={{height: '5.5vh', borderRadius: '5vh', paddingTop: '2px'}}/> :
                                    <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="black" className="bi bi-person-circle" viewBox="0 0 16 16">
                                        <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                                        <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
                                    </svg>}
                                </DropdownToggle>
                                <DropdownMenu right style={{right: '10px'}}>
                                    <PrivateComponent roleList={['administrador' ]}>
                                        <DropdownItem href="" onClick={() => {setOpen(true)}}>
                                            <div style={{textDecoration: 'none', color: 'black', display: 'flex', flexDirection: 'row'}}>
                                                <div style={{paddingRight: '1vh'}}>Solicitudes</div> {
                                                    filtro.length > 0 && 
                                                    <div style={{backgroundColor: '#517392', borderRadius: '100vh', width: '15%', display: 'flex', justifyContent: 'center', color: 'white'}}>
                                                        {filtro.length}
                                                    </div>
                                                }
                                            </div>
                                            <Solicitudes/> 
                                        </DropdownItem>
                                    </PrivateComponent>
                                    <DropdownItem href="">
                                        <Link to="/actualizar" style={{textDecoration: 'none', color: 'black'}}>
                                            Actualizar información
                                        </Link>   
                                    </DropdownItem>
                                    <DropdownItem onClick={() => cerrarSesion()} href="">
                                        Cerrar sesión
                                    </DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown>
                        </Nav>
                    </Collapse>
                </Navbar>
            </OpenDialogContext.Provider>
        </header>
    )
}

export default Header;