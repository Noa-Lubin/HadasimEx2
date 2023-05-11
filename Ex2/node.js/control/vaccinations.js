const { boolean } = require('yup')
const con = require('../sqlConnection')
async function GetVaccination(req, res) {
    let connection = await con.openConnect()
    res.status(200).send("succseed")
}
module.exports = { GetVaccination }
const functions = {
//     When adding a vaccine, it is checked whether the client has not yet received 4 vaccines.
// If the client has already been vaccinated - send an appropriate message.
// If not - a new vaccine is added to the vaccine table in the database
    AddVaccination: (req, res) => {
        try {
            const { vaccinationNum, manufacturer, clientID, dateV} = req.body;  
            const IDc = clientID
            const now = new Date();
            const date1 = new Date(dateV);
            console.log(now);
            console.log(date1);           
            if(now < date1){
                res.status(422).send("Date entered is incorrect, you entered future date.");
            }
            else{
                let checkClient = `select * from clients
                where ID = ${IDc}`
    console.log(checkClient);
    con.query(checkClient, (err, result) => {
        if (err) {
            res.status(400).send('We have a problem inserting this data')
        } else {
            if(result.length == 0){
                res.status(422).send("There is no client with this ID");

            }
            else{
                let check = `SELECT count(clientID) as count from vaccinations
                where clientID = '${clientID}'`
                con.query(check, (err, result1) => {
                    if (err) {
                        res.status(400).send("We have a problem inserting this data");
                    }
                    else {
                        
                        let count = parseInt(result1[0].count); // Parse the count result to an integer
                        if(count < 4)
                        {
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
                        }
                        else
                        {
                            res.status(422).send("You did already 4 vaccinations!");
                        }  //else  4  vaccinations            
                    } //else check
                }) // finish con check   
            }//finish else
        }//else checkClient
    }) //finish con  checkClient            

            } // finish else of correct date
        } catch (err) {

            res.status(500).send("We have a problem connecting to database");
        }
    },
    //Displaying all vaccines using a suitable query
    GetVaccinations: (req, res) => {
        try {
            const { vaccinationNum } = req.query;
            let sql = `SELECT * from vaccinations`
            con.query(sql, (err, result) => {
                if (err) {
                    res.status(400).send('wrong data');
                } else {
                    res.status(200).send(result);
                }
            })
        } catch (err) {
            res.status(500).send("We have a problem connecting to database");
        }
    },
    //Displaying all vaccinations of a particular client
    GetVaccinationsByClientID: (req, res) => {
        try {
            const { vaccinationNum } = req.query;
            let sql = `SELECT vaccinationNum, manufacturer, dateV, ID, firstName, lastName, mobilePhone
            FROM vaccinations v INNER JOIN clients c on v.clientID = c.ID
            where clientID ="${req.params.clientID}" `
            con.query(sql, (err, result) => {
                if (err) {
                    res.status(400).send('wrong data');
                } else {
                    res.status(200).send(result);
                }
            })
        } catch (err) {
            res.status(500).send("We have a problem connecting to database");
        }
    },
    //Vaccine search by vaccine number
    GetVaccinationsByNum: (req, res) => {
        try {
            const { vaccinationNum } = req.query;
            let sql = `SELECT * FROM vaccinations WHERE vaccinationNum = "${req.params.vaccinationNum}"`
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
    },

    //Vaccine search by vaccine number
    GetVaccinationsByManufacturer: (req, res) => {
        try {
            const { manufacturer } = req.query;
            let sql = `select * from vaccinations
            where manufacturer = "${req.params.manufacturer}"`
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


