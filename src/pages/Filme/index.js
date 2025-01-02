import { useEffect, useState } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import api from '../../services/api'
import './filmesInfo.css'

function Filme() {

    const { id } = useParams();
    const navigation = useNavigate();
 
    const [filme, setFilme] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        async function loadFilme() { //Função que retornará o filme específico de acordo com o seu id passado no useParams
            await api.get(`/movie/${id}`, {
                params: {
                    api_key: "e68807db0339972b24cea8042fb9741d",
                    language: "pt-BR",
                }
            })
                .then((response) => {
                    setFilme(response.data); //Armazena os dados retornados pela api em response
                    setLoading(false); //Retira a mensagem carregando filmes ao rederizar o conteúdo do filme
                })
                .catch(() => {
                    navigation("/", { replace: true }) //Redireciona o usuário para a página Home caso o filme não seja encontrado
                    return; //Para de executar o bloco, após o redirecionamento
                })
        }

        loadFilme(); 

        return () => {
            console.log("Componente foi desmontado!");

        }
    }, [navigation, id])

    function salvarFilme(){
        const minhaLista = localStorage.getItem("@primeFlix");

        let filmesSalvos = JSON.parse(minhaLista) || []; //Salva o filme no localStorage

        const hasFilme = filmesSalvos.some((filmesSalvo) =>filmesSalvo.id === filme.id); //Compara o filme salvo e o filme que está na página, Retornando true or false

        if(hasFilme) { // Se estiver na lista do local storage, executa o bloco
            toast.warn("Esse filme já está em sua lista!");
            return;
        } 

        //Se não estiver, coloca o filme no array de filmesSalvos
        filmesSalvos.push(filme);
        localStorage.setItem("@primeFlix", JSON.stringify(filmesSalvos)); //Transforma em string, pois não é possivel salvar em array, logo salva o mesmo no localStorage
        toast.success("Filme salvo com sucesso!");
    }

    if (loading) {
        return (
            <div className="filme-info">
                <h1>Carregando detalhes...</h1>
            </div>
        )
    }

    return ( //Redezira todas as informações e detalhes sobre o filme na página
        <div className="filme-info">
            <h1>{filme.title}</h1>
            <img src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`} alt={filme.title} />

            <h3>Sinopse</h3>
            <span>{filme.overview}</span>
            <strong>Avaliação: {filme.vote_average.toFixed(1)} / 10</strong>

            <div className="area-buttons">
                <button onClick={salvarFilme} >Salvar</button>
                <button><a target="blank" rel="external" href={`https://youtube.com/results?search_query=${filme.title} Trailer`}>
                {/* REDIRECIONA O USUÁRIO PARA OUTRA PÁGINA COM A PESQUISA TRAILER DO FILME  */}
                    Trailer</a>
                </button>
            </div>
        </div>
    )
}
export default Filme;