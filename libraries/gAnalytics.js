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

// Get Metrics function
const  getMetric = async(metrics = ['ga:users'], dimensions, startDate, endDate) => {
    await setTimeout[Object.getOwnPropertySymbols(setTimeout)[0]](
      Math.trunc(10000 * Math.random()),
    ); // 10 sec(Google Timeout)
    const result = await analytics.data.ga.get({
      auth: jwt,
      ids: `ga:${viewId}`,
      'start-date': startDate,
      'end-date': endDate,
      metrics: metrics,
      dimensions: dimensions,
      sort: '-ga:sessions',
		'max-results': 50,
    });
    const res = {};
    res[metrics] = {
      value: result.data,
      start: startDate,
      end: endDate,
    };
    return res;
}


export const getData = (settings, startDate = '30daysAgo', endDate = 'today') =>  {
    const results = [];
    settings.map((item) => {
        const { metrics, dimensions } = item
        return results.push( getMetric(metrics, dimensions, startDate, endDate));
    })

    return results;
}
  