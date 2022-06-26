const axios = require("axios");

// Set your github username
const username = "paulosrlj";

(async function start(username) {
  const fetchFollowers = async () => {
    const result = await axios.get(
      `https://api.github.com/users/${username}/followers?per_page=100`
    );
    const users = await result.data;
    return users.map((user) => user.login);
  };

  const fetchFollowing = async () => {
    const result = await axios.get(
      `https://api.github.com/users/${username}/following?per_page=100`
    );
    const users = await result.data;
    return users.map((user) => user.login);
  };

  const followers = await fetchFollowers();
  const following = await fetchFollowing();

  const setFollowing = new Set(following);
  const setFollowers = new Set(followers);

  function difference(setA, setB) {
    let _diferenca = new Set(setA);
    for (let elem of setB) {
      _diferenca.delete(elem);
    }
    return _diferenca;
  }

  console.log(difference(setFollowing, setFollowers));

})(username);
