const getQueryParams = (params: String, url: String) => {
    let href: any = url;
    // this is an expression to get query strings
    let regexp = new RegExp('[?&]' + params + '=([^&#]*)', 'i');
    let qString = regexp.exec(href);
    return qString ? qString[1] : null;
};

export default getQueryParams;