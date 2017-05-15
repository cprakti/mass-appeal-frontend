import { combineReducers } from 'redux';
import backendAPI from '../api/backendAPI';

const FETCH_PLEDGES_BY_CAMPAIGN_REQUEST = 'FETCH_PLEDGES_BY_CAMPAIGN_REQUEST';
const FETCH_PLEDGES_BY_CAMPAIGN_REQUEST_SUCCESS = 'FETCH_PLEDGES_BY_CAMPAIGN_REQUEST_SUCCESS';
const FETCH_PLEDGES_BY_CAMPAIGN_REQUEST_FAILURE = 'FETCH_PLEDGES_BY_CAMPAIGN_REQUEST_FAILURE';
const FETCH_PLEDGES_BY_USER_REQUEST = 'FETCH_PLEDGES_BY_USER_REQUEST';
const FETCH_PLEDGES_BY_USER_REQUEST_SUCCESS = 'FETCH_PLEDGES_BY_USER_REQUEST_SUCCESS';
const FETCH_PLEDGES_BY_USER_REQUEST_FAILURE = 'FETCH_PLEDGES_BY_USER_REQUEST_FAILURE';
const SAVE_PLEDGE_REQUEST = 'SAVE_PLEDGE_REQUEST';
const SAVE_PLEDGE_REQUEST_SUCCESS = 'SAVE_PLEDGE_REQUEST_SUCCESS';
const SAVE_PLEDGE_REQUEST_FAILURE = 'SAVE_PLEDGE_REQUEST_FAILURE';
const DELETE_PLEDGE_REQUEST = 'DELETE_PLEDGE_REQUEST';
const DELETE_PLEDGE_REQUEST_SUCCESS = 'DELETE_PLEDGE_REQUEST_SUCCESS';
const DELETE_PLEDGE_REQUEST_FAILURE = 'DELETE_PLEDGE_REQUEST_FAILURE';

const fetchPledgesByCampaignRequest = () => ({
  type: FETCH_PLEDGES_BY_CAMPAIGN_REQUEST,
});

const fetchPledgesByCampaignRequestSuccess = () => ({
  type: FETCH_PLEDGES_BY_CAMPAIGN_REQUEST_SUCCESS,
});

const fetchPledgesByCampaignRequestFailure = () => ({
  type: FETCH_PLEDGES_BY_CAMPAIGN_REQUEST_FAILURE,
});

const fetchPledgesByCampaign = () =>
  dispatch => {
    dispatch(fetchPledgesbyCampaignRequest());

    return backendAPI
      .fetchPledgesByCampaign()
      .then(
        data => dispatch(fetchPledgesByCampaignRequestSuccess()),
        error => dispatch(fetchPledgesByCampaignRequestFailure()),
      );
  };

const fetchPledgesByUserRequest = () => ({
  type: FETCH_PLEDGES_BY_USER_REQUEST,
});

const fetchPledgesByUserRequestSuccess = () => ({
  type: FETCH_PLEDGES_BY_USER_REQUEST_SUCCESS,
});

const fetchPledgesByUserRequestFailure = () => ({
  type: FETCH_PLEDGES_BY_USER_REQUEST_FAILURE,
});

const fetchPledgesByUser = () =>
  dispatch => {
    dispatch(fetchPledgesbyUserRequest());

    return backendAPI
      .fetchPledgesByUser()
      .then(
        data => dispatch(fetchPledgesByUserRequestSuccess()),
        error => dispatch(fetchPledgesByUserRequestFailure()),
      );
  };

const savePledgeRequest = () => ({
  type: SAVE_PLEDGE_REQUEST,
});

const savePledgeRequestSuccess = data => ({
  type: SAVE_PLEDGE_REQUEST_SUCCESS,
  data,
});

const savePledgeRequestFailure = () => ({
  type: SAVE_PLEDGE_REQUEST_FAILURE,
});

const savePledge = data =>
  dispatch => {
    dispatch(savePledgeRequest());

    return backendAPI
      .savePledge(data)
      .then(
        data => dispatch(savePledgeRequestSuccess(data)),
        error => dispatch(savePledgeRequestFailure()),
      );
  };

const deletePledgeRequest = () => ({
  type: DELETE_PLEDGE_REQUEST,
});

const deletePledgeRequestSuccess = data => ({
  type: DELETE_PLEDGE_REQUEST_SUCCESS,
  data,
});

const deletePledgeRequestFailure = () => ({
  type: DELETE_PLEDGE_REQUEST_FAILURE,
});

const deletePledge = data =>
  dispatch => {
    dispatch(deletePledgeRequest());

    return backendAPI
      .deletePledge(data)
      .then(
        data => dispatch(deletePledgeRequestSuccess(data)),
        error => dispatch(deletePledgeRequestFailure()),
      );
  };

const initialState = {
  data: {
    requestFailed: false,
    campaignId: '',
    userId: '',
    pledges: [],
    pledge: {},
  },
};

let data = (state = initialState.data, action) => {
  switch (action.type) {
    case FETCH_PLEDGES_BY_CAMPAIGN_REQUEST_SUCCESS:
    case FETCH_PLEDGES_BY_USER_REQUEST_SUCCESS:
      return Object.assign({}, state, {
        pledges: action.data.pledges || [],
        requestFailed: false,
      });

    case SAVE_PLEDGE_REQUEST_SUCCESS:
      return Object.assign({}, state, {
        pledges: [...state.pledges, ...action.data.pledge],
        requestFailed: false,
      });

    case DELETE_PLEDGE_REQUEST_SUCCESS:
      let pledges = state.pledges.filter(
        pledge => pledge.id !== action.pledgeId,
      );
      return Object.assign({}, state, {
        pledges,
        requestFailed: false,
      });

    case FETCH_PLEDGES_BY_CAMPAIGN_REQUEST_FAILURE:
    case FETCH_PLEDGES_BY_USER_REQUEST_FAILURE:
    case SAVE_PLEDGE_REQUEST_FAILURE:
    case DELETE_PLEDGE_REQUEST_FAILURE:
      return Object.assign({}, state, {
        requestFailed: true,
      });
  }
};
