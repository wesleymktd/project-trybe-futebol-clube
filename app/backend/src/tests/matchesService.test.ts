import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import { Response } from 'superagent';
import TeamsModel from '../database/models/TeamsModel';
import { mockTeam, mockTeams } from './mocks/teamsMock';
import MatchesModel from '../database/models/MatchesModel';
import { mockMatchEdited, mockMatches, mockMatchesFinish } from './mocks/matchesMock';
import MatchesService from '../service/MatchesService';
import authJwt from '../utils/authJwt';
import TeamsService from '../service/TeamsService';

chai.use(chaiHttp);

const { expect } = chai;

describe('Maches route', () => {
	afterEach(() => {
		sinon.restore();
	}) 
	describe('rota GET: /matches', () => {
		let chaiHttpResponse: Response;
    it('retorna status 200 e array dos jogos', async () => {
			// arrange => dado um contexto
			sinon.stub(MatchesModel, 'findAll').resolves(mockMatches);
			// act => ao executar um código
			chaiHttpResponse = await chai
				.request(app)
				.get('/matches');
			// assert => espero um resultado
			expect(chaiHttpResponse.status).to.be.equal(200)
			expect(chaiHttpResponse.body).to.be.deep.equal(mockMatches)
    })

		it('Filtrando por partidas em andamento retorna status 200 e jogos', async () => {
			// arrange => dado um contexto
			sinon.stub(MatchesModel, 'findAll').resolves(mockMatchesFinish);
			// act => ao executar um código
			chaiHttpResponse = await chai
				.request(app)
				.get('/matches')
        .query({ inProgress: 'true' });
			// assert => espero um resultado
			expect(chaiHttpResponse.status).to.be.equal(200)
			expect(chaiHttpResponse.body).to.be.deep.equal(mockMatchesFinish)
    })

		it('Filtrando por partidas finalizadas retorna status 200 e jogos', async () => {
			// arrange => dado um contexto
			sinon.stub(MatchesModel, 'findAll').resolves(mockMatchesFinish);
			// act => ao executar um código
			chaiHttpResponse = await chai
				.request(app)
				.get('/matches')
        .query({ inProgress: 'false' });
			// assert => espero um resultado
			expect(chaiHttpResponse.status).to.be.equal(200)
			expect(chaiHttpResponse.body).to.be.deep.equal(mockMatchesFinish)
    })
	})

	describe('rota GET: /matches', () => {
		let chaiHttpResponse: Response;
    it('retorna status 200 e array dos jogos', async () => {
			// arrange => dado um contexto
			sinon.stub(MatchesModel, 'findAll').resolves(mockMatches);
			// act => ao executar um código
			chaiHttpResponse = await chai
				.request(app)
				.get('/matches');
			// assert => espero um resultado
			expect(chaiHttpResponse.status).to.be.equal(200)
			expect(chaiHttpResponse.body).to.be.deep.equal(mockMatches)
    })
		describe('rota GET: /matches?inProgress=true ou false', () => {
			it('Filtrando por partidas em andamento retorna status 200 e jogos', async () => {
				// arrange => dado um contexto
				sinon.stub(MatchesModel, 'findAll').resolves(mockMatchesFinish);
				// act => ao executar um código
				chaiHttpResponse = await chai
					.request(app)
					.get('/matches')
					.query({ inProgress: 'true' });
				// assert => espero um resultado
				expect(chaiHttpResponse.status).to.be.equal(200)
				expect(chaiHttpResponse.body).to.be.deep.equal(mockMatchesFinish)
			})

			it('Filtrando por partidas finalizadas retorna status 200 e jogos', async () => {
				// arrange => dado um contexto
				sinon.stub(MatchesModel, 'findAll').resolves(mockMatchesFinish);
				// act => ao executar um código
				chaiHttpResponse = await chai
					.request(app)
					.get('/matches')
					.query({ inProgress: 'false' });
				// assert => espero um resultado
				expect(chaiHttpResponse.status).to.be.equal(200)
				expect(chaiHttpResponse.body).to.be.deep.equal(mockMatchesFinish)
			})
		})

		describe('rota PATCH: matches/id/finish', () => {
			it('caso não seja enviado token deve retornar erro com mensagem', async () => {
				// arrange => dado um contexto
				// act => ao executar um código
				chaiHttpResponse = await chai
					.request(app)
					.patch('/matches/1/finish')
				// assert => espero um resultado
				expect(chaiHttpResponse.status).to.be.equal(401)
				expect(chaiHttpResponse.body).to.be.deep.equal({
					message: "Token not found"
				})
			})

			it('requisições com token inválido deve gerar erro 401', async () => {
				// arrange => dado um contexto
				// act => ao executar um código
				chaiHttpResponse = await chai
					.request(app)
					.patch('/matches/1/finish')
					.set('Authorization', 'token-invalid')
				// assert => espero um resultado
				expect(chaiHttpResponse.status).to.be.equal(401)
				expect(chaiHttpResponse.body).to.be.deep.equal({
					message: "Token must be a valid token"
				})
			})

			it('Dado token válido deve finalizar uma partida e status 200', async () => {
				// arrange => dado um contexto
				sinon.stub(authJwt, 'tokenVerify').returns({
					email: "user-exists@user.com",
					password: "secret_user"
				});
				sinon.stub(MatchesModel, 'update').resolves();
				// act => ao executar um código
				chaiHttpResponse = await chai
					.request(app)
					.patch('/matches/1/finish')
					.set('Authorization', 'token-valid')
				// assert => espero um resultado
				expect(chaiHttpResponse.status).to.be.equal(200)
				expect(chaiHttpResponse.body).to.be.deep.equal({ message: 'finished' })
			})
			// it('Filtrando por partidas finalizadas retorna status 200 e jogos', async () => {
			// 	// arrange => dado um contexto
			// 	sinon.stub(MatchesModel, 'findAll').resolves(mockMatchesFinish);
			// 	// act => ao executar um código
			// 	chaiHttpResponse = await chai
			// 		.request(app)
			// 		.get('/matches')
			// 		.query({ inProgress: 'false' });
			// 	// assert => espero um resultado
			// 	expect(chaiHttpResponse.status).to.be.equal(200)
			// 	expect(chaiHttpResponse.body).to.be.deep.equal(mockMatchesFinish)
			// })
		})

		describe('rota PATCH: matches/id', () => {
			it('caso não seja enviado token deve retornar erro com mensagem', async () => {
				// arrange => dado um contexto
				// act => ao executar um código
				chaiHttpResponse = await chai
					.request(app)
					.patch('/matches/1')
				// assert => espero um resultado
				expect(chaiHttpResponse.status).to.be.equal(401)
				expect(chaiHttpResponse.body).to.be.deep.equal({
					message: "Token not found"
				})
			})

			it('requisições com token inválido deve gerar erro 401', async () => {
				// arrange => dado um contexto
				// act => ao executar um código
				chaiHttpResponse = await chai
					.request(app)
					.patch('/matches/1')
					.set('Authorization', 'token-invalid')
				// assert => espero um resultado
				expect(chaiHttpResponse.status).to.be.equal(401)
				expect(chaiHttpResponse.body).to.be.deep.equal({
					message: "Token must be a valid token"
				})
			})

			it('Dado token válido deve atualizar uma partida e status 200', async () => {
				// arrange => dado um contexto
				sinon.stub(authJwt, 'tokenVerify').returns({
					email: "user-exists@user.com",
					password: "secret_user"
				});
				sinon.stub(MatchesModel, 'update').resolves();
				// act => ao executar um código
				chaiHttpResponse = await chai
					.request(app)
					.patch('/matches/1')
					.set('Authorization', 'token-valid')
				// assert => espero um resultado
				expect(chaiHttpResponse.status).to.be.equal(200)
				expect(chaiHttpResponse.body).to.be.deep.equal({ message: 'match updated' })
			})
		})

		describe('rota POST: matches', () => {
			it('caso não seja enviado token deve retornar erro com mensagem', async () => {
				// arrange => dado um contexto
				// act => ao executar um código
				chaiHttpResponse = await chai
					.request(app)
					.post('/matches')
				// assert => espero um resultado
				expect(chaiHttpResponse.status).to.be.equal(401)
				expect(chaiHttpResponse.body).to.be.deep.equal({
					message: "Token not found"
				})
			})

			it('requisições com token inválido deve gerar erro 401', async () => {
				// arrange => dado um contexto
				// act => ao executar um código
				chaiHttpResponse = await chai
					.request(app)
					.post('/matches')
					.set('Authorization', 'token-invalid')
				// assert => espero um resultado
				expect(chaiHttpResponse.status).to.be.equal(401)
				expect(chaiHttpResponse.body).to.be.deep.equal({
					message: "Token must be a valid token"
				})
			})

			it('Dado token válido deve criar uma nova partida e status 201', async () => {
				// arrange => dado um contexto
				sinon.stub(authJwt, 'tokenVerify').returns({
					email: "user-exists@user.com",
					password: "secret_user"
				});
				sinon.stub(MatchesModel, 'create').resolves(mockMatchEdited) ;
				// act => ao executar um código
				chaiHttpResponse = await chai
					.request(app)
					.post('/matches')
					.set('Authorization', 'token-valid')
					.send({
						homeTeamId: 5,
						awayTeamId: 3,
						homeTeamGoals: 2,
						awayTeamGoals: 2
					})
				// assert => espero um resultado
				expect(chaiHttpResponse.status).to.be.equal(201)
				expect(chaiHttpResponse.body).to.be.deep.equal(mockMatchEdited)
			})

			it('Dado token válido ao tentar cadastrar com times iguais retorna erro 422', async () => {
				// arrange => dado um contexto
				sinon.stub(authJwt, 'tokenVerify').returns({
					email: "user-exists@user.com",
					password: "secret_user"
				});
				sinon.stub(MatchesModel, 'create').resolves(mockMatchEdited) ;
				// act => ao executar um código
				chaiHttpResponse = await chai
					.request(app)
					.post('/matches')
					.set('Authorization', 'token-valid')
					.send({
						homeTeamId: 3,
						awayTeamId: 3,
						homeTeamGoals: 2,
						awayTeamGoals: 2
					})
				// assert => espero um resultado
				expect(chaiHttpResponse.status).to.be.equal(422)
				expect(chaiHttpResponse.body).to.be.deep.equal({message: 'It is not possible to create a match with two equal teams'})
			})

			it('Dado token válido ao tentar cadastrar com times inexistentes no BD retorna erro 404', async () => {
				// arrange => dado um contexto
				sinon.stub(authJwt, 'tokenVerify').returns({
					email: "user-exists@user.com",
					password: "secret_user"
				});
				sinon.stub(TeamsService, 'getById').resolves('Team não encontrado')
				sinon.stub(MatchesModel, 'create').resolves(mockMatchEdited) ;
				// act => ao executar um código
				chaiHttpResponse = await chai
					.request(app)
					.post('/matches')
					.set('Authorization', 'token-valid')
					.send({
						homeTeamId: 3,
						awayTeamId: 2,
						homeTeamGoals: 2,
						awayTeamGoals: 2
					})
				// assert => espero um resultado
				expect(chaiHttpResponse.status).to.be.equal(404)
				expect(chaiHttpResponse.body).to.be.deep.equal({message: 'There is no team with such id!'})
			})
		})
	})

	// describe('rota GET: /teams/:id', () => {
	// 	let chaiHttpResponse: Response;
  //   it('retorna status 200 e array de times', async () => {
	// 		// arrange => dado um contexto
	// 		sinon.stub(TeamsModel, 'findOne').resolves(mockTeam);
	// 		// act => ao executar um código
	// 		chaiHttpResponse = await chai
	// 			.request(app)
	// 			.get('/teams/1');
	// 		// assert => espero um resultado
	// 		expect(chaiHttpResponse.status).to.be.equal(200)
	// 		expect(chaiHttpResponse.body).to.be.deep.equal(mockTeam)
  //   })

	// 	it('Buscar por id inexistente deve retornar status 400 e err', async () => {
	// 		// arrange => dado um contexto
	// 		sinon.stub(TeamsModel, 'findOne').resolves(null);
	// 		// act => ao executar um código
	// 		chaiHttpResponse = await chai
	// 			.request(app)
	// 			.get('/teams/50');
	// 		// assert => espero um resultado
	// 		expect(chaiHttpResponse.status).to.be.equal(400)
	// 		expect(chaiHttpResponse.body).to.be.deep.equal({
	// 			message: "Team não encontrado"
	// 		})
  //   })
	// })

});
