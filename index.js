console.log("working");
fetch("http://www.omdbapi.com/?i=tt3896198&apikey=ef07b548")
  .then((res) => res.json())
  .then((data) => console.log(data));
