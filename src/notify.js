import pkg from 'request';
const {post}= pkg

export default async function notify(){
    const discordWebHookUrl = process.env.WEBHOOKURL;
    const discordPayload = { json: { content: process.env.SITEURL } };

    post(
        discordWebHookUrl,
        discordPayload,
        function (error, response, body) {
            if (!error && response.statusCode == 200) {
                console.log(body);
            }
        }
    ); 
}


