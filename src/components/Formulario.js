import React,{useEffect, useState} from "react";
import styled from "@emotion/styled";
import useMoneda from "../hooks/useMoneda";
import useCriptomoneda from "../hooks/useCriptomoneda";
import axios from "axios";
import Error from "./Error";


const Boton = styled.input`
margin-top: 20px;
font-weight: bold;
font-size: 20px;
padding: 10px;
background-color: #66A2FE;
border: none;
width: 100%;
border-radius: 10px;
color: #FFF;
transition: background-color .3s ease;

&:hover {
    background-color: #326AC0;
    cursor: pointer;
`


    
   const Formulario = ({guardarMoneda, guardarCriptomoneda}) =>{

    const[listacripto, guardarCriptomonedas] = useState([]);
    const[error, guardarError] = useState(false);

    const MONEDAS = [
        {codigo: 'ARS', nombre: 'Peso Argentino'},
        {codigo: 'USD', nombre: 'Dolar'},
        {codigo: 'EUR', nombre: 'Euro'},
        {codigo: 'GBP', nombre: 'Libra'}
    ];

   
    

    const [moneda, SelectMonedas] = useMoneda("Elige tu moneda", "", MONEDAS);

    const [criptomoneda, SelectCripto,] = useCriptomoneda("Elige tu criptomoneda", "", listacripto);

useEffect(() => {
    const consultarAPI = async () => {
        const url = "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD";
        const resultado = await axios.get(url);
    guardarCriptomonedas(resultado.data.Data);
    }
    
    consultarAPI();
}, []);

    const cotizarMoneda = e => {
        e.preventDefault();
        if(moneda === '' || criptomoneda === ''){
            guardarError(true);
            return;
        }
        guardarError(false);
        guardarMoneda(moneda);
        guardarCriptomoneda(criptomoneda);
    };
       


    

    return (
        <form onSubmit= {cotizarMoneda}
                >
                    {error ? <Error mensaje="Todos los campos son obligatorios"/> : null}

            <SelectMonedas />
            <SelectCripto />
            <Boton
                type="submit"
                value="Calcular"
                />
        
        </form>
    );
}
 
    export default Formulario;