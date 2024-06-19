export default async function Page() {
  const links = await GetPaginatedUsers("string",0);
  return <>
  <h3>All Players:</h3>
  {links.map((link: any) => {
      <>
        <div>
          <span><h1>{link.username}</h1></span>
          <span><p>{link.mouse}</p></span>
        </div>
        <br/>
      </>
  })}
</>
}


  async function GetPaginatedUsers(username: string, start: number) {
    const data = {
      username: "string",
      start: 0
    };

    const response = await fetch(process.env.url + '/Data/getAllData', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return response.json()
  }