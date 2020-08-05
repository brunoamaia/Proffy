import React from 'react';
import { Link } from 'react-router-dom';

import logoImg from '../../assets/images/logo.svg';
import backIcon from '../../assets/images/icons/back.svg';

import './styles.css';

interface PageHeaderProps {
    title: string;
    description?: string;   // A interrrogação é para falar que não é obrigatório
}

// React Functional Component
// Tenho um componente chamado PageHeader, que é um Componente Funcional, 
// com as propriedades do <PageHeaderProps>

// props recebe todos os parametros, depois chamo cada um
const PageHeader:React.FC<PageHeaderProps> = (props) => {
    return(
        <div className="page-header">
                <div className="top-bar-container">
                    <Link to="/">
                        <img src={backIcon} alt="voltar"/>
                    </Link>
                    <img src={logoImg} alt="Profyf"/>
                </div>

                <div className="header-content">
                    <strong>{props.title}</strong>
                        { props.description && <p>{props.description}</p> }
                    {props.children}
                </div>
            </div>
    )
}

export default PageHeader;