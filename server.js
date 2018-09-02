const express = require('express');
const fs = require('fs');
const app = express();
const bodyParser = require('body-parser');

const jsonFile = __dirname + '/clients.json';
// const jsonFile = __dirname + '/table.html';
const clientForm = __dirname + '/table.html';

let jsonArray = {
    clients: []
};

app.use('/', express.static('public')); // lands browser on home page

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/addClient', (req, res) => {
    let fName = req.body.firstName;
    let lName = req.body.lastName;
    let cEmail = req.body.email;
    let cAddress = req.body.address;
    let cAge = req.body.age;

    fs.readFile('clients.json', 'utf8', (err, data) => {
        if (err) {
            console.log(err);
        }
        let index = 0;
        let prevData = JSON.parse(data);
        // console.log(prevData);
        let dataObj = {
            id: 0,
            firstName: fName,
            lastName: lName,
            email: cEmail,
            address: cAddress,
            age: cAge,
        };

        prevData.clients.forEach(client => {
            if (client.id === index) index++;
            jsonArray.clients.push(client);
        });

        dataObj.id = index;
        jsonArray.clients.push(dataObj);
        //console.log(jsonArray);
        console.log(dataObj);
        // fs.writeFile('public/table.html', {root: __dirname} => {
        //     document.getElementsByClassName('test')[0].innerHTML = dataObj;
        // });
        fs.writeFile(jsonFile, JSON.stringify(jsonArray), 'utf8', (err) => {
            if (err) console.log(err);
            // res.sendFile(jsonFile);
            // res.sendFile(dataObj);

            res.sendFile('public/table.html', {root: __dirname});

            // myObj = JSON.parse(this.responseText);
            // txt += "<table border='1'>"
            // for (x in myObj) {
            //     txt += "<tr><td>" + myObj[x].name + "</td></tr>";
            // }
            // txt += "</table>"
            // document.getElementById("currClients").innerHTML = txt;

            // res.sendFile('/.table.html', jsonArray, (err) => {
            //     if (err) console.log(err);
            //     console.log('Table connected');
            // });


        });


    });

    // res.sendFile(jsonFile);
});

// app.post('/table', (req, res) => {
//     res.sendFile(jsonFile);
// });

app.listen(3000,() => {
    console.log('Listening on port 3000!');
});

// function mergeValues(jsonArray, '/table.html')  {
//     for (let key in jsonArray) {
//         content = content.replace("{{" + key + "}}")
//     }
//     return content;
// }
//
// function view('/table.html', jsonArray, res) {
//     let fileContent = fs.readFileSync('/.views'+templateName+'.html', 'utf8',);
//     fileContent = mergeValues(jasonArray, fileContent)
//     fs.write(fileContent);
// }
//
// module.exports.view =view;