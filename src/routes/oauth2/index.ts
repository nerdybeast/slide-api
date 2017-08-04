const { Router } = require('express');
const jsforce = require('jsforce');
import Debug from '../../classes/Debug';
import serializer from '../../serializer';
import loginUrl from '../../classes/helpers/login-url';
import { Org } from '../../classes/Org';

let debug = new Debug('OAUTH2 ROUTER');
let router = Router();

let oauth2 = null;
let newOrgName = null;

router.get('/auth', (req, res) => {

	newOrgName = req.query.orgname;

	oauth2 = new jsforce.OAuth2({
		loginUrl: loginUrl(req.query.orgtype),
		clientId: process.env.SALESFORCE_CLIENT_ID || '3MVG9zlTNB8o8BA3kitADVHP6UN8BU4CmlP0amzPQekevHlOu2hMRuXl0AVSOdU_NSNaUgxlOXZ80QAV.Uatd',
		clientSecret: process.env.SALESFORCE_CLIENT_SECRET || '4138040508119384338',
		redirectUri: process.env.SALESFORCE_REDIRECT_URI || 'http://localhost:5090/oauth2/callback'
	});

	//Allows access to all data accessible by the logged-in user, and encompasses all other scopes. full does not return a refresh token. You must explicitly request the refresh_token scope to get a refresh token.
	//https://help.salesforce.com/articleView?id=remoteaccess_oauth_scopes.htm&language=en&type=0
	res.redirect(oauth2.getAuthorizationUrl({ scope : 'full' }));
});

router.get('/callback', async (req, res) => {
	
	let newOrgId;

	let authorizeResult = await authorize(req.query.code, oauth2);
	
	let promises = Promise.all([
		authorizeResult.conn.identity(),
		authorizeResult.conn.request('/services/data')
	]);

	promises.then(async results => {

		let userInfo = results[0];
		let org = new Org();
		
		newOrgId = userInfo.organization_id;
		userInfo.name = newOrgName;
		userInfo.type = 'org';
		userInfo.urls.instance = authorizeResult.conn.instanceUrl;
		userInfo.accessToken = authorizeResult.conn.accessToken;
		userInfo.refreshToken = authorizeResult.conn.refreshToken;
		await org.saveNew(userInfo);

		let versions = results[1];
		await org.saveVersions(newOrgId, versions);

		//userInfo = serializer.serialize('org', userInfo);
		//versions = serializer.serialize('version', versions);

		//return res.json({ userInfo, versions });
		return res.send(`
			<script>
				const { ipcRenderer } = require('electron');
				ipcRenderer.send('auth-result', '${newOrgId}');
			</script>
		`);

	});

});

function authorize(authorizationCode, oauth2Options) : Promise<any> {
	return new Promise((resolve, reject) => {

		let conn = new jsforce.Connection({ oauth2 });

		conn.authorize(authorizationCode, function(err, userInfo) {
			
			if(err) { 
				debug.error('authorization error', err);
				return reject(err); 
			}
			
			debug.info('successful authorization result', userInfo);

			return resolve({ conn, userInfo });
		});

	});
}

export default router;