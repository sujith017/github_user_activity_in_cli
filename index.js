const { json } = require("express");
const fs = require("fs");
const path = require("path");





const fetchactivity = async (name) => {
    const resp = await fetch(
        `https://api.github.com/users/${name}/events`
    );

    if(!resp.ok)
    {
        if(resp.status === 404)
        {
            throw new error("user not found");
        }
        else{
            throw new error(`$resp.status`);
        }
    }
    return resp.json();
}

const display = (events) =>{
    if(events.length === 0)
    {
        console.error("no activity found");
        return;    
    }
    events.forEach(event => {
       let action;
       
       switch(event.type)
       {
         case "PushEvent":
            // const commitcount = event.playload.commits.length;
            const commitCount = event.payload.commits.length;
            // action = `Pushed ${commitcount} to ${event.repo.name}`;
            action = `Pushed ${commitCount} commit(s) to ${event.repo.name}`;
            break;
        case "ForkEvent":
            action = `Forkded ${event.repo.name}`;
       }
       console.log(`${action}`);
    });


    fs.writeFileSync(File, JSON.stringify(events,null,2));
}

const name = process.argv[2];
const File = path.join(__dirname,`${name}.json`);
if(!name)
{
    console.error("Please provide a name");
    process.exit(1);
}

fetchactivity(name)
.then((event) =>{
    display(event);
})
.catch(err =>{
    console.error(err.message);
});