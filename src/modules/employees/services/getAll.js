import Http from "../../library/Http";
import config from "../../config";

const getAll = async (limit, skip) => {
  try {
    const request =
      limit!==undefined && skip!==undefined
        ? await Http.get(
            `${config.BASE_URL}/employee/all?limit=${limit}&skip=${skip}`
          )
        : await Http.get(`${config.BASE_URL}/employee/all`);
    return request.data;
  } catch (error) {
    throw error.response
  }
};

export default getAll;
