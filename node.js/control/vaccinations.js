const { boolean } = require('yup')
const con = require('../sqlConnection')
async function GetVaccination(req, res) {
    let connection = await con.openConnect()
    res.status(200).send("succseed")
}
module.exports = { GetVaccination }
const functions = {
    AddVaccination: (req, res) => {
        try {
            const { vaccinationNum, manufacturer, clientID, dateV} = req.body;    
            // let check = `SELECT count(clientID) as count from vaccinations
            // where clientID = '${clientID}'`
            // let finish = false;
            // con.query(check, (err, result1) => {
            //     if (err) {
            //         res.status(400).send("We have a problem inserting this data");
            //     }
            //     else {
            //         console.log(result1);
            //         console.log(result1[0]);
            //         console.log(result1[0].count);

            //         let count = parseInt(result1[0].count); // Parse the count result to an integer
            //         finish = count >= 4? true : false;
            //         console.log(finish);
            //     }
            // })
            // if(finish == false){
                console.log("inn");
                let sql = `INSERT INTO vaccinations (vaccinationNum, manufacturer, clientID, dateV)
            value('${vaccinationNum}','${manufacturer}','${clientID}','${dateV}')`
                        console.log(sql)
            con.query(sql, (err, result) => {
                if (err) {
                    res.status(400).send("We have a problem inserting this data");
                }
                else {
                    res.status(200).send(result);
                }
            })
        // } else{
            // res.status(400).send("This client did 4 vacinations.");
        // }
        } catch (err) {

            res.status(500).send("We have a problem connecting to database");
        }
    },

    GetVaccinationsByClientID: (req, res) => {
        try {
            const { vaccinationNum } = req.query;
            let sql = `SELECT vaccinationNum, manufacturer, dateV, ID, firstName, lastName, mobilePhone
            FROM vaccinations v INNER JOIN clients c on v.clientID = c.ID
            where clientID ="${req.params.clientID}" `
            con.query(sql, (err, result) => {
                if (err) {
                    console.log(result)
                    res.status(400).send('wrong data');
                } else {
                    res.status(200).send(result);
                }
            })
        } catch (err) {
            res.status(500).send("We have a problem connecting to database");
        }
    },
    GetVaccinationsByNum: (req, res) => {
        try {
            const { vaccinationNum } = req.body;
            let sql = `SELECT * FROM vaccinations WHERE vaccinationNum = '${req.params.vaccinationNum}'`
            console.log(sql)
            con.query(sql, (err, result) => {
                if (err) {
                    res.status(400).send('wrong data')
                } else {
                    res.status(200).send(result)
                }
            })
        } catch (err) {
            res.status(500).send("We have a problem connecting to database")
        }
    }
}
module.exports = functions;