import { useEffect, useState } from "react";
import api from '../../services/api';

// URL da api: /movie/now_playing?api_key=e68807db0339972b24cea8042fb9741d&language=pt-BR

function Home(){

    const [filmes, setFilmes] = useState([]);


    useEffect(() =>{
        async function loadFilmes() {
            const response = await api.get("movie/now_playing", {
                params: {
                    api_key: "e68807db0339972b24cea8042fb9741d",
                    language: "pt-BR",
                    page: 1,
                }
            })

            console.log(response.data.results);

        }

        loadFilmes();

    }, []);

    return(
        <div>
            <h1>Home</h1>
        </div>
    )
}
export default Home;