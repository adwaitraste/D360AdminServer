const express = require('express');
const router = express.Router();
const db = require('../../database');
const { myError, MissingEntry, InvalidEntry } = require('../../utility/myError');

function validateAddUser(reqBody)
{
    let errorObject = [];
    let wholeNumberPattern = /^\d+$/;

    if(!reqBody.FirstName)
    {
        let error = new myError(MissingEntry, "FirstName");
        errorObject.push(error);
    }
    else
    {
        let FirstNamePattern = /(.*[a-z]){3,}/i;                     
        if(!FirstNamePattern.test(reqBody.FirstName))
        {
            let error = new myError(InvalidEntry, "FirstName");
            errorObject.push(error);
        }
    }

    if(!reqBody.LastName)
    {
        let error = new myError(MissingEntry, "LastName");
        errorObject.push(error);
    }
    else
    {
        let LastNamePattern = /(.*[a-z]){3,}/i;                     
        if(!LastNamePattern.test(reqBody.LastName))
        {
            let error = new myError(InvalidEntry, "FirstName");
            errorObject.push(error);
        }
    }

    if(!reqBody.isActive)
    {
        let error = new myError(MissingEntry, "isActive");
        errorObject.push(error);
    }
    else
    {
        if(reqBody.isActive != 0 && reqBody.isActive != 1)
        {
            let error = new myError(InvalidEntry, "isActive");
            errorObject.push(error);
        }
    }

    if(!reqBody.ChannelID)
    {
        let error = new myError(MissingEntry, "ChannelID");
        errorObject.push(error);
    }
    else
    {
        if(!wholeNumberPattern.test(reqBody.ChannelID))
        {
            let error = new myError(InvalidEntry, "ChannelID");
            errorObject.push(error);
        }
    }

    // if(!reqBody.SalesPersonID)
    // {
    //     let error = new myError(MissingEntry, "SalesPersonID");
    //     errorObject.push(error);
    // }
    // else
    // {
    //     if(!wholeNumberPattern.test(reqBody.SalesPersonID))
    //     {
    //         let error = new myError(InvalidEntry, "SalesPersonID");
    //         errorObject.push(error);
    //     }
    // }

    // if(!reqBody.DesignerID)
    // {
    //     let error = new myError(MissingEntry, "DesignerID");
    //     errorObject.push(error);
    // }
    // else
    // {
    //     if(!wholeNumberPattern.test(reqBody.DesignerID))
    //     {
    //         let error = new myError(InvalidEntry, "DesignerID");
    //         errorObject.push(error);
    //     }
    // }

    if(!reqBody.SalesOfficeID)
    {
        let error = new myError(MissingEntry, "SalesOfficeID");
        errorObject.push(error);
    }
    else
    {
        if(!wholeNumberPattern.test(reqBody.SalesOfficeID))
        {
            let error = new myError(InvalidEntry, "SalesOfficeID");
            errorObject.push(error);
        }
    }

    if(!reqBody.SalesGroupID)
    {
        let error = new myError(MissingEntry, "SalesGroupID");
        errorObject.push(error);
    }
    else
    {
        if(!wholeNumberPattern.test(reqBody.SalesGroupID))
        {
            let error = new myError(InvalidEntry, "SalesGroupID");
            errorObject.push(error);
        }
    }

    if(!reqBody.Company)
    {
        let error = new myError(MissingEntry, "Company");
        errorObject.push(error);
    }

    if(!reqBody.Position)
    {
        let error = new myError(MissingEntry, "Position");
        errorObject.push(error);
    }

    if(!reqBody.Telephone)
    {
        let error = new myError(MissingEntry, "Telephone");
        errorObject.push(error);
    }
    else
    {
        if(!wholeNumberPattern.test(reqBody.Telephone))
        {
            let error = new myError(InvalidEntry, "Telephone");
            errorObject.push(error);
        }
    }

    if(!reqBody.Mobile)
    {
        let error = new myError(MissingEntry, "Mobile");
        errorObject.push(error);
    }
    else
    {
        if(!wholeNumberPattern.test(reqBody.Mobile))
        {
            let error = new myError(InvalidEntry, "Mobile");
            errorObject.push(error);
        }
    }

    if(!reqBody.Email)
    {
        let error = new myError(MissingEntry, "Email");
        errorObject.push(error);
    }
    else
    {   
        let emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        if(!emailPattern.test(reqBody.Email))
        {
            let error = new myError(InvalidEntry, "Email");
            errorObject.push(error);
        }
    }

    return errorObject;
}

router.post("/addUser", (req, res) =>{

    let reqBody = req.body;

    const errorObject = validateAddUser(reqBody);
    
    if(errorObject.length == 0)
    {
        const { FirstName, LastName, isActive, ChannelID, DesignerID, SalesPersonID, SalesOfficeID, SalesGroupID, Company, Position, Telephone, Mobile, Email } = reqBody;
        db.run( 
            `INSERT INTO Users \
            (FirstName, LastName, isActive, ChannelID, DesignerID, SalesPersonID, SalesOfficeID, SalesGroupID, Company, Position, Telephone, Mobile, Email) \
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [FirstName, LastName, isActive, ChannelID, DesignerID, SalesPersonID, SalesOfficeID, SalesGroupID, Company, Position, Telephone, Mobile, Email],
            (err, result) => {
                if (err) 
                {
                    res.status(400).json({ "error": err.message })
                    return;
                }
                res.status(201).send(reqBody);
            }
        );
    }
    else
    {
        res.status(400).send(errorObject);
    }

})

router.put("/editUser/:id", (req, res) =>{

    let reqBody = req.body;
    let id = req.params.id;

    const errorObject = validateAddUser(reqBody);

    if(errorObject.length == 0)
    {
        const { FirstName, LastName, isActive, ChannelID, DesignerID, SalesPersonID, SalesOfficeID, SalesGroupID, Company, Position, Telephone, Mobile, Email } = reqBody;
        db.run(
            `UPDATE Users \
            SET FirstName = ?, LastName = ?, isActive = ?, ChannelID = ?, DesignerID = ?, SalesPersonID = ?, SalesOfficeID = ?, SalesGroupID = ?, Company = ?, Position = ?, Telephone = ?, Mobile = ?, Email = ? \
            WHERE id = ?`,
            [FirstName, LastName, isActive, ChannelID, DesignerID, SalesPersonID, SalesOfficeID, SalesGroupID, Company, Position, Telephone, Mobile, Email, id],
            (err, result) => {
                if (err) 
                {
                    res.status(400).json({ "error": err.message })
                    return;
                }
                res.status(201).send(reqBody);
            }
        );
    }
    else
    {
        res.status(400).send(errorObject);
    }

})

router.get("/getUsers/", (req, res) =>{    
    db.all(
        "SELECT * FROM Users WHERE isDeleted = 0",
        (err, result) => {
            if (err) 
            {
                res.status(400).json({ "error": err.message })
                return;
            }
            res.status(200).send(result);
        }
    );
})

router.get("/getUser/:id", (req, res) =>{    
    let id = req.params.id
    db.get(
        "SELECT * FROM Users WHERE id = ?", id,
        (err, result) => {
            if (err) 
            {
                res.status(400).json({ "error": err.message })
                return;
            }
            res.status(200).send(result);
        }
    );
})

router.put("/deleteUser/:id", (req, res) =>{
    let id = req.params.id;

    db.run(
        `UPDATE Users \
        SET isDeleted = 1 \
        WHERE id = ?`,
        [id],
        (err, result) => {
            if (err) 
            {
                res.status(400).json({ "error": err.message })
                return;
            }
            res.status(201).send(id);
        }
    );

})

router.put("/undeleteUser/:id", (req, res) =>{
    let id = req.params.id;

    db.run(
        `UPDATE Users \
        SET isDeleted = 0 \
        WHERE id = ?`,
        [id],
        (err, result) => {
            if (err) 
            {
                res.status(400).json({ "error": err.message })
                return;
            }
            res.status(201).send(id);
        }
    );

})

router.put("/activateUser/:id", (req, res) =>{
    let id = req.params.id;

    db.run(
        `UPDATE Users \
        SET isActive = 1 \
        WHERE id = ?`,
        [id],
        (err, result) => {
            if (err) 
            {
                res.status(400).json({ "error": err.message })
                return;
            }
            res.status(201).send(id);
        }
    );

})

router.put("/deactivateUser/:id", (req, res) =>{
    let id = req.params.id;

    db.run(
        `UPDATE Users \
        SET isActive = 0 \
        WHERE id = ?`,
        [id],
        (err, result) => {
            if (err) 
            {
                res.status(400).json({ "error": err.message })
                return;
            }
            res.status(201).send(id);
        }
    );

})

module.exports = router;