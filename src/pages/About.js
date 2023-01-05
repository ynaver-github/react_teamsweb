import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';

const HeaderBlock = styled.div`
  font-size: 3rem;
  color: blue;
  ${'' /* position: fixed; */}
  width: 100%;
  background: white;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.08);
  background: white;
`;

const Title = styled.div`
  font-size: 3rem;
  outline: none;
  padding-bottom: 0.5rem;
  border: none;
  border-bottom: 2px solid #22b8cf;
  margin-bottom: 2rem;
  width: 100%;
  background: cyan;
`;

const Menu = styled.div`
  font-size: 1.2rem;
  outline: none;
  padding-bottom: 0.5rem;
  border: none;
  border-bottom: 2px solid #22b8cf;
  margin-bottom: 2rem;
  width: 100%;
  background: rgba(163, 160, 160, 0.9);
`;

const About = () => {
  return (
    <div>
      <HeaderBlock>소개</HeaderBlock>
      <Title>소개 페이지</Title>
      <Menu>
      <div>
        {/* <br></br> */}
        <ul>
          <li>
              <Link to="/home"> ■  홈</Link>
          </li>
          <li>
              <Link to="/news"> ■  뉴스</Link>
          </li>
          <li>
              <Link to="/tools"> ■  툴</Link>
          </li>
          <li>
              <Link to="/webcamera"> ■  Web 카메라 </Link>
          </li>

          <li>
              <Link to="/about"> ■  소개</Link>
          </li>
        </ul>
      </div>
      </Menu>
    </div>
  );
};

export default About;
