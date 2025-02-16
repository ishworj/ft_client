import { getUser } from "../../helpers/axiosHelper";

export const autoLogin = async () => {
  const accessJWT = localStorage.getItem("accessJWT");
  if (accessJWT) {
    const {status,user} = await getUser();
    return status==="success" ? user : {};
  }
};
