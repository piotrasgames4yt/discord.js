const Discord = require("discord.js");
var fs = require("fs");

const client = new Discord.Client();

require("./functions.js")(client);
client.commands = new Discord.Collection();

fs.readdir("./commands/", (err, files) =>{
    if(err) console.log(err);

    let jsfile = files.filter(f => f.split(".").pop() === "js");

    if(jsfile.length <= 0){
        console.log("Wystąpił błąd bota! Folder ./commands/ jest pusty!");
    }

    jsfile.forEach((f) =>{
        let props = require(`./commands/${f}`);
        client.commands.set(props.help.name,props)
    })
})

client.on("ready",() => {
    console.log(`Zalogowano jako ${client.user.tag}`);
})

const playList = [
    'Prefix: %',
    '2 servers',
    'Tom Bot',
    '2 servers',
]

setInterval(()=>{
    const index = Math.floor(Math.random()* (playList.length - 1 ) + 1);
    client.user.setActivity(playList[index])
}, 3*1000)

client.on("message", async message =>{

    let nocmd = new Discord.RichEmbed()
    .setAuthor(message.author.tag, `https://cmkt-image-prd.freetls.fastly.net/0.1.0/ps/1715722/910/607/m1/fpnw/wm0/16-.jpg?1475291392&s=3a54197cc4a33b8f8085d07ab8f642d7`)
    .setTitle(`Nie znaleziono komendy!`)
    .setDescription(`Nie ma takiej komendy! Liste komend sprawdzisz pod .pomoc`)
    .setColor(`#FF0000`)
    .setThumbnail(`https://cmkt-image-prd.freetls.fastly.net/0.1.0/ps/1715722/910/607/m1/fpnw/wm0/16-.jpg?1475291392&s=3a54197cc4a33b8f8085d07ab8f642d7`)
    .setFooter(`Tom Bot`, `https://cmkt-image-prd.freetls.fastly.net/0.1.0/ps/1715722/910/607/m1/fpnw/wm0/16-.jpg?1475291392&s=3a54197cc4a33b8f8085d07ab8f642d7`)
    .setTimestamp();

  

    if(message.content === "siema")return message.channel.send("Elo!");

    let prefix = '.';
    if(!message.content.startsWith(prefix)) return;

    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let args = messageArray.slice(1);
    let commandfile = client.commands.get(cmd.slice(prefix.length));
    if(commandfile) commandfile.run(client,message,args);
    if(!commandfile) return message.channel.send(nocmd)
		
});

client.login("NzI2ODA1OTYzNjY3MTQ0NzE0.Xvio5w.X2V5R4yQ2cW5Hi1lAjkVkf81gdk");

module.exports = {
	client: client
}