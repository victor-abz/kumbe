import { unlink } from "fs";
import { translate } from "../config";
import { getLang, QueryHelper, serverResponse } from "../helpers";
import { Partner } from "../models";
import { getData } from "../libraries/gAnalytics";

const partnerDb = new QueryHelper(Partner);

export const getAnalytics = async (req, res) => {
    const { metrics, startDate, endDate } = req.query;
    console.log(`Requested metrics: ${metrics}`);
    console.log(`Requested start-date: ${startDate}`);
    console.log(`Requested end-date: ${endDate}`);
    Promise.all(
        getData(metrics ? metrics.split(",") : metrics, startDate, endDate)
    )
        .then((data) => {
            // flatten list of objects into one object
            const body = {};
            Object.values(data).forEach((value) => {
                Object.keys(value).forEach((key) => {
                    body[key] = value[key];
                });
            });
            res.send({ data: body });
            console.log("Done");
        })
        .catch((err) => {
            console.log("Error:");
            console.log(err);
            res.send({ status: "Error getting a metric", message: `${err}` });
            console.log("Done");
        });
};

export const getAnalyticsGraph = async (req, res) => {
    const { metric } = req.query;
    console.log(`Requested graph of metric: ${metric}`);
    // 1 week time frame
    let promises = [];
    for (let i = 7; i >= 0; i -= 1) {
        promises.push(getData([metric], `${i}daysAgo`, `${i}daysAgo`));
    }
    promises = [].concat(...promises);
    Promise.all(promises)
        .then((data) => {
            // flatten list of objects into one object
            const body = {};
            body[metric] = [];
            Object.values(data).forEach((value) => {
                body[metric].push(
                    value[metric.startsWith("ga:") ? metric : `ga:${metric}`]
                );
            });
            console.log(body);
            res.send({ data: body });
            console.log("Done");
        })
        .catch((err) => {
            console.log("Error:");
            console.log(err);
            res.send({ status: "Error", message: `${err}` });
            console.log("Done");
        });
};
