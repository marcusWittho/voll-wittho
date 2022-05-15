const {
  describe, it, before, after,
} = require('mocha');
const sinon = require('sinon');
const { expect } = require('chai');

const userServices = require('../../services/userServices');
const userController = require('../../controllers/userController');

describe('(controller) Ao chamar do controller a função addNewUserController', () => {
  const userObj = {
    name: 'Marcus',
    email: 'marcus@gmail.com',
    password: '1234',
    coins: 0,
    admin: false,
  };

  describe('quando o payload informado não é válido', () => {
    const response = {};
    const request = {};

    before(() => {
      request.body = {};

      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns({ message: 'Dados inválidos' });

      sinon.stub(userServices, 'addNewUserServices').resolves(false);
    });

    after(() => {
      userServices.addNewUserServices.restore();
    });

    it('é chamado o status com o código 400', async () => {
      await userController.addNewUserController(request, response);

      expect(response.status.calledWith(400)).to.be.equal(true);
    });

    it('é chamado o send com a mensagem "Dados inválidos"', async () => {
      await userController.addNewUserController(request, response);

      expect(response.json.calledWith({ message: 'Dados inválidos' })).to.be.equal(true);
    });
  });

  describe('quando é inserido com sucesso', () => {
    const request = {};
    const response = {};

    before(() => {
      request.body = userObj;

      response.status = sinon.stub().returns(response);
      response.send = sinon.stub().returns();

      sinon.stub(userServices, 'addNewUserServices').resolves(true);
    });

    after(() => {
      userServices.addNewUserServices.restore();
    });

    it('é chamado o status com o código 201', async () => {
      await userController.addNewUserController(request, response);

      expect(response.status.calledWith(201)).to.be.equal(true);
    });

    it('é chamado o send com a mensagem "Usuário criado com sucesso"', async () => {
      await userController.addNewUserController(request, response);

      expect(response.send.calledWith('Usuário criado com sucesso'));
    });
  });

  describe('quando um usuário é requerido', () => {
    const request = {};
    const response = {};

    before(() => {
      request.body = { email: userObj.email, password: userObj.password };
      response.json = {
        id: userObj.id,
        name: userObj.name,
        email: userObj.email,
        coins: userObj.coins,
        admin: userObj.admin,
      };

      response.status = sinon.stub().returns(response);
      response.send = sinon.stub().returns(response.json);

      sinon.stub(userServices, 'getUserByPasswordServices').resolves(true);
    });

    after(() => {
      userServices.getUserByPasswordServices.restore();
    });

    it('o objeto possui o email do usuário requerido', async () => {
      await userServices.getUserByPasswordServices(request, response);

      expect(response.json.email).to.be.equal(request.body.email);
    });
  });

  describe('quando o usuário requerido não é econtrado', () => {
    const request = {};
    const response = {};

    before(() => {
      request.body = { email: userObj.email, password: userObj.password };
      response.json = { message: 'Usuário não encontrado' };

      response.status = sinon.stub().returns(response);
      response.send = sinon.stub().returns(response.json);

      sinon.stub(userServices, 'getUserByPasswordServices').resolves(false);
    });

    after(() => {
      userServices.getUserByPasswordServices.restore();
    });

    it('o objeto possui a mensagem "Usuário não encontrado"', async () => {
      await userServices.getUserByPasswordServices(request, response);

      expect(response.json.message).to.be.equal('Usuário não encontrado');
    });
  });
});
