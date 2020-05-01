import React from "react";
import styled from "styled-components";
import { format } from "date-fns";

import ArrowUpRight from "../icons/ArrowUpRight";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-self: start;
  background-color: ${(props) => props.theme.backgroundPrimary};
  color: ${(props) => props.theme.secondary};
  @media (min-width: 576px) {
    background-color: ${(props) => props.theme.backgroundSecondary};
    border: 0.03rem solid ${(props) => props.theme.border};
    border-bottom: 0;
    max-width: 20rem;
  }
  @media (min-width: 768px) {
    position: sticky;
    top: 0;
  }
`;

const StyledFlexItem = styled.div`
  padding: 1rem 1rem;
  border-bottom: 0.03rem solid ${(props) => props.theme.border};
`;

const AvatarImage = styled.img`
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  margin-right: 0.8rem;
`;

const AvatarText = styled.div`
  display: flex;
  flex-direction: column;
`;

const HighlightedText = styled.span`
  color: ${(props) => props.theme.highlight};
`;

const BoldText = styled.span`
  color: ${(props) => props.theme.enhance};
`;

const Avatar = styled.div`
  display: flex;
  align-items: center;
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const UserInfoRowItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding-bottom: 0.8rem;
`;

const UserInfoColumnItem = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 0.8rem;
`;

const BlogLink = styled.a`
  text-decoration: none;
  color: ${(props) => props.theme.highlight};
`;

function Info({ user, repos }) {
  const languages = [];

  function getFormattedDate(dateString) {
    return format(new Date(dateString), "dd/MM/yyyy");
  }

  function getFormattedNumber(num) {
    if (num) {
      return new Intl.NumberFormat().format(num);
    }
    return null;
  }

  function getLanguages(repos) {
    repos.map((repo) => {
      if (!languages.includes(repo.language) && repo.language) {
        return languages.push(repo.language);
      }
      return null;
    });
  }

  return (
    <Container>
      <StyledFlexItem>
        <Avatar>
          <AvatarImage src={user.avatar_url} alt="user avatar" />
          <AvatarText>
            <BoldText>
              {user.name}
              <BlogLink href={user.html_url}>
                <ArrowUpRight />
              </BlogLink>
            </BoldText>
            <BlogLink href={user.blog}>
              <HighlightedText>{user.blog}</HighlightedText>
            </BlogLink>
          </AvatarText>
        </Avatar>
      </StyledFlexItem>
      <StyledFlexItem>
        <UserInfo>
          <UserInfoRowItem>
            <span>Followers</span>
            <BoldText>{getFormattedNumber(user.followers)}</BoldText>
          </UserInfoRowItem>
          <UserInfoRowItem>
            <span>Following</span>
            <BoldText>{getFormattedNumber(user.following)}</BoldText>
          </UserInfoRowItem>
          <UserInfoRowItem>
            <span>Repos</span>
            <BoldText>{getFormattedNumber(user.public_repos)}</BoldText>
          </UserInfoRowItem>
          <UserInfoRowItem>
            <span>Gists</span>
            <BoldText>{getFormattedNumber(user.public_gists)}</BoldText>
          </UserInfoRowItem>
        </UserInfo>
      </StyledFlexItem>
      <StyledFlexItem>
        {getLanguages(repos)}
        {languages.map((language, index) => (
          <HighlightedText key={index}>{language} </HighlightedText>
        ))}
      </StyledFlexItem>
      <StyledFlexItem>
        <UserInfo>
          <UserInfoColumnItem>
            <span>Joined</span>
            <BoldText>{getFormattedDate(user.created_at)}</BoldText>
          </UserInfoColumnItem>
          <UserInfoColumnItem>
            <span>Location</span>
            <HighlightedText>{user.location}</HighlightedText>
          </UserInfoColumnItem>
          <UserInfoColumnItem>
            <span>Last Updated on</span>
            <span>{getFormattedDate(user.updated_at)}</span>
          </UserInfoColumnItem>
        </UserInfo>
      </StyledFlexItem>
    </Container>
  );
}

export default Info;
