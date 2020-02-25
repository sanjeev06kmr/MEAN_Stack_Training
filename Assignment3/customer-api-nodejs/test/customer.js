const app = require("../app");
const chai = require("chai");
const chaiHttp = require("chai-http");

const { expect } = chai;
chai.use(chaiHttp);
describe("Server!", () => {

    it("Gets customer from server!!", done => {
        chai
            .request(app)
            .get("/customer/")
            .end((err, res) => {
                console.log('RES-'+res.body.message);
                expect(res).to.have.status(200);
                expect(res.body.status).to.equals(true);
                expect(res.body.message).to.equals("Success");
                done();
            });
    });

    it("gets array of customer!!", done => {
        chai
            .request(app)
            .get("/customer/")
            .end((err, res) => {
                res.body.should.be.a('object');
                done();
            });
    });

    it("Gets Customer by id!!", done => {
        const customerId = '5e552b2a2a3385548855c1a1';
        chai
            .request(app)
            .get("/customer/" + customerId)
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body.status).to.equals(true);
                expect(res.body.message).to.equals("Success");
                done();
            });
    });

    it("Adds Customer", done => {
        const dummyCustomer = {
            "name": "Mamta sss",
            'gender': 'female',
            'email': 'mamta@gmail.comaasssss',
            'address': 'Baner',
            'city': 'pune',
            'state': 'Maharashtra',
            'country': 'India'
        };

        chai
            .request(app)
            .post("/customer/")
            .send(dummyCustomer)
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body.status).to.equals(true);
                expect(res.body.message).to.equals("Success");
                done();
            });
    });

    it("Update Customer", done => {
        const dummyCustomer = {
            '_id': '5e552b2a2a3385548855c1a1',
            "name": "Mamta sss",
            'gender': 'female',
            'email': 'mamta@gmail.comaasssss',
            'address': 'Baner',
            'city': 'pune',
            'state': 'Maharashtra',
            'country': 'India'
        };
        const customerId = '5e552b2a2a3385548855c1a1';

        chai
            .request(app)
            .put("/customer/" + customerId)
            .send(dummyCustomer)
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body.status).to.equals(true);
                expect(res.body.message).to.equals("Success");
                done();
            });
    });


    it("Delete Customer!!", done => {
        const customerId = '5e51fc7283e2914e0ca582de';
        chai
            .request(app)
            .delete("/customer/" + customerId)
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body.status).to.equals(true);
                expect(res.body.message).to.equals("Success");
                done();
            });
    });

    it("Fails to load customer from server. Incorrect Url!!", done => {
        chai
            .request(app)
            .get("/customer1/")
            .end((err, res) => {
                expect(res).to.have.status(404);
                done();
            });
    });

});

