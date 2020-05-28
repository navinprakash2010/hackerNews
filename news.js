const news = () => {
  axios
    .get("https://api.hnpwa.com/v0/news/1.json")
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error;
    });
};
