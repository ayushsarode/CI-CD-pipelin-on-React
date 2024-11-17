import  { useEffect, useState } from "react";
import axios from "axios";

const ApiPractice = () => {
  const [animes, setAnimes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("https://api.jikan.moe/v4/anime");
        setAnimes(res.data.data); // Adjusted to match the API response structure
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const filteredAnimes = animes.filter(
    (anime) =>
      anime.title.toLowerCase().includes(search.toLowerCase()) ||
      anime.synopsis.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
   
    <div >
      <h2>AnimeDex</h2>
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Enter anime name"
      />
      {/* {filteredAnimes.map((anime) => (
        <h1 key={anime.mal_id}>{anime.title}</h1> // Added key prop
      ))} */}

      {filteredAnimes.map((anime) => (
        <div key={anime.mal_id}>
          <div
            style={{
            //   border: "2px solid black",
              margin: "10px",
              padding: "10px",
              backgroundColor: "#9694FF",
              color: "white",
              borderRadius: "12px"
            }}
          >
            <p
              style={{
                // border: "2px solid black",
                display: "inline-block",
                padding: "4px",
                marginBottom: "0px",
              }}
            >
              {anime.title}
            </p>

            <p>{anime.synopsis}</p>
          </div>
        </div>

        // Added key prop
      ))}
      </div>
      
    </>
  );
};

export default ApiPractice;
