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
import { boardHomeMock, boardAwayMock } from './mocks/leaderBoardMock';
import MatchesService from '../service/MatchesService';
import authJwt from '../utils/authJwt';
import TeamsService from '../service/TeamsService';
import LeaderBoardController from '../controller/LeaderBoardController';
import LeaderBoardService from '../service/LeaderBoardService';

chai.use(chaiHttp);

const { expect } = chai;

describe('LeaderBoard route', () => {
	afterEach(() => {
		sinon.restore();
	}) 
	describe('rota GET: /leaderboard/home', () => {
		let chaiHttpResponse: Response;
    it('Retorna status 200 e array do resultado das partidas dos times mandantes', async () => {
			// arrange => dado um contexto
			sinon.stub(TeamsService, 'getAll').resolves(mockTeams);
			sinon.stub(MatchesModel, 'findAll').resolves(mockMatches);
			// act => ao executar um código
			chaiHttpResponse = await chai
				.request(app)
				.get('/leaderboard/home');
			// assert => espero um resultado
			expect(chaiHttpResponse.status).to.be.equal(200)
    })
	})

	describe('rota GET: /leaderboard/away', () => {
		let chaiHttpResponse: Response;
    it('Retorna status 200 e array do resultado das partidas dos times visitantes', async () => {
			// arrange => dado um contexto
			sinon.stub(TeamsService, 'getAll').resolves(mockTeams);
			sinon.stub(MatchesModel, 'findAll').resolves(mockMatches);
			// act => ao executar um código
			chaiHttpResponse = await chai
				.request(app)
				.get('/leaderboard/away');
			// assert => espero um resultado
			expect(chaiHttpResponse.status).to.be.equal(200)
    })

	})

});
