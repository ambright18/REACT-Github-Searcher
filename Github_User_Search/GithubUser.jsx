import React, {useState} from "react";
import styles from '../Github_User_Search/GithubUser.module.css';

// import the API we'll need for this project

const API_URL = "https://api.github.com";

async function fetchResults(query){
    try{
        const response = await fetch(`${API_URL}/search/users?q=${query}`);
        const json = await response.json();
        return json.items || [];
    } catch(e){
        throw new Error(e);
    }
}

export default function GithubUser(){
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);

    const onSearchChange = (event) => {
        setQuery(event.target.value);
    }

    async function onSearchSubmit(event) {
        event.preventDefault();
        const results = await fetchResults(query);
        setResults(results);
    }

    return(
        <div className={styles.app}>
            <main className={styles.main}>
                <h2>Alex's Github Searcher</h2>
                <Form
                onChange={onSearchChange}
                onSubmit={onSearchSubmit}
                value={query} />
                <h3>Results</h3>
                <div id="results">
                    <div>
                        {results.map((user) => (
                            <User 
                            key={user.login}
                            avatar={user.avatar_url}
                            url={user.html_url}
                            username={user.login} />
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
}

const User = ({avatar, url, username}) => {
    return(
        <div className={styles.user}>
            <img src={avatar} alt="Profile" />
            <a href={url} target="_blank" rel="noopener noreferrer">
                {username}
            </a>
        </div>
    );
}

const Form = ({onSubmit, onChange, value}) => {
    return(
        <form className={styles.searchForm} onSubmit={onSubmit}>
            <input
            id="search"
            type="text"
            placeholder="Enter a username or email"
            onChange={onChange}
            value={value} />
            <button type="submit">Search</button>
        </form>
    );
}
