// this action populates the page with all the releases of the particular label or artist that 
// the user selected from the left hand nav menu. 


import axios from "axios";
import {labelReleases} from "../../API/APIcall";
// import {artistReleases} from "../../API/APIcall";
import {label} from "../../API/APIcall";
//Action creator

export const loadReleases = (id, type) => async (dispatch) => {

  dispatch({
    type: "FETCH_RELEASES",
    payload: {
      loading: true,
    },
  });

  // const dummyLabelCodes = [90336, 157803, 23127, 389319, 153824, 88949];
  // for (let i = 0; i < dummyLabelCodes.length; i++) {
  //   let data = await DataDiviner(label(dummyLabelCodes[i]));
  //   allData.push({
  //     name: data[0].name,
  //     image: data[0].images[0].uri,
  //     profile: data[0].profile,
  //     url: data[0].urls[0],
  //     id: data[0].id,
  //     type: "label",
  //   });
  // }


  const pageNumber = await axios.get(labelReleases(id, 1));

  let allData = [];
  for (let i = 1; i <= pageNumber.data.pagination.pages; i++) {
    let data = await axios.get(labelReleases(id, 1));
    allData.push(data.data.releases);
  }
  let releasesData = [].concat.apply([], allData);

  const labelData = await axios.get(label(id));

  //creates dictionary to store all unique records
  const releasesByTitle = {};
  const releases = [];
  //checks dictionary to see if record by a certain title is already in the dictionary

  //if it is, move on to check the format, else, add it to the dictionary

  //overwrite and replace if the format isnt CD or Vinyl
  //POSSIBLE FORMATS
  // FILE
  // W/LBL
  // PROMO
  // TP
  // PAP
  // CD
  // VINYL
  //FIlter the data up front
  // eslint-disable-next-line
  releasesData.map((release) => {
    if (!release.format.includes("File") && release.thumb) {
      if (!releasesByTitle[release.title]) {
        releasesByTitle[release.title] = release;
      } else {
        if (releasesByTitle[release.title].format.includes("W/Lbl")) {
          releasesByTitle[release.title] = release;
        }
        if (releasesByTitle[release.title].format.includes("Promo")) {
          releasesByTitle[release.title] = release;
        }
        if (releasesByTitle[release.title].format.includes("TP")) {
          releasesByTitle[release.title] = release;
        }
        if (releasesByTitle[release.title].format.includes("Pap")) {
          releasesByTitle[release.title] = release;
        }
      }
    }
  });
  //add the records in dictionary to releases array to pass to reducer
  for (let title in releasesByTitle) {
    releases.push(releasesByTitle[title]);
  }
  dispatch({
    type: "FETCH_RELEASES_SUCCESS",
    payload: {
      all: releases,
      label: labelData.data,
      loading: false,
    },
  });
};
