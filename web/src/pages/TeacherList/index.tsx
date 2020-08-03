import React from 'react';

import PageHeader from '../../components/PageHeader';

import whatsappIcon from '../../assets/images/icons/whatsapp.svg';

import './styles.css'

function TeacherList() {
    return(
        <div id="page-teacher-list" className="container">
            <PageHeader
                title="Estes são os proffys disponíveis."
            >
                <form id="search-teachers">
                    <div className="input-block">
                        <label htmlFor="subject"> Matéria </label>
                        <input type="text" id="subject"/>
                    </div>

                    <div className="input-block">
                        <label htmlFor="week_day"> Dia da Semana </label>
                        <input type="text" id="week_day"/>
                    </div>

                    <div className="input-block">
                        <label htmlFor="time"> Hora </label>
                        <input type="text" id="time"/>
                    </div>
                </form>
            </PageHeader>

            <main>
                <article className="teacher-item">
                    <header>
                        <img src="https://avatars2.githubusercontent.com/u/62728443?s=460&u=c10bcf9ef144d4280eea367681557468cc124106" alt=""/>
                        <div>
                            <strong>Bruno Alves Maia</strong>
                            <span>Matemática</span>
                        </div>
                    </header>

                    <p>
                        Entusisata das Melhores tecnologias de Matemática.
                        <br/> <br/>
                        Apaixonado por explodir coisas em laboratório e 
                        por mudar a de pessoas através de expêriencias.
                        Mais de 200.000 pessoas já passaram por uma de 
                        minhas explosões
                    </p>

                    <footer>
                        <p>
                            Preço/hora
                            <strong>R$ 20,00</strong>
                        </p>

                        <button>
                            <img src={whatsappIcon} alt="whatsapp"/>
                            Entrar em contato
                        </button>
                    </footer>
                </article>
            </main>
        </div>
    )

}

export default TeacherList;