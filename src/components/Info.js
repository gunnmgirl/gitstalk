import React from "react";
import styled from "styled-components";

import ArrowUpRight from "../icons/ArrowUpRight";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #fff;
  margin-right: 1rem;
  border: 0.03rem solid rgba(191, 191, 191, 0.5);
  width: 17rem;
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

const StyledText = styled.span`
  color: #5c75f6;
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
  return (
    <Container>
      <StyledFlexItem>
        <Avatar>
          <AvatarImage src={user.avatar_url} alt="user avatar" />
          <AvatarText>
            <span>
              {user.name}
              <a href={user.html_url}>
                <ArrowUpRight />
              </a>
            </span>
            <BlogLink href={user.blog}>
              <StyledText>{user.blog}</StyledText>
            </BlogLink>
          </AvatarText>
        </Avatar>
      </StyledFlexItem>
      <StyledFlexItem>
        <UserInfo>
          <UserInfoRowItem>
            <span>Followers</span>
            <span>{user.followers}</span>
          </UserInfoRowItem>
          <UserInfoRowItem>
            <span>Following</span>
            <span>{user.following}</span>
          </UserInfoRowItem>
          <UserInfoRowItem>
            <span>Repos</span>
            <span>{user.public_repos}</span>
          </UserInfoRowItem>
          <UserInfoRowItem>
            <span>Gists</span>
            <span>{user.public_gists}</span>
          </UserInfoRowItem>
        </UserInfo>
      </StyledFlexItem>
      <StyledFlexItem>
        <UserInfo>
          <UserInfoColumnItem>
            <span>Joined</span>
            <span>{user.created_at}</span>
          </UserInfoColumnItem>
          <UserInfoColumnItem>
            <span>Location</span>
            <StyledText>{user.location}</StyledText>
          </UserInfoColumnItem>
          <UserInfoColumnItem>
            <span>Last Updated on</span>
            <span>{user.updated_at}</span>
          </UserInfoColumnItem>
        </UserInfo>
      </StyledFlexItem>
    </Container>
  );
}

export default Info;
