import styled from 'styled-components'

export const SSiteFooter = styled.footer`
  margin: 1rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #b83f45;
  color: #fff;
  padding: 1rem;
  border-radius: 0 0 0.5rem 0.5rem;

  .footer_logo {
    h1 {
      margin: 0;
      font-size: 2rem;
      font-weight: 200;
    }

    img {
      width: 30px;
      height: auto;
    }
  }

  .footer_copyright {
    font-size: 0.8rem;
    color: #b6c7d6;
    margin-bottom: 2rem;
    p {
      margin: 0rem;
    }
    a {
      font-size: 0.9rem;
      font-weight: bold;
      color: #fff;
      text-decoration: none;
    }
  }

  .footer_social {
    display: flex;
    gap: 4rem;
    margin-bottom: 1rem;
    a {
      color: #fff;
    }
    #githubIcon:hover {
      color: #000;
    }
    #linkedinIcon:hover {
      color: #0768c4;
    }
    #instagramIcon:hover {
      color: #fe2b71;
    }
  }

  .footer_mention {
    color: #fff;
    font-size: 0.8rem;
    p {
      color: #b6c7d6;
      margin: 0;
    }
    a {
      color: #fff;
      text-decoration: none;
    }
  }
`
