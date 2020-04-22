import axios from "axios";

async function getUser(username) {
  try {
    const response = await instance.get(`/users/${username}`);
    return response;
  } catch (error) {
    console.error(error);
  }
}

async function getEvents(username) {
  try {
    const response = await instance.get(`/users/${username}/events`);
    return response;
  } catch (error) {
    console.error(error);
  }
}

async function getRepos(username) {
  try {
    const response = await instance.get(`/users/${username}/repos`);
    return response;
  } catch (error) {
    console.error(error);
  }
}

const instance = axios.create({
  baseURL: "https://api.github.com",
  headers: {
    Authorization: process.env.REACT_APP_GITSTALK,
  },
});

export default getEvents;
