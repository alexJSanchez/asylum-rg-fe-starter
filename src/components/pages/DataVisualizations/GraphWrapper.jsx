import React from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import CitizenshipMapAll from './Graphs/CitizenshipMapAll';
import CitizenshipMapSingleOffice from './Graphs/CitizenshipMapSingleOffice';
import TimeSeriesAll from './Graphs/TimeSeriesAll';
import OfficeHeatMap from './Graphs/OfficeHeatMap';
import TimeSeriesSingleOffice from './Graphs/TimeSeriesSingleOffice';
import YearLimitsSelect from './YearLimitsSelect';
import ViewSelect from './ViewSelect';
import axios from 'axios';
import { resetVisualizationQuery } from '../../../state/actionCreators';
// import test_data from '../../../data/test_data.json';
import { colors } from '../../../styles/data_vis_colors';
import ScrollToTopOnMount from '../../../utils/scrollToTopOnMount';

const { background_color } = colors;

function GraphWrapper(props) {
  const { set_view, dispatch } = props;
  let { office, view } = useParams();
  if (!view) {
    set_view('time-series');
    view = 'time-series';
  }
  let map_to_render;
  if (!office) {
    switch (view) {
      case 'time-series':
        map_to_render = <TimeSeriesAll />;
        break;
      case 'office-heat-map':
        map_to_render = <OfficeHeatMap />;
        break;
      case 'citizenship':
        map_to_render = <CitizenshipMapAll />;
        break;
      default:
        break;
    }
  } else {
    switch (view) {
      case 'time-series':
        map_to_render = <TimeSeriesSingleOffice office={office} />;
        break;
      case 'citizenship':
        map_to_render = <CitizenshipMapSingleOffice office={office} />;
        break;
      default:
        break;
    }
  }
  // designated url paths for our axios request

  function updateStateWithNewData(years, view, office, stateSettingCallback) {
    /*
          _                                                                             _
        |                                                                                 |
        |   Example request for once the `/summary` endpoint is up and running:           |
        |                                                                                 |
        |     `${url}/summary?to=2022&from=2015&office=ZLA`                               |
        |                                                                                 |
        |     so in axios we will say:                                                    |
        |                                                                                 |     
        |       axios.get(`${url}/summary`, {                                             |
        |         params: {                                                               |
        |           from: <year_start>,                                                   |
        |           to: <year_end>,                                                       |
        |           office: <office>,       [ <-- this one is optional! when    ]         |
        |         },                        [ querying by `all offices` there's ]         |
        |       })                          [ no `office` param in the query    ]         |
        |                                                                                 |
          _                                                                             _
                                   -- Mack 
    
    */
    // these url are used in combine with axios all to make a promiseAll style axios request
    const url1 = 'https://hrf-asylum-be-b.herokuapp.com/cases/fiscalSummary';
    const url2 =
      'https://hrf-asylum-be-b.herokuapp.com/cases/citizenshipSummary';
    if (office === 'all' || !office) {
      axios
        .all([axios.get(url1), axios.get(url2)], {
          params: { from: years[0], to: years[1] },
        })
        .then(
          axios.spread((response1, response2) => {
            // Handle the results of both requests here

            const result = {
              granted: response1.data.granted,
              adminClosed: response1.data.adminClosed,
              denied: response1.data.denied,
              closedNacaraGrant: response1.data.closedNacaraGrant,
              asylumTerminated: response1.data.asylumTerminated,
              totalCases: response1.data.totalCases,
              yearResults: response1.data.yearResults,
              citizenshipResults: response2.data,
            };
            stateSettingCallback(view, office, [result]);
          })
        )
        .catch(error => {
          console.error('Error:', error);
        });
    } else {
      axios
        .all([axios.get(url1), axios.get(url2)], {
          params: { from: years[0], to: years[1], office: office },
        })
        .then(
          axios.spread((response1, response2) => {
            // Handle the results of both requests here

            const result = {
              granted: response1.data.granted,
              adminClosed: response1.data.adminClosed,
              denied: response1.data.denied,
              closedNacaraGrant: response1.data.closedNacaraGrant,
              asylumTerminated: response1.data.asylumTerminated,
              totalCases: response1.data.totalCases,
              yearResults: response1.data.yearResults,
              citizenshipResults: response2.data,
            };
            stateSettingCallback(view, office, [result]);
          })
        )
        .catch(error => {
          console.error('Error:', error);
        });
    }
  }
  const clearQuery = (view, office) => {
    dispatch(resetVisualizationQuery(view, office));
  };
  return (
    <div
      className="map-wrapper-container"
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        minHeight: '50px',
        backgroundColor: background_color,
      }}
    >
      <ScrollToTopOnMount />
      {map_to_render}
      <div
        className="user-input-sidebar-container"
        style={{
          width: '300px',
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        <ViewSelect set_view={set_view} />
        <YearLimitsSelect
          view={view}
          office={office}
          clearQuery={clearQuery}
          updateStateWithNewData={updateStateWithNewData}
        />
      </div>
    </div>
  );
}

export default connect()(GraphWrapper);
