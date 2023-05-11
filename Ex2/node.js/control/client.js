const con = require('../sqlConnection')
async function GetClient(req, res) {
    let connection = await con.openConnect()
    res.status(200).send("succseed")
}
module.exports = { GetClient }
const functions = {
    //add a new client with checking of future date and exist in db
    AddClient: (req, res) => {
        try {            
            const { ID, firstName, lastName, dateOfBirth, phone, mobilePhone, city, street, numBuilding } = req.body;
           const IDc = ID;
           const now = new Date();
            const date1 = new Date(dateOfBirth);
            console.log(now);
            console.log(date1);       
            if(now < date1){
                res.status(422).send("Date of bieth entered is incorrect, you entered future date.");
            }
            else{          
            let checkClient = `select * from clients where ID = ${IDc}`
            console.log(checkClient);
            con.query(checkClient, (err, result) => {
                if (err) {
                    res.status(400).send('We have a problem inserting this data')
                } else {
                    if(result.length != 0){
                        res.status(422).send("This client already exists in the database.");
                    }
                    else{
                        let sql = `INSERT INTO clients ( ID, firstName, lastName, dateOfBirth, phone, mobilePhone, city, street, numBuilding)
                        value (${ID}, '${firstName}', '${lastName}', '${dateOfBirth}','${phone}' ,'${mobilePhone}' ,'${city}' ,'${street}',${numBuilding})`
                        console.log(sql)
                        con.query(sql, (err, result) => {
                                if (err) {  
                                   res.status(400).send("We have a problem inserting this data");
                                } else {
                                   res.status(200).send(result);
                                }
                            })
                        }
                    }
            })
        }
        } catch (err) {
            res.status(500).send("We have a problem connecting to database");
        }
    },
    //Showing all the clients of the HMO
    GetClients: (req, res) => {
        try {
          
            let sql = `SELECT * FROM clients`
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
    //Get client by his ID
    GetClient: (req, res) => {
        try {
            const { ID } = req.body;
            let sql = `SELECT * FROM clients where ID = ${req.params.ID}`
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
    //(bonus) - displaying all clients who have not been vaccinated.
    GetClientsNotVaccinated: (req, res) => {
        try {
            let sql = `SELECT * from clients
            where ID NOT IN (select clientId from vaccinations)`
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