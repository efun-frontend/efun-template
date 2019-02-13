class API {
  getData = async () => {
    let data = await fetch(
      "https://api.github.com/repos/vmg/redcarpet/issues?state=closed"
    );
    console.log(data);
  };
  getSomething = async () => {};
}
