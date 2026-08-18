import { styled } from "@linaria/react";
import { FC } from "react";

import heroUrl from "../../.storybook/public/elements-hero.svg?url";
import ReapitLogoInfographic from "../../.storybook/public/reapitLogo.svg?react";

const WelcomeHero = styled.div`
  background-color: #4e56ea;
  width: 100%;
  border-top-left-radius: 1rem;
  border-top-right-radius: 1rem;
  position: relative;
  overflow: hidden;
  min-height: 240px;
`;

const WelcomeHeroContent = styled.div`
  position: relative;
  z-index: 1;
  padding: 3rem 2.5rem;
  max-width: 55%;

  h1 {
    color: #ffffff;
    font-size: 2rem;
    font-weight: 600;
    margin: 0;
    line-height: 1.2;
  }
`;

const WelcomeHeroImage = styled.img`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  width: 50%;
  height: 100%;
  object-fit: contain;
  object-position: right center;
`;

const WelcomeContent = styled.div`
  background-color: var(--colour-fill-white);
  border-bottom-left-radius: 1rem;
  border-bottom-right-radius: 1rem;
  padding: 2rem 2.5rem;

  svg {
    height: 32px;
    width: 160px;
    display: block;
    margin-bottom: 1.5rem;
  }
`;

const WelcomeDescription = styled.p`
  color: var(--colour-text-secondary);
  max-width: 480px;
  margin-bottom: 1.5rem;
`;

const DesignDocsLink = styled.a`
  color: var(--colour-text-primary);
  font-weight: 500;
`;

export const Welcome: FC = () => {
  return (
    <>
      <WelcomeHero>
        <WelcomeHeroContent>
          <h1>Elements UI Component Library</h1>
        </WelcomeHeroContent>
        <WelcomeHeroImage src={heroUrl} alt="" aria-hidden="true" />
      </WelcomeHero>
      <WelcomeContent>
        <ReapitLogoInfographic />
        <WelcomeDescription>
          For design guidelines, usage rules, and component rationale, see the Reapit Design System.
        </WelcomeDescription>
        <DesignDocsLink
          href="https://design.reapit.com.au"
          target="_blank"
          rel="noopener noreferrer"
        >
          Design System documentation →
        </DesignDocsLink>
      </WelcomeContent>
    </>
  );
};
