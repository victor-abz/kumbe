import { translate } from "../config";
import { getLang, serverResponse } from "../helpers";
import { getData } from "../libraries/gAnalytics";
import { reports } from '../libraries/settings';


export const getAnalytics = async (req, res) => {
    const { startDate, endDate } = req.query;
    const lang = getLang(req);

    Promise.all(
        getData(reports, startDate, endDate)
    )
        .then((data) => {
            return serverResponse(res, 200, translate[lang].success, data);
        })
        .catch((err) => {
            return serverResponse(res, 404, "Error getting Analytics");
        });
};
