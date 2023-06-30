import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import * as gameService from '../../services/gamesService';
import { RouteParams } from '../../interfaces/rauteParams.interface';
const Delete = () => {
    const navigate = useNavigate();

    const { gameId } = useParams<RouteParams>();

    useEffect(() => {
        gameService.del(gameId).then(() => {
            navigate('/'); 
        });
    }, [navigate]);

    return null;
}

export default Delete;