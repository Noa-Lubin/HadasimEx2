const con = require('../sqlConnection')
async function GetClient(req, res) {
    let connection = await con.openConnect()
    res.status(200).send("succseed")
}
module.exports = { GetClient }
const functions = {
    AddClient: (req, res) => {
        try {
            
            const { ID, firstName, lastName, dateOfBirth, phone, mobilePhone, city, street, numBuilding } = req.body;
      
            let sql = `INSERT INTO clients ( ID, firstName, lastName, dateOfBirth, phone, mobilePhone, city, street, numBuilding)
                        value (${ID}, '${firstName}', '${lastName}', '${dateOfBirth}','${phone}' ,'${mobilePhone}' ,'${city}' ,'${street}',${numBuilding})`
                        console.log(sql)
            con.query(sql, (err, result) => {
                if (err) {
                    res.status(400).send("We have a problem inserting this data");
                }
                else {
                    res.status(200).send(result);
                }
            })
        } catch (err) {
            res.status(500).send("We have a problem connecting to database");
        }
    },
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
            // console.log(result);
        } catch (err) {
            res.status(500).send("We have a problem connecting to database");
        }
    },
    GetClient: (req, res) => {
        try {
            const { ID } = req.body;
            let sql = `SELECT * FROM clients where ID = ${req.params.ID}`
            console.log(req.params.ID);
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
    GetClientsNotVaccinated: (req, res) => {
        try {
            let sql = `SELECT * from clients
            where ID NOT IN (select clientId from vaccinations)`
            console.log(req.params.ID);
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