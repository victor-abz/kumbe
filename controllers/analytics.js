import { unlink } from "fs";
import { translate } from "../config";
import { getLang, QueryHelper, serverResponse } from "../helpers";
import { Partner } from "../models";
import { getData } from "../libraries/gAnalytics";
import { reports } from '../libraries/settings';


export const getAnalytics = async (req, res) => {
    const { metrics, dimension, startDate, endDate } = req.query;

    Promise.all(
        getData(reports, startDate, endDate)
    )
        .then((data) => {
            // flatten list of objects into one object
            res.send(data);
            console.log("Done");
        })
        .catch((err) => {
            console.log("Error:");
            console.log(err);
            res.send({ status: "Error getting a metric", message: `${err}` });
            console.log("Done");
        });
};
