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
                expect(res).to.have.status(200);
                expect(res.body.status).to.equals(true);
                expect(res.body.message).to.equals("Success");
                //expect(res.body.should.have.property('status'));
                done();
            });
    });

    it("Gets Customer by id!!", done => {
        const customerId = '5e51fc7283e2914e0ca582de';
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

    it("Update Customer", done => {
        const dummyCustomer = {
            '_id': '5e51fc7283e2914e0ca582de',
            "name": "Mamta sss",
            'gender': 'female',
            'email': 'mamta@gmail.comaasssss',
            'address': 'Baner',
            'city': 'pune',
            'state': 'Maharashtra',
            'country': 'India'
        };
        const customerId = '5e51fc7283e2914e0ca582de';

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

    it("Delete Customer!!", done => {
        const customerId = '5e51fc7283e2914e0ca582de';
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

});

