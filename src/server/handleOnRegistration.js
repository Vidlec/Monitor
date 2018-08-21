import types from '@const/registrationTypes';

export default ({ data, config, rules }) => {
  switch (data.type) {
    case types.rules: {
      console.log(data.info, data.type);
      return rules;
    }

    case types.database: {
      console.log(data.info, data.type);
      return config.database;
    }
    case types.gateway: {
      console.log(data.info, data.type);
    }

    default:
      return {};
  }
};
