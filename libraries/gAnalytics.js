const { google } = require('googleapis');

// Config
const clientEmail = process.env.GA_CLIENT_EMAIL;
const privateKey = process.env.GA_PRIVATE_KEY.replace(new RegExp("\\\\n", "\g"), "\n")
const scopes = ['https://www.googleapis.com/auth/analytics.readonly'];

// API's
const analytics = google.analytics('v3');
const viewId = process.env.GA_VIEW_ID;
const jwt = new google.auth.JWT({
  email: clientEmail,
  key: privateKey,
  scopes,
});

async function getMetric(metric, startDate, endDate) {
    await setTimeout[Object.getOwnPropertySymbols(setTimeout)[0]](
      Math.trunc(1000 * Math.random()),
    ); // 3 sec
    const result = await analytics.data.ga.get({
      auth: jwt,
      ids: `ga:${viewId}`,
      'start-date': startDate,
      'end-date': endDate,
      metrics: metric,
    });
    const res = {};
    res[metric] = {
      value: parseInt(result.data.totalsForAllResults[metric], 10),
      start: startDate,
      end: endDate,
    };
    return res;
  }

  function parseMetric(metric) {
    let cleanMetric = metric;
    if (!cleanMetric.startsWith('ga:')) {
      cleanMetric = `ga:${cleanMetric}`;
    }
    return cleanMetric;
  }
export const getData = (metrics = ['ga:users'], startDate = '30daysAgo', endDate = 'today') =>  {
    // ensure all metrics have ga:
    const results = [];
    for (let i = 0; i < metrics.length; i += 1) {
      const metric = parseMetric(metrics[i]);
      results.push(getMetric(metric, startDate, endDate));
    }
    return results;
  }
