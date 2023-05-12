import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import { Response } from 'superagent';
import TeamsModel from '../database/models/TeamsModel';
import { mockTeams } from './mocks/teamsMock';

chai.use(chaiHttp);

const { expect } = chai;

describe('Teams route', () => {
	afterEach(() => {
		sinon.restore();
	}) 
	describe('rota GET: /teams', () => {
		let chaiHttpResponse: Response;
    it('retorna status 200 e array de times', async () => {
			// arrange => dado um contexto
			sinon.stub(TeamsModel, 'findAll').resolves(mockTeams);
			// act => ao executar um código
			chaiHttpResponse = await chai
				.request(app)
				.get('/teams');
			// assert => espero um resultado
			expect(chaiHttpResponse.status).to.be.equal(200)
			expect(chaiHttpResponse.body).to.be.deep.equal(mockTeams)
    })
	})
 

// 	describe('Dado um banco populado', () => {
//     it('retorna um array populado', async () => {
// 			// arrange => dado um contexto
// 			sinon.stub(TeamsModel, 'findAll').resolves(mockTeams);
// 			// act => ao executar um código
// 			const teams = await TeamsService.getAll();
// 			// assert => espero um resultado
// 			expect(teams).to.be.deep.equal(mockTeams)
//     })
//   })
});
