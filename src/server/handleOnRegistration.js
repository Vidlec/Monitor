import types from '@const/registrationTypes';

export default ({ type, config, rules }) => {
  switch (type) {
    case types.rules: {
      return rules;
    }

    case types.database: {
      return config.database;
    }

    default:
      return {};
  }
};
