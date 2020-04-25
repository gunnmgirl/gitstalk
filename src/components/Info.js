import React from "react";
import styled from "styled-components";
import { parseISO, formatISO } from "date-fns";

import ArrowUpRight from "../icons/ArrowUpRight";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${(props) => props.theme.backgroundSecondary};
  color: ${(props) => props.theme.secondary};
  margin-right: 1rem;
  border: 0.03rem solid rgba(191, 191, 191, 0.5);
  min-width: 19rem;
`;

const StyledFlexItem = styled.div`
  padding: 1rem 1rem;
  border-bottom: 0.03rem solid rgba(191, 191, 191, 0.5);
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
  color: ${(props) => props.theme.bold};
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
`;

function Info({ user, repos }) {
  function getFormatedDate(dateString) {
    if (dateString) {
      const newDate = dateString.substring(0, dateString.length - 1);
      const parsedDate = parseISO(newDate);
      const date = formatISO(parsedDate, { representation: "date" });
      return date;
    } else return null;
  }

  return (
    <Container>
      <StyledFlexItem>
        <Avatar>
          <AvatarImage src={user.avatar_url} alt="user avatar" />
          <AvatarText>
            <BoldText>
              {user.name}
              <a href={user.html_url}>
                <ArrowUpRight />
              </a>
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
            <BoldText>{user.followers}</BoldText>
          </UserInfoRowItem>
          <UserInfoRowItem>
            <span>Following</span>
            <BoldText>{user.following}</BoldText>
          </UserInfoRowItem>
          <UserInfoRowItem>
            <span>Repos</span>
            <BoldText>{user.public_repos}</BoldText>
          </UserInfoRowItem>
          <UserInfoRowItem>
            <span>Gists</span>
            <BoldText>{user.public_gists}</BoldText>
          </UserInfoRowItem>
        </UserInfo>
      </StyledFlexItem>
      <StyledFlexItem>
        <UserInfo>
          <UserInfoColumnItem>
            <span>Joined</span>
            <BoldText>{getFormatedDate(user.created_at)}</BoldText>
          </UserInfoColumnItem>
          <UserInfoColumnItem>
            <span>Location</span>
            <HighlightedText>{user.location}</HighlightedText>
          </UserInfoColumnItem>
          <UserInfoColumnItem>
            <span>Last Updated on</span>
            <span>{getFormatedDate(user.updated_at)}</span>
          </UserInfoColumnItem>
        </UserInfo>
      </StyledFlexItem>
    </Container>
  );
}

export default Info;
