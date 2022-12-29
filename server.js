const { default: axios } = require("axios");
const fs = require("fs")
const username = "Sharex";
const reponame = "ShareX";
axios.defaults.headers.common["Authorization"] = "Bearer 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"
const main = async () => {
    const pageNo = 1
    const apiUrl = new URL(`https://api.github.com/repos/${username}/${reponame}/issues`)
    apiUrl.search = generateSearchString({state: "closed", labels: "enhancement", per_page:100, page: pageNo})
    const response = await axios.get(apiUrl.href)
    const issues= response.data
    const commit_urls = []
    for (const issue of issues){
        console.log(issue)
        const response = await axios.get(issue.events_url)
        let events = response.data
        events.map(event => {
            if(event.commit_url){
                commit_urls.push(event.commit_url)
            }
 
        })
 
    }
    const commits = []
    for (const commit_url of commit_urls){
            console.log(commit_url)
            const response = await axios.get(commit_url)
            commits.push(response.data)
 
    }
    fs.writeFileSync(`./commits_${pageNo}.json`, JSON.stringify(commits))
 
    // for (const commit of commits) {
    //     const {files} = commit
    // }
    for (const commit of commits) {
        const {files} = commit.files.blo
    }
}
 //commits array tar bhitore files.blob_url ta hit korte hobe kono ekta library diye

 
const generateSearchString = (params) => {
    let searchString = "";
    for (const param in params) {
        if (searchString !== "") {
            searchString = searchString + "&";
        }
        searchString =
            searchString + param + "=" + encodeURIComponent(params[param]);
    }
    return searchString;
};
main()

// useEffect(() => {
//     const someFunction = async () => {
 
//     }
//     someFunction()
// },[])

//https://api.github.com/repos/ShareX/ShareX/commits/af92b14af3d4068c2f459272f7dcda0fb230f212