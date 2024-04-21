const { JSDOM } = require("jsdom")

async function crawlPage(currentURL){
    console.log(`actively crawling ${currentURL}`)

    try {
        const resp = await fetch(currentURL)
        if (resp.status > 399) {
            console.log(`error in fetch with status code: ${resp.status} on page: ${currentURL}`)
            return
        }
        const contentType = resp.headers.get("content-type")
        if (!contentType.includes("text/html")){
            console.log(`non html response, content type : ${contentType}, on page: ${currentURL}`)
            return
        }

        console.log(await resp.text())
    } catch (err){
        console.log(`error in fetch: ${err.message}, on page: ${currentURL}`)
    }
}

function normalizeURL(urlString){
    let newURL = urlString;
    const testString = urlString
    const protocolPattern = /^https?:\/\/(www\.)?/;
    newURL = newURL.replace(protocolPattern, '')
    
    newURL = newURL.replace(/\/$/, "");
    return newURL;
}


// function normalizeURL_BOOTDEV_version(urlString){
//     const urlObj = new URL(urlString)
//     const hostPath = `${urlObj.hostname}${urlObj.pathname}`
//     if (hostPath.length) > 0 && hostPath.slice(-1) === '/'{
//         return hostPath.slice(0, -1)
//     }
//     return hostPath
// }


function getURLsFromHTML(htmlBody, baseURL){
    
    const dom = new JSDOM(htmlBody)
    const links = dom.window.document.querySelectorAll('a') 
    console.log("BaseURL at function start: ", baseURL);
    let URLs = [];
    links.forEach((link) => {
       let href = link.href
        if (!href.startsWith("https://") && !href.startsWith("http://")) {
            console.log(href, baseURL);
            href = new URL(href, baseURL).href;
        }
        URLs.push(href);
    });
    return URLs
}



module.exports = {
    normalizeURL,
    getURLsFromHTML,
    crawlPage
  };
  


//Im scraping some website (let's call it https://website.com). I have access to website.com's html info. I need to extract the href info and prepend and append necessary elements. 
