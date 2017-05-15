import { combineReducers } from 'redux';
import backendAPI from '../api/backendAPI';

const FETCH_CAMPAIGN_REQUEST = 'FETCH_CAMPAIGN_REQUEST';
const FETCH_CAMPAIGN_REQUEST_SUCCESS = 'FETCH_CAMPAIGN_REQUEST_SUCCESS';
const FETCH_CAMPAIGN_REQUEST_FAILURE = 'FETCH_CAMPAIGN_REQUEST_FAILURE';
const FETCH_CAMPAIGNS_REQUEST = 'FETCH_CAMPAIGNS_REQUEST';
const FETCH_CAMPAIGNS_REQUEST_SUCCESS = 'FETCH_CAMPAIGNS_REQUEST_SUCCESS';
const FETCH_CAMPAIGNS_REQUEST_FAILURE = 'FETCH_CAMPAIGNS_REQUEST_FAILURE';
const SAVE_CAMPAIGN_REQUEST = 'SAVE_CAMPAIGN_REQUEST';
const SAVE_CAMPAIGN_REQUEST_SUCCESS = 'SAVE_CAMPAIGN_REQUEST_SUCCESS';
const SAVE_CAMPAIGN_REQUEST_FAILURE = 'SAVE_CAMPAIGN_REQUEST_FAILURE';
const DELETE_CAMPAIGN_REQUEST = 'DELETE_CAMPAIGN_REQUEST';
const DELETE_CAMPAIGN_REQUEST_SUCCESS = 'DELETE_CAMPAIGN_REQUEST_SUCCESS';
const DELETE_CAMPAIGN_REQUEST_FAILURE = 'DELETE_CAMPAIGN_REQUEST_FAILURE';

const fetchCampaignRequest = () => ({
  type: FETCH_CAMPAIGN_REQUEST,
});

const fetchCampaignRequestSuccess = () => ({
  type: FETCH_CAMPAIGN_REQUEST_SUCCESS,
});

const fetchCampaignRequestFailure = () => ({
  type: FETCH_CAMPAIGN_REQUEST_FAILURE,
});

const fetchCampaign = () =>
  dispatch => {
    dispatch(fetchCampaignRequest());

    return backendAPI
      .fetchCampaign()
      .then(
        data => dispatch(fetchCampaignRequestSuccess()),
        error => dispatch(fetchCampaignRequestFailure()),
      );
  };

const fetchCampaignsRequest = () => ({
  type: FETCH_CAMPAIGNS_REQUEST,
});

const fetchCampaignsRequestSuccess = () => ({
  type: FETCH_CAMPAIGNS_REQUEST_SUCCESS,
});

const fetchCampaignsRequestFailure = () => ({
  type: FETCH_CAMPAIGNS_REQUEST_FAILURE,
});

const fetchCampaigns = () =>
  dispatch => {
    dispatch(fetchCampaignsRequest());

    return backendAPI
      .fetchCampaigns()
      .then(
        data => dispatch(fetchCampaignsRequestSuccess()),
        error => dispatch(fetchCampaignsRequestFailure()),
      );
  };

const saveCampaignRequest = () => ({
  type: SAVE_CAMPAIGN_REQUEST,
});

const saveCampaignRequestSuccess = data => ({
  type: SAVE_CAMPAIGN_REQUEST_SUCCESS,
  data,
});

const saveCampaignRequestFailure = () => ({
  type: SAVE_CAMPAIGN_REQUEST_FAILURE,
});

const saveCampaign = data =>
  dispatch => {
    dispatch(saveCampaignRequest());

    return backendAPI
      .saveCampaign(data)
      .then(
        data => dispatch(saveCampaignRequestSuccess(data)),
        error => dispatch(saveCampaignRequestFailure()),
      );
  };

const deleteCampaignRequest = () => ({
  type: DELETE_CAMPAIGN_REQUEST,
});

const deleteCampaignRequestSuccess = data => ({
  type: DELETE_CAMPAIGN_REQUEST_SUCCESS,
  data,
});

const deleteCampaignRequestFailure = () => ({
  type: DELETE_CAMPAIGN_REQUEST_FAILURE,
});

const deleteCampaign = data =>
  dispatch => {
    dispatch(deleteCampaignRequest());

    return backendAPI
      .deleteCampaign(data)
      .then(
        data => dispatch(deleteCampaignRequestSuccess(data)),
        error => dispatch(deleteCampaignRequestFailure()),
      );
  };

const initialState = {
  data: {
    requestFailed: false,
    campaigns: [],
    campaign: {},
  },
};

let data = (state = initialState.data, action) => {
  switch (action.type) {
    case FETCH_CAMPAIGNS_REQUEST_SUCCESS:
      return Object.assign({}, state, {
        campaigns: action.data.campaigns || [],
        requestFailed: false,
      });

    case FETCH_CAMPAIGN_REQUEST_SUCCESS:
      return Object.assign({}, state, {
        campaign: action.data.campaign,
        requestFailed: false,
      });

    case SAVE_CAMPAIGN_REQUEST_SUCCESS:
      return Object.assign({}, state, {
        campaigns: [...state.campaigns, ...action.data.campaign],
        requestFailed: false,
      });

    case DELETE_CAMPAIGN_REQUEST_SUCCESS:
      let campaigns = state.campaigns.filter(
        campaign => campaign.id !== action.campaignId,
      );
      return Object.assign({}, state, {
        campaigns,
        requestFailed: false,
      });

    case FETCH_CAMPAIGN_REQUEST_FAILURE:
    case FETCH_CAMPAIGNS_REQUEST_FAILURE:
    case SAVE_CAMPAIGN_REQUEST_FAILURE:
    case DELETE_CAMPAIGN_REQUEST_FAILURE:
      return Object.assign({}, state, {
        requestFailed: true,
      });
  }
};
