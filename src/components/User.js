import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

import { getEvents } from "../api/github";
import { getUser } from "../api/github";
import { getRepos } from "../api/github";
import PlusIcon from "../icons/PlusCircle";
import MessageIcon from "../icons/MessageSquare";
import StarIcon from "../icons/Star";
import GitBranchIcon from "../icons/GitBranch";
import BookOpenIcon from "../icons/BookOpen";
import XIcon from "../icons/X";
import Info from "./Info";
import Header from "./Header";

const StyledItem = styled.div`
  border-bottom: 0.03rem solid rgba(191, 191, 191, 0.5);
  padding: 0 1rem;
  margin-bottom: 0.6rem;
  margin-top: 0.6rem;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const StyledText = styled.span`
  color: #5c75f6;
`;

const EventText = styled.p`
  margin-left: 1rem;
`;

const Title = styled.h2`
  font-weight: 500;
  border-bottom: 0.03rem solid rgba(191, 191, 191, 0.5);
  padding: 1rem 1rem;
  margin-bottom: 0.6rem;
  margin-top: 0.6rem;
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
`;

const LatestActivity = styled.div`
  width: 43rem;
  background-color: #fff;
  border: 0.03rem solid rgba(191, 191, 191, 0.5);
`;

function User() {
  const [events, setEvents] = useState([]);
  const [repos, setRepos] = useState([]);
  const [user, setUser] = useState({});
  const username = useParams().username;

  useEffect(() => {
    async function fetchData() {
      const eventsResult = await getEvents(username);
      const reposResult = await getRepos(username);
      const userResult = await getUser(username);
      setEvents(eventsResult.data);
      setUser(userResult.data);
      setRepos(reposResult.data);
    }
    fetchData();
  }, [username]);

  function renderEvents(event) {
    switch (event.type) {
      case "PushEvent":
        return (
          <StyledItem>
            <PlusIcon />
            <EventText>
              Pushed {event.payload.size}
              {event.payload.size === 1 ? " commit to " : " commits to "}
              <StyledText>{event.repo.name}</StyledText>
            </EventText>
          </StyledItem>
        );
      case "CreateEvent": {
        if (event.payload.ref_type === "repository")
          return (
            <StyledItem>
              <PlusIcon />
              <EventText>
                Created a repository <StyledText>{event.repo.name}</StyledText>
              </EventText>
            </StyledItem>
          );
        else if (event.payload.ref_type === "branch")
          return (
            <StyledItem>
              <GitBranchIcon />
              <EventText>
                {" "}
                Created a branch master in{" "}
                <StyledText>{event.repo.name}</StyledText>
              </EventText>
            </StyledItem>
          );
        else if (event.payload.ref_type === "tag")
          return (
            <StyledItem>
              <PlusIcon />
              <EventText>
                Created a tag <StyledText>{event.repo.name}</StyledText>
              </EventText>
            </StyledItem>
          );
        break;
      }
      case "PullRequestEvent": {
        if (event.payload.action === "opened")
          return (
            <StyledItem>
              <BookOpenIcon />
              <EventText>
                Opened a pull request in{" "}
                <StyledText>{event.repo.name}</StyledText>
              </EventText>
            </StyledItem>
          );
        else if (event.payload.action === "closed")
          return (
            <StyledItem>
              <XIcon />
              <EventText>
                Closed a pull request in{" "}
                <StyledText>{event.repo.name}</StyledText>
              </EventText>
            </StyledItem>
          );
        break;
      }
      case "IssueCommentEvent":
        return (
          <StyledItem>
            <MessageIcon />
            <EventText>
              Created a comment on an issue in{" "}
              <StyledText>{event.repo.name}</StyledText>
            </EventText>
          </StyledItem>
        );
      case "WatchEvent":
        return (
          <StyledItem>
            <StarIcon />
            <EventText>
              {" "}
              Starred a repo <StyledText>{event.repo.name}</StyledText>
            </EventText>
          </StyledItem>
        );
      case "ForkEvent":
        return (
          <StyledItem>
            <GitBranchIcon />
            <EventText>
              Forked a repo <StyledText>{event.repo.name}</StyledText> to
              {event.payload.forkee.full_name}
            </EventText>
          </StyledItem>
        );
      case "PullRequestReviewCommentEvent":
        return (
          <StyledItem>
            <MessageIcon />
            <EventText>
              Created a comment on their pull request in{" "}
              <StyledText>{event.repo.name}</StyledText>
            </EventText>
          </StyledItem>
        );
      case "IssuesEvent":
        if (event.payload.action === "opened")
          return (
            <StyledItem>
              <BookOpenIcon />
              <EventText>
                {" "}
                Opened an issue in <StyledText>{event.repo.name}</StyledText>
              </EventText>
            </StyledItem>
          );
        else if (event.payload.action === "closed")
          return (
            <StyledItem>
              <XIcon />
              <EventText>
                Closed an issue in <StyledText>{event.repo.name}</StyledText>
              </EventText>
            </StyledItem>
          );
        break;
      default:
        return null;
    }
  }

  console.log("repos", repos);
  console.log("events", events);
  console.log("user", user);

  return (
    <Container>
      <Info user={user} repos={repos} />
      <LatestActivity>
        <Title>LATEST ACTIVITIES</Title>
        {events ? events.map((event) => renderEvents(event)) : null}
      </LatestActivity>
    </Container>
  );
}

export default User;
