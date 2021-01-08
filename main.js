//to anyone reading,i have stoped working on this project.I am fairly new to coding so if any of this code is not upto par please fix it your self
//i started this project because i wanted everyone to have access to a simple mod that ahem ahem someone locked behind a in-game pay wall
//my plans for this project was to add a discord bot to output the arrys,if you want you can do it yourself.
//i will not explain how to use this,if you know you know
//dependencies for code to work.
const Discord = require("discord.js");
const fetch = require('node-fetch');
const client = new Discord.Client();

//declaring variables
let pagecount = 0;
let auctions;
let BinList = [];
let tempPrice = [];
let tempName;
let tempTier;
let output = [];
let preventDupe = [];
findingbins();

//finding the auctions with bins and storing it in an arry.
async function findingbins(){
    await fetch(`https://api.hypixel.net/skyblock/auctions?page=${pagecount}`)
    .then(res => res.json())
    .then(API =>{
        //looping through the function to check multiple pages of API
        if(pagecount < API.totalPages){
        auctions = API.auctions;
        //going through all the auctions and checking if they are a BIN if yes then storing it
        for(i=0 ;i<auctions.length; i++){
            if (auctions[i].bin && auctions[i].item_name != 'Enchanted Book'){
                BinList.push([auctions[i].item_name, auctions[i].starting_bid,auctions[i].tier]);
            }
        }
        pagecount++;
        console.log(pagecount);
        findingbins();
        }
        //if the function has been called equal to the ammount of totalpages then we move on to cal
        else if(pagecount == API.totalPages){
            cal();
        }
    });
    
}
//calculating lowest bin and second lowest bin of a item,subtracting it and displaying items that have 1mil+ profit
    function cal(){
        console.log("TEST");
        //looping through all the items in the stored arry
        for(i=0;i<BinList.length;i++){
            if(preventDupe.includes(BinList[i][0] + BinList[i][2]) === false){
            //looping through the current item I and looping again through the whole arry to check if multiple of the same item exists
            for(i2=0;i2<BinList.length;i2++){
                if(BinList[i][0] == BinList[i2][0] && BinList[i][2] == BinList[i2][2]){
                    tempName = BinList[i][0];
                    tempTier = BinList[i][2];
                    tempPrice.push(BinList[i2][1]);
                }
            }
            preventDupe.push(BinList[i][0] + BinList[i][2]);
            }
            tempPrice.sort(function(a, b){return a-b});
            if(tempPrice.length>1){
            output.push(tempName,tempPrice[1] - tempPrice[0],tempTier);
            if(output[1]>= 1000000){
            console.log(output);
            }
            }
            tempName = '';
            tempTier = '';
            tempPrice = [];
            output = [];
        }



    }























