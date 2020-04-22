import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import getEvents from "../api/github";

function User() {
  const [events, setEvents] = useState([]);
  const username = useParams().username;

  useEffect(() => {
    async function fetchData() {
      const result = await getEvents(username);
      setEvents(result.data);
    }
    fetchData();
  }, [username]);

  function renderEvents(event) {
    switch (event.type) {
      case "PushEvent":
        return (
          <p>
            Pushed {event.payload.size}
            {event.payload.size === 1 ? " commit to " : " commits to "}
            {event.repo.name}
          </p>
        );
      case "CreateEvent": {
        if (event.payload.ref_type === "repository")
          return <p>Created a repository {event.repo.name}</p>;
        else if (event.payload.ref_type === "branch")
          return <p> Created a branch master in {event.repo.name}</p>;
        else if (event.payload.ref_type === "tag")
          return <p>Created a tag {event.repo.name}</p>;
        break;
      }
      case "PullRequestEvent": {
        if (event.payload.action === "opened")
          return <p>Opened a pull request in {event.repo.name}</p>;
        else if (event.payload.action === "closed")
          return <p>Closed a pull request in {event.repo.name}</p>;
        break;
      }
      case "IssueCommentEvent":
        return <p>Created a comment on an issue in {event.repo.name}</p>;
      case "ReleaseEvent":
        return <p>Published a release</p>;
      case "WatchEvent":
        return <p> Starred a repo {event.repo.name}</p>;
      case "ForkEvent":
        return (
          <p>
            Forked a repo {event.repo.name} to
            {event.payload.forkee.full_name}
          </p>
        );
      case "PullRequestReviewCommentEvent":
        return (
          <p>Created a comment on their pull request in {event.repo.name}</p>
        );
      case "IssuesEvent":
        if (event.payload.action === "opened")
          return <p> Opened an issue in {event.repo.name}</p>;
        else if (event.payload.action === "closed")
          return <p>Closed an issue in {event.repo.name}</p>;
        break;
      default:
        return null;
    }
  }

  return (
    <div>{events ? events.map((event) => renderEvents(event)) : null}</div>
  );
}

export default User;
