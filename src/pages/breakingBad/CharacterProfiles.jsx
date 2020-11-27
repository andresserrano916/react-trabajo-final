import React, { useEffect, useState } from 'react'
import axios from 'axios';

const CharacterProfiles = () => {

    const [character, setCharacter] = useState(null);

    useEffect(() => {
        axios.get('https://www.breakingbadapi.com/api/characters/1')
            .then((data) => {
                setCharacter(data.data[0]);
            }).catch((error) => console.log(error));
    }, []);

    return (
        <div>
            {character && (
                <>
                    <p><b>Name: </b>{character.name}</p>
                    <p><b>Nickname: </b>{character.nickname}</p>
                    <p><b>Status: </b>{character.status}</p>
                    <p><b>Birthday: </b>{character.birthday}</p>
                    <img src={character.img} alt={character.name}/> 
                    <p><b>Occupation: </b></p>
                    <ul>
                        {character.occupation.map((item) => (
                            <li key={item}>{item}</li>
                        ))}
                    </ul>
                </>
            )}
        </div>
    )
};

export default CharacterProfiles;
