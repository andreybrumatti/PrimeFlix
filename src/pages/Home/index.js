import { useEffect, useState } from "react";
import api from '../../services/api'; //Saindo da pasta Home, e pages, para acessar a pasta services
import './home.css'
import { Link } from "react-router-dom";

// URL da api: /movie/now_playing?api_key=e68807db0339972b24cea8042fb9741d&language=pt-BR

function Home(){

    const [filmes, setFilmes] = useState([]);
    const [loading, setLoadind] = useState(true);


    useEffect(() =>{
        async function loadFilmes() { // async: Transforma a função em assíncrona ou seja leva um tempo para ir na api, e buscar a lista de filme
            const response = await api.get("movie/now_playing", { //await: função vai aguardar a requisição ser feita para prosseguir ou entao devolver algum erro
                params: {
                    api_key: "e68807db0339972b24cea8042fb9741d",
                    language: "pt-BR",
                    page: 1,
                }
            })

            //console.log(response.data.results.slice(0, 10)); //Pega apenas os 10 primeiros filmes da lista [ 0 á 9]

            setFilmes(response.data.results.slice(0, 10));
            setLoadind(false);

        }

        loadFilmes();

    }, []);


    if(loading){ //se a página estiver carregando, executa o código
        return(
            <div className="loading">
                <h2>Carregando filmes...</h2>
            </div>
        )
    }

    return(
        <div className="container">
            
            <div className="lista-filmes">
                {filmes.map((filme) =>{ //Map passará por todos os elementos dos filmes, retornando apenas o que pedir no article
                    return(
                       <article key={filme.id}>
                        <strong>{filme.title}</strong>
                        <img src={`https://image.tmdb.org/t/p/original/${filme.poster_path}`} alt={filme.title} />
                        <Link to={`/filme/${filme.id}`}>Acessar</Link> 
                       </article> 
                    )
                })}
            </div>
            
        </div>
    )
}
export default Home;