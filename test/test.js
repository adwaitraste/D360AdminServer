let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');

chai.use(chaiHttp);
chai.should();

describe('POST /AddUser', () => {
    
    describe("Successful", () => {
        it("It should add a user to the database and return the user object added", (done) => {

            const newUser = {
                FirstName: "John", 
                LastName: "Doe", 
                isActive: "1", 
                ChannelID: "1", 
                DesignerID: "1", 
                SalesPersonID: "1", 
                SalesOfficeID: "1", 
                SalesGroupID: "1", 
                Company: "Whittan", 
                Position: "Manager", 
                Telephone: "2589999990", 
                Mobile: "3589999990", 
                Email: "johndoe@gmail.com"
            }

            chai.request(server)
                .post("/api/users/addUser")
                .send(newUser)
                .end((err, res) => {
                    res.should.have.status(201);
                    res.body.should.be.a('object');
                    res.body.should.have.property('FirstName').eq("John");
                    res.body.should.have.property('LastName').eq("Doe");
                    res.body.should.have.property('isActive').eq("1");
                    res.body.should.have.property('ChannelID').eq("1");
                    res.body.should.have.property('DesignerID').eq("1");
                    res.body.should.have.property('SalesPersonID').eq("1");
                    res.body.should.have.property('SalesOfficeID').eq("1");
                    res.body.should.have.property('SalesGroupID').eq("1");
                    res.body.should.have.property('Company').eq("Whittan");
                    res.body.should.have.property('Position').eq("Manager");
                    res.body.should.have.property('Telephone').eq("2589999990");
                    res.body.should.have.property('Mobile').eq("3589999990");
                    res.body.should.have.property('Email').eq("johndoe@gmail.com");
                done();
                })
        })
    })

})
