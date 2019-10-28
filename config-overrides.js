/* config-overrides.js */
const rewireDevServer = require('./scripts/config-overrides.dev');
const rewireProdServer = require('./scripts/config-overrides.prod');

module.exports = function (config, env) {

    if(env === 'development'){
        config = rewireDevServer(config,env);
    }else if(env === 'production'){
        config = rewireProdServer(config,env);
    }
    return config
}
  