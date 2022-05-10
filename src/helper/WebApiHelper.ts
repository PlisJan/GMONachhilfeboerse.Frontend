export const API_URL = "https://"+location.host+"/nachhilfeboerse/api/";

export async function postData(
  url: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: { [name: string]: any }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): Promise<{ [name: string]: any }> {
  // Default options are marked with *
  const response = await fetch(url, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  });
  return response.json(); // parses JSON response into native JavaScript objects
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function getData(url: string): Promise<{ [name: string]: any }> {
  const response = await fetch(url, {
    method: "GET", // *GET, POST, PUT, DELETE, etc.,
  });
  return response.json();
}
