const {
  describe, it, before, after,
} = require('mocha');
const { expect } = require('chai');
const sinon = require('sinon');

const userModels = require('../../models/userModels');
const userServices = require('../../services/userServices');

let payloadUser = {
  name: 'Marcus',
  email: 'marcus@gmail.com',
  password: '1234',
  coins: 0,
  admin: false,
};

describe('(services) Insere um novo usuário ao BD', () => {
  describe('quando o payload informado não é válido', () => {
    payloadUser = {};

    it('retorna um boolean', async () => {
      const response = await userServices.addNewUserServices(payloadUser);

      expect(response).to.be.a('boolean');
    });

    it('o boolean contém "false"', async () => {
      const response = await userServices.addNewUserServices(payloadUser);

      expect(response).to.be.equal(false);
    });
  });

  describe('quando é inserido com sucesso', () => {
    before(() => {
      const ID_EXAMPLE = 1;

      sinon.stub(userModels, 'addNewUser')
        .resolves({ id: ID_EXAMPLE });
    });

    after(() => {
      userModels.addNewUser.restore();
    });

    it('retorna um objeto', async () => {
      const payloadService = {
        name: payloadUser.name,
        email: payloadUser.email,
        password: payloadUser.password,
      };

      const response = await userServices.addNewUserServices(payloadService);

      expect(response).to.be.a('object');
    });

    it('o objeto possui o id no usuário inserido', async () => {
      const response = await userServices.addNewUserServices(payloadUser);

      expect(response).to.have.a.property('id');
    });
  });

  describe('quando um usuário é requerido', async () => {
    before(() => {
      const response = {
        id: payloadUser.id,
        name: payloadUser.name,
        email: payloadUser.email,
        coins: payloadUser.coins,
        admin: payloadUser.admin,
      };

      sinon.stub(userModels, 'getUserByPassword')
        .resolves(response);
    });

    after(() => {
      userModels.getUserByPassword.restore();
    });

    it('o objeto possui o email do usuário requerido', async () => {
      const response = await userModels.getUserByPassword(payloadUser.email, payloadUser.email);

      expect(response.email).to.be.equal(payloadUser.email);
    });
  });
});
