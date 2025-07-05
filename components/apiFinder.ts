export default async function apifinder(apiUrl: string | URL | Request, apiKey: string) {
  try {
    if(!apiKey){
        const response = await fetch(apiUrl)
    if (!response.ok) {
      throw new Error(`HTTP error! ${response.status}`);
    }
    const data = await response.json();
    console.log("Fetched Data:", data);
    return data;
}else{
        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
              "X-Api-Key": apiKey
            }})
        if (!response.ok) {
            throw new Error(`HTTP error! ${response.status}`);
        }
        const data = await response.json();
    console.log("Fetched Data:", data);
    return data;
    }

  } catch (error) {
    console.error('Error in fetching data:', error);
    throw error;
  }
}
