var child_process = require('child_process');
const express = require('express');
const app = express();
const path = require('path');
const port = 3000

app.listen(port);
console.log("3000");
app.use(express.static('public'));


var usrInput = "hakanuludag.com";
const arr = [80, 21, 22, 23, 53, 67, 123, 179, 443, 500, 3389, 8080, 8443]


 app.get('/',(req, res) => {
  usrInput = req.query.host;
  res.sendFile(path.join(__dirname+'/public/pub.html'));
  sanitizeString();

 });

 
 function sanitizeString(){
  usrInput = usrInput.replace(/([^a-z0-9-\s\.]|[,\t\n\f\r\v\0])/gim,"");
  console.log(usrInput.trim());
  usrInput = usrInput.trim();
  ipFunc();
  }




function ipFunc()
{

  ip = child_process.execSync("host " + usrInput + " | awk 'FNR == 1 { print $4 }' | tr -d '\\n' ", {encoding: 'utf-8'});
  test();
  
}
   function test()
 {
  let testObj = {}
  let testArray = []

   for (let i of arr) {
       var child = child_process.spawnSync('timeout', ['--signal=9', '0.2', 'telnet', ip, i], { encoding: 'utf8' });
       console.log(ip);
       if (child.error) {
           console.log("ERROR: ", child.error);
       }
        if (child.status == 1) {
            console.log("Port ", i, " is open")
            testObj = {port: i, isOpen: "Open"};
            testArray.push(testObj)
            testObj = {}
        }
        else {
            console.log("Port ", i, " is closed")
            testObj = {port: i, isOpen: "Closed"};
            testArray.push(testObj)
            testObj = {}
        }
      };
      console.log(testArray);


      app.get('/',(req, res) => {
        res.send(testArray);
        
});

   
 }









































// var ipLong = child_process.spawnSync('host', ['-t','a',usrInput], { encoding: 'utf-8'});
// var ip = child_process.spawnSync('awk', ['FNR == 1 { print $4 }', ${ipLong.output}], {encoding: 'utf-8'});




     // async function ipFunc()
//  {
//   const {
//     stdout,
//     stderr
//   } = await exec("host " + usrInput + " | awk 'FNR == 1 { print $4 }'");
//   console.log(stdout);
// }

// ipFunc();




//  exec("host " + usrInput + " | awk 'FNR == 1 { print $4 }'", (err, stdout, stderr) => {  
//    if (err) {  
//      console.error(err);  
//      return;  
//    }  
     
//  });  


//  (error, asdf, stderr) => {
//     if (error) {
//       console.error(`exec error: ${error}`);
//       return;
//     }
//     console.log(`stdout: ${asdf}`);
//     console.error(`stderr: ${stderr}`);
//     return asdf;
//   });