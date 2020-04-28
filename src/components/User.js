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
  margin-top: 0.6rem;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const StyledText = styled.a`
  color: ${(props) => props.theme.highlight};
  text-decoration: none;
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
  background-color: ${(props) => props.theme.backgroundPrimary};
  color: ${(props) => props.theme.primary};
  display: grid;
  justify-content: center;
  @media (min-width: 576px) {
    grid-template-columns: auto auto;
    margin: 1rem 1rem;
  }
`;

const LatestActivity = styled.div`
  background-color: ${(props) => props.theme.backgroundSecondary};
  color: ${(props) => props.theme.primary};
  @media (min-width: 576px) {
    border: 0.03rem solid rgba(191, 191, 191, 0.5);
    border-bottom: 0;
    margin-left: 2rem;
  }
`;

function User() {
  const [events, setEvents] = useState(undefined);
  const [repos, setRepos] = useState(undefined);
  const [user, setUser] = useState(undefined);
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
          <StyledItem key={event.id}>
            <PlusIcon />
            <EventText>
              Pushed {event.payload.size}
              {event.payload.size === 1 ? " commit to " : " commits to "}
              <StyledText href={event.repo.url}>{event.repo.name}</StyledText>
            </EventText>
          </StyledItem>
        );
      case "CreateEvent": {
        if (event.payload.ref_type === "repository")
          return (
            <StyledItem key={event.id}>
              <PlusIcon />
              <EventText>
                Created a repository{" "}
                <StyledText href={event.repo.url}>{event.repo.name}</StyledText>
              </EventText>
            </StyledItem>
          );
        else if (event.payload.ref_type === "branch")
          return (
            <StyledItem key={event.id}>
              <GitBranchIcon />
              <EventText>
                Created a branch master in
                <StyledText href={event.repo.url}>{event.repo.name}</StyledText>
              </EventText>
            </StyledItem>
          );
        else if (event.payload.ref_type === "tag")
          return (
            <StyledItem key={event.id}>
              <PlusIcon />
              <EventText>
                Created a tag{" "}
                <StyledText href={event.repo.url}>{event.repo.name}</StyledText>
              </EventText>
            </StyledItem>
          );
        break;
      }
      case "PullRequestEvent": {
        if (event.payload.action === "opened")
          return (
            <StyledItem key={event.id}>
              <BookOpenIcon />
              <EventText>
                Opened a pull request in{" "}
                <StyledText href={event.repo.url}>{event.repo.name}</StyledText>
              </EventText>
            </StyledItem>
          );
        else if (event.payload.action === "closed")
          return (
            <StyledItem key={event.id}>
              <XIcon />
              <EventText>
                Closed a pull request in{" "}
                <StyledText href={event.repo.url}>{event.repo.name}</StyledText>
              </EventText>
            </StyledItem>
          );
        break;
      }
      case "IssueCommentEvent":
        return (
          <StyledItem key={event.id}>
            <MessageIcon />
            <EventText>
              Created a comment on an issue in{" "}
              <StyledText href={event.repo.url}>{event.repo.name}</StyledText>
            </EventText>
          </StyledItem>
        );
      case "WatchEvent":
        return (
          <StyledItem key={event.id}>
            <StarIcon />
            <EventText>
              Starred a repo{" "}
              <StyledText href={event.repo.url}>{event.repo.name}</StyledText>
            </EventText>
          </StyledItem>
        );
      case "ForkEvent":
        return (
          <StyledItem key={event.id}>
            <GitBranchIcon />
            <EventText>
              Forked a repo{" "}
              <StyledText href={event.repo.url}>{event.repo.name}</StyledText>{" "}
              to{" "}
              <StyledText href={event.payload.forkee.html_url}>
                {event.payload.forkee.full_name}
              </StyledText>
            </EventText>
          </StyledItem>
        );
      case "PullRequestReviewCommentEvent":
        return (
          <StyledItem key={event.id}>
            <MessageIcon />
            <EventText>
              Created a comment on their pull request in{" "}
              <StyledText href={event.repo.url}>{event.repo.name}</StyledText>
            </EventText>
          </StyledItem>
        );
      case "IssuesEvent":
        if (event.payload.action === "opened")
          return (
            <StyledItem key={event.id}>
              <BookOpenIcon />
              <EventText>
                Opened an issue in{" "}
                <StyledText href={event.repo.url}>{event.repo.name}</StyledText>
              </EventText>
            </StyledItem>
          );
        else if (event.payload.action === "closed")
          return (
            <StyledItem key={event.id}>
              <XIcon />
              <EventText>
                Closed an issue in{" "}
                <StyledText href={event.repo.url}>{event.repo.name}</StyledText>
              </EventText>
            </StyledItem>
          );
        break;
      default:
        return null;
    }
  }

  return (
    <>
      {user && events && repos ? (
        <Container>
          <Info user={user} repos={repos} />
          <LatestActivity>
            <Title>LATEST ACTIVITIES</Title>
            {events.map((event) => renderEvents(event))}
          </LatestActivity>
        </Container>
      ) : null}
    </>
  );
}

export default User;
