const con = require('../sqlConnection')
async function GetPositive(req, res) {
    let connection = await con.openConnect()
    res.status(200).send("succseed")
}
module.exports = { GetPositive }
const functions = {
// Adding a corona patient who was found to be positive.
// We will check that the patient was not already sick in the past - by a query that checks that the client does not appear in the positives table.
// If it appears - send an appropriate message.
// If not - we will add to the table using an add query
    AddPositive: (req, res) => {
        try {
            const { positiveCode, clientID, positiveResultDate, recoveryDate } = req.body;
            const IDc = clientID

            const now = new Date();
            const date1 = new Date(positiveResultDate);
            const date2 = new Date(recoveryDate);
            console.log(now);
            console.log(date1);            
            console.log(date2);           
            if(now < date1 || now < date2){
                res.status(422).send("Dates entered are incorrect, you entered future dates.");
            }
            else{
            let checkWasPositive = `select * from positive
            where clientID = '${clientID}'`
            console.log(checkWasPositive);
            con.query(checkWasPositive, (err, result1) => {
                if (err) {
                  res.status(400).send("We have a problem inserting this data");
                }
                else {
                    if(result1.length != 0){
                        res.status(422).send("This client was already a corona patient");
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
                        let sql = `INSERT INTO positive ( positiveCode, clientID, positiveResultDate, recoveryDate)
                        value ('${positiveCode}', '${clientID}',  '${positiveResultDate}' , '${recoveryDate}')`
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
    GetPositives: (req, res) => {
        try {
            const { positiveCode } = req.query;
            let sql = `SELECT * FROM positive `
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
    GetPositiveByClientID: (req, res) => {
        try {
            const { clientID } = req.body;

            let sql = `SELECT * FROM positive where clientID = ${req.params.clientID}`
            console.log(sql);
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
    GetPositiveByNum: (req, res) => {
        try {
            const { positiveCode } = req.body;

            let sql = `SELECT * FROM positive where positiveCode = ${req.params.positiveCode}`
            console.log(sql);
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
    //Showing the ID's of clients who recovered today
    GetRecoveriesToday: (req, res) => {
        try {
            const { recoveryDate } = req.body;
            let sql = `SELECT clientID, Date(recoveryDate) AS recoveryDate
            FROM positive
            WHERE Date(recoveryDate) = curdate()`
            console.log(sql);
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