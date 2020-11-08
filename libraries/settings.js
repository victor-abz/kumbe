export const reports = [
    {
        dimensions: "ga:pagePath, ga:pageTitle", // Page Views
        metrics:
            "ga:pageviews",
        name: 'Page Views'
    },
    {
        dimensions: "ga:day", // Monthly Page Views
        metrics:
            "ga:pageviews",
        name: 'Page Views Monthly'
    },
    {
        dimensions: "ga:city", // Users
        metrics:
            "ga:users,ga:newUsers",
        name: 'Users'
    },
    {
        dimensions: "ga:city", // City
        metrics:
            "ga:users",
        name: 'City'
    },
    {
        dimensions: "ga:country", // Country
        metrics:
            "ga:users",
        name: 'Country'
    },
    {
        dimensions: "ga:channelGrouping,ga:userAgeBracket", // Age
        metrics:
            "ga:users",
        name: 'Age'
    },
    {
        dimensions: "ga:channelGrouping,ga:userGender", // Gender
        metrics:
            "ga:users",
        name: 'Gender'
    },
];
