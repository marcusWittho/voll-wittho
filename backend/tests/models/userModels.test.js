const {
  describe, it, before, after,
} = require('mocha');
const sinon = require('sinon');
const { expect } = require('chai');

const connection = require('../../models/connection');
const userModels = require('../../models/userModels');

describe('(models) Insere um novo usuário ao BD', () => {
  const payloadUser = {
    name: 'Marcus',
    email: 'marcus@gmail.com',
    password: '1234',
    coins: 0,
    admin: false,
  };

  before(async () => {
    const execute = [{
      id: 1,
      name: 'Marcus',
      email: 'marcus@gmail.com',
      password: '1234',
      coins: 0,
      admin: false,
    }];

    sinon.stub(connection, 'execute').resolves(execute);
  });

  after(async () => {
    connection.execute.restore();
  });

  describe('quando é inserido com sucesso', () => {
    it('retorna um objeto', async () => {
      const response = await userModels.addNewUser(payloadUser);

      expect(response).to.be.a('object');
    });

    it('o objeto possui o id do usuário inserido', async () => {
      const response = await userModels.addNewUser(payloadUser);

      expect(response).to.have.property('id');
    });
  });

  describe('quando um usuário é requerido', async () => {
    it('o objeto possui o email do usuário requerido', async () => {
      const response = await userModels.getUserByPassword(payloadUser.email, payloadUser.email);

      expect(response.email).to.equal(payloadUser.email);
    });
  });
});
