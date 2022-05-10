import { API_URL, postData } from "./WebApiHelper";
const url = API_URL;
export default {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  login(credentials: { username: string; password: string }): Promise<any> {
    return postData(url + "login", credentials);
  },
};
