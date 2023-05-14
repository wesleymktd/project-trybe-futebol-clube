import * as sinon from 'sinon';
import * as chai from 'chai';
import * as bcrypt from 'bcryptjs'
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import { Response } from 'superagent';
import TeamsModel from '../database/models/TeamsModel';
import { mockTeam, mockTeams } from './mocks/teamsMock';
import UsersModel, { UserAtributes } from '../database/models/UsersModel';
import authJwt from '../utils/authJwt';
import { Model } from 'sequelize';

chai.use(chaiHttp);

const { expect } = chai;

describe('login route', () => {
	afterEach(() => {
		sinon.restore();
	}) 
	describe('rota POST: /login', () => {
		let chaiHttpResponse: Response;
    it('Email incorreto deve retornar status 401 e mensagem de erro', async () => {
			// arrange => dado um contexto
			// act => ao executar um código
			chaiHttpResponse = await chai.request(app)
				.post('/login')
				.send({
					email: "useer.com",
					password: "secret_user"
				});
			// assert => espero um resultado
			expect(chaiHttpResponse.status).to.be.equal(401)
			expect(chaiHttpResponse.body).to.be.deep.equal({
				message: "Invalid email or password"
			})
    })

		it('Senha inválida deve retornar status 401 e mensagem de erro', async () => {
			// arrange => dado um contexto
			// act => ao executar um código
			chaiHttpResponse = await chai.request(app)
				.post('/login')
				.send({
					email: "user@user.com",
					password: "sr"
				});
			// assert => espero um resultado
			expect(chaiHttpResponse.status).to.be.equal(401)
			expect(chaiHttpResponse.body).to.be.deep.equal({
				message: "Invalid email or password"
			})
    })

		it('logar sem campo email deve gerar status 400 e Err', async () => {
			// arrange => dado um contexto
			// act => ao executar um código
			chaiHttpResponse = await chai.request(app)
				.post('/login')
				.send({
					password: "senha super secreta"
				});
			// assert => espero um resultado
			expect(chaiHttpResponse.status).to.be.equal(400)
			expect(chaiHttpResponse.body).to.be.deep.equal({
				message: "All fields must be filled"
			})
    })

		it('logar sem campo password deve gerar status 400 e Err', async () => {
			// arrange => dado um contexto
			// act => ao executar um código
			chaiHttpResponse = await chai.request(app)
				.post('/login')
				.send({
					email: "user@user.com"
				});
			// assert => espero um resultado
			expect(chaiHttpResponse.status).to.be.equal(400)
			expect(chaiHttpResponse.body).to.be.deep.equal({
				message: "All fields must be filled"
			})
    })

		it('Logar com email que não existe no DB deve retornar erro', async () => {
			// arrange => dado um contexto
			sinon.stub(UsersModel, 'findOne').resolves(null);
			// act => ao executar um código
			chaiHttpResponse = await chai.request(app)
				.post('/login')
				.send({
					email: "user@user.com",
					password: "secret_user"
				});
			// assert => espero um resultado
			expect(chaiHttpResponse.status).to.be.equal(401)
			expect(chaiHttpResponse.body).to.be.deep.equal({
				message: "Invalid email or password"
			})
    })

		it('Tentar logar com senha errada no DB deve retornar erro', async () => {
			// arrange => dado um contexto
			sinon.stub(UsersModel, 'findOne').resolves({
				email: "user@user.com",
				password: "secret_user"
			} as UsersModel);
			sinon.stub(bcrypt, 'compareSync').returns(false)
			// act => ao executar um código
			chaiHttpResponse = await chai.request(app)
				.post('/login')
				.send({
					email: "user@user.com",
					password: "secret_user"
				});
			// assert => espero um resultado
			expect(chaiHttpResponse.status).to.be.equal(401)
			expect(chaiHttpResponse.body).to.be.deep.equal({
				message: "Invalid email or password"
			})
    })

		it('ao logar com usuário e senha corretos deve retornar status 200 e token', async () => {
			// arrange => dado um contexto
			sinon.stub(UsersModel, 'findOne').resolves({
				email: "user@user.com",
				password: "secret_user"
			} as UsersModel);
			sinon.stub(bcrypt, 'compareSync').returns(true)
			sinon.stub(authJwt, 'generateToken').returns('tokenJWT')
			// act => ao executar um código
			chaiHttpResponse = await chai.request(app)
				.post('/login')
				.send({
					email: "user@user.com",
					password: "secret_user"
				});
			// assert => espero um resultado
			expect(chaiHttpResponse.status).to.be.equal(200)
			expect(chaiHttpResponse.body).to.be.deep.equal({token: "tokenJWT"})
    })
	})

	describe('rota GET: /login/role', () => {
		let chaiHttpResponse: Response;
    it('Requisições sem o token deve gerar erro 401', async () => {
			// arrange => dado um contexto
			// act => ao executar um código
			chaiHttpResponse = await chai.request(app)
				.get('/login/role')
				
			// assert => espero um resultado
			expect(chaiHttpResponse.status).to.be.equal(401)
			expect(chaiHttpResponse.body).to.be.deep.equal({
				message: "Token not found"
			})
    })

		it('Requisições com token inválido deve gerar erro 401', async () => {
			// arrange => dado um contexto
			// act => ao executar um código
			chaiHttpResponse = await chai.request(app)
				.get('/login/role')
				.set('Authorization', 'token-invalid')
				
			// assert => espero um resultado
			expect(chaiHttpResponse.status).to.be.equal(401)
			expect(chaiHttpResponse.body).to.be.deep.equal({
				message: "Token must be a valid token"
			})
    })

		it('Dado token válido, mas o user não foi localizado no banco deve gerar erro 401', async () => {
			// arrange => dado um contexto
			sinon.stub(authJwt, 'tokenVerify').returns({
				email: "user-non-exists@user.com",
				password: "secret_user"
			});
			sinon.stub(UsersModel, 'findOne').resolves(null);
			// act => ao executar um código
			chaiHttpResponse = await chai.request(app)
				.get('/login/role')
				.set('Authorization', 'token-valid')
				
			// assert => espero um resultado
			expect(chaiHttpResponse.status).to.be.equal(401)
			expect(chaiHttpResponse.body).to.be.deep.equal({
				message: "User not found"
			})
    })

		it('Dado token válido, com user localizado deve retornar a role e status 200', async () => {
			// arrange => dado um contexto
			sinon.stub(authJwt, 'tokenVerify').returns({
				email: "user-exists@user.com",
				password: "secret_user"
			});
			sinon.stub(UsersModel, 'findOne').resolves({
				id: 2,
				username: 'User',
				role: 'user',
				email: 'user@user.com',
				password: 'secret_user',
			} as UsersModel) ;
			// act => ao executar um código
			chaiHttpResponse = await chai.request(app)
				.get('/login/role')
				.set('Authorization', 'token-valid')
				
			// assert => espero um resultado
			expect(chaiHttpResponse.status).to.be.equal(200)
			expect(chaiHttpResponse.body).to.be.deep.equal({
				role: "user"
			})
    })
	})
});
