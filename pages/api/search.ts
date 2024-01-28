import { NextApiRequest, NextApiResponse } from "next";
import yts from "yt-search";

export default async function handler(req : NextApiRequest, res : NextApiResponse) {
    const query = req.body
    const responseArr = (await yts(query)).videos
    const results = responseArr.map((response) => ({
        videoId : response.videoId,
        url : response.url,
        title : response.title,
        description : response.description,
        image : response.image,
        ago : response.ago,
        views : response.views,
        artist : response.author.name,
        artistUrl : response.author.url,
    }))
    results.sort((a,b) => b.views  - a.views)
    res.json(results);
    
}