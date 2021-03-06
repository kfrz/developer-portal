import 'jest';

import { ToggleSelectedAPI } from '../actions';
import { DevApplication } from '../types';
import * as constants from '../types/constants';
import { application } from './index';

const app: DevApplication = {
  inputs: {
    apis: {
      appeals: false,
      benefits: false,
      claims: false,
      communityCare: false,
      confirmation: false,
      facilities: false,
      health: false,
      vaForms: false,
      verification: false,
    },
    description: {
      dirty: false,
      value: '',
    },
    email: {
      dirty: false,
      value: '',
    },
    firstName: {
      dirty: false,
      value: '',
    },
    lastName: {
      dirty: false,
      value: '',
    },
    oAuthApplicationType: {
      dirty: false,
      value: '',
    },
    oAuthRedirectURI: {
      dirty: false,
      value: '',
    },
    organization: {
      dirty: false,
      value: '',
    },
    termsOfService: false,
  },
  sending: false,
};

describe('application', () => {
  it('should update application state when inputs are changed', () => {
    const inputToActionMap: any[] = [
      ['description', constants.UPDATE_APPLICATION_DESCRIPTION],
      ['firstName', constants.UPDATE_APPLICATION_FIRST_NAME],
      ['lastName', constants.UPDATE_APPLICATION_LAST_NAME],
      ['email', constants.UPDATE_APPLICATION_EMAIL],
      ['oAuthApplicationType', constants.UPDATE_APPLICATION_OAUTH_APPLICATION_TYPE],
      ['oAuthRedirectURI', constants.UPDATE_APPLICATION_OAUTH_REDIRECT_URI],
      ['organization', constants.UPDATE_APPLICATION_ORGANIZATION],
    ];

    inputToActionMap.forEach(([fieldName, actionName]) => {
      const newValue = {
        dirty: true,
        value: 'test',
      };

      const inputs = application(app, { newValue, type: actionName }).inputs;

      const expectedSubObject = { [fieldName]: newValue };

      expect(inputs).toEqual(expect.objectContaining(expectedSubObject));
    });
  });

  it('should toggle selected APIs', () => {
    const applyApis: string[] = Object.keys(constants.APPLY_FIELDS_TO_URL_FRAGMENTS);
    applyApis.forEach(apiId => {
      const toggleAction: ToggleSelectedAPI = {
        apiId,
        type: constants.TOGGLE_SELECTED_API,
      };

      let newApp = application(app, toggleAction);
      expect(newApp.inputs).toEqual(
        expect.objectContaining({
          apis: expect.objectContaining({
            [apiId]: true,
          }),
        }),
      );

      newApp = application(newApp, toggleAction);
      expect(newApp.inputs).toEqual(
        expect.objectContaining({
          apis: expect.objectContaining({
            [apiId]: false,
          }),
        }),
      );
    });
  });

  it('should not toggle an API that does not exist', () => {
    const newInputs = application(app, {
      apiId: 'fakeapi',
      type: constants.TOGGLE_SELECTED_API,
    }).inputs;

    expect(newInputs).toEqual(app.inputs);
  });

  it('should set state to sending when application send begins', () => {
    expect(application(app, { type: constants.SUBMIT_APPLICATION_BEGIN })).toEqual(
      expect.objectContaining({
        sending: true,
      }),
    );
  });

  it('should set errorStatus application send errors', () => {
    const newApp = application(app, {
      type: constants.SUBMIT_APPLICATION_BEGIN,
    });
    expect(
      application(newApp, {
        status: 'Error happened',
        type: constants.SUBMIT_APPLICATION_ERROR,
      }),
    ).toEqual(
      expect.objectContaining({
        errorStatus: 'Error happened',
        sending: false,
      }),
    );
  });

  it('should set token and OAuth credentials on a successful submit', () => {
    const newApp = application(app, {
      type: constants.SUBMIT_APPLICATION_BEGIN,
    });
    expect(
      application(newApp, {
        clientID: 'clientID',
        clientSecret: 'clientSecret',
        token: 'test-token',
        type: constants.SUBMIT_APPLICATION_SUCCESS,
      }),
    ).toEqual(
      expect.objectContaining({
        result: expect.objectContaining({
          clientID: 'clientID',
          clientSecret: 'clientSecret',
          token: 'test-token',
        }),
        sending: false,
      }),
    );
  });

  it('should toggle termsOfService acceptance', () => {
    const newApp = application(app, { type: constants.TOGGLE_ACCEPT_TOS });
    expect(newApp.inputs).toEqual(
      expect.objectContaining({
        termsOfService: true,
      }),
    );
    expect(application(newApp, { type: constants.TOGGLE_ACCEPT_TOS }).inputs).toEqual(
      expect.objectContaining({
        termsOfService: false,
      }),
    );
  });
});
