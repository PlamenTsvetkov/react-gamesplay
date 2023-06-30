const url = 'http://localhost:5000/games';

export const getAll = () =>{
    return fetch(url)
    .then(res => res.json())
    .catch(error => console.log(error))
};

export const getHomeGame = () =>{
    const currentUrl = "http://localhost:5000/games?_sort=_createdOn&_order=desc"
    return fetch(currentUrl)
    .then(res => res.json())
    .catch(error => console.log(error))
};

export const getOne = (gameId:string | undefined) =>{
    return fetch(`${url}/${gameId}`)
    .then(res => res.json())
    .catch(error => console.log(error))
};

