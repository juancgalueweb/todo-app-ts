import styled from 'styled-components'
import { device } from '../helpers/devicesMediaqueries'

export const SSiteFooter = styled.footer`
  display: flex;
  flex-direction: column;
  padding-top: 1rem;
  background-color: transparent;
  color: #232323;
  align-items: center;
  text-align: center;

  @media ${device.laptop} {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
  }

  .footer_copyright {
    font-size: 0.8rem;
    color: #b6c7d6;

    p {
      margin: 0rem;
    }
    a {
      font-size: 0.9rem;
      font-weight: bold;
      color: #232323;
      text-decoration: none;
    }

    @media ${device.tablet} {
      display: flex;
      line-height: 1rem;
      gap: 0.2rem;
    }
    @media ${device.laptop} {
      display: inline-block;
    }
  }

  .footer_social {
    display: flex;
    gap: 4rem;
    margin: 0.5rem 0;
    a {
      color: #232323;
    }
    #githubIcon:hover {
      color: #000;
    }
    #linkedinIcon:hover {
      color: #0768c4;
    }
  }

  .footer_mention {
    color: #232323;
    font-size: 0.8rem;
    p {
      color: #b6c7d6;
      margin: 0;
    }
    a {
      color: #232323;
      text-decoration: none;
    }

    @media ${device.tablet} {
      display: flex;
      gap: 0.2rem;
    }
    @media ${device.laptop} {
      display: inline-block;
    }
  }
`
