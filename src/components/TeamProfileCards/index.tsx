/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, {type ReactNode} from 'react';
import Translate from '@docusaurus/Translate';
import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';

function WebsiteLink({to, children}: {to: string; children?: ReactNode}) {
  return (
    <Link to={to}>
      {children ?? (
        <Translate id="team.profile.websiteLinkLabel">website</Translate>
      )}
    </Link>
  );
}

type ProfileProps = {
  className?: string;
  name: string;
  children: ReactNode;
  githubUrl: string;
  xUrl?: string;
};

function TeamProfileCard({
  className,
  name,
  children,
  githubUrl,
  xUrl,
}: ProfileProps) {
  return (
    <div className={className}>
      <div className="card card--full-height">
        <div className="card__header">
          <div className="avatar avatar--vertical">
            <img
              className="avatar__photo avatar__photo--xl"
              src={`${githubUrl}.png`}
              alt={`${name}'s avatar`}
            />
            <div className="avatar__intro">
              <Heading as="h3" className="avatar__name">
                {name}
              </Heading>
            </div>
          </div>
        </div>
        <div className="card__body">{children}</div>
        <div className="card__footer">
          <div className="button-group button-group--block">
            {githubUrl && (
              <Link className="button button--secondary" href={githubUrl}>
                GitHub
              </Link>
            )}
            {xUrl && (
              <Link className="button button--secondary" href={xUrl}>
                X
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function TeamProfileCardCol(props: ProfileProps) {
  return (
    <TeamProfileCard {...props} className="col col--6 margin-bottom--lg" />
  );
}

/* Core Team:  */
export function CoreTeamRow(): JSX.Element {
  return (
    <div className="row">
      <TeamProfileCardCol name="Abhishek Jha" githubUrl="https://github.com/abhishekj720">👋🏻Abhishek Jha is a Software Developer for Cadence Workflows at Uber, specializing in developing robust distributed systems. He is passionate about leveraging emerging technologies, particularly Applied AI, to enhance system reliability and scalability. Outside of work, Abhishek enjoys hiking, singing/guitar, and playing various sports. He is always eager to discuss the future of technology, investments, and other intriguing topics. 🧑🏻‍💻🥾🎾🎶</TeamProfileCardCol>
      <TeamProfileCardCol name="Adhitya Mamallan" githubUrl="https://github.com/adhityamamallan">⚙️</TeamProfileCardCol>
      <TeamProfileCardCol name="Andre Oliveira" githubUrl="https://github.com/uandreo">🌴</TeamProfileCardCol>
      <TeamProfileCardCol name="Assem Hafez" githubUrl="https://github.com/Assem-Uber">🌴</TeamProfileCardCol>
      <TeamProfileCardCol name="Bowen Xiao" githubUrl="https://github.com/bowenxia">⚙️</TeamProfileCardCol>
      <TeamProfileCardCol name="chopincode" githubUrl="https://github.com/chopincode">⚙️</TeamProfileCardCol>
      <TeamProfileCardCol name="David Porter" githubUrl="https://github.com/davidporter-id-au">🔬</TeamProfileCardCol>
      <TeamProfileCardCol name="Ender Demirkaya" githubUrl="https://github.com/demirkayaender">⚙️</TeamProfileCardCol>
      <TeamProfileCardCol name="Felipe Imanishi" githubUrl="https://github.com/fimanishi">🔬</TeamProfileCardCol>
      <TeamProfileCardCol name="Gaziza Yestemirova" githubUrl="https://github.com/gazi-yestemirova">⚙️</TeamProfileCardCol>
      <TeamProfileCardCol name="Ilya Ozherelyev" githubUrl="https://github.com/3vilhamster">⚙️</TeamProfileCardCol>
      <TeamProfileCardCol name="Jakob Haahr Taankvist" githubUrl="https://github.com/jakobht">🌴</TeamProfileCardCol>
      <TeamProfileCardCol name="Jonathan Baker" githubUrl="https://github.com/jonathanbaker7">🔬</TeamProfileCardCol>
      <TeamProfileCardCol name="Josué Alexander Ibarra" githubUrl="https://github.com/ibarrajo">Josue Ibarra is a Developer Advocate for Cadence Workflows at Uber, based in Seattle. Passionate about building better systems with Cadence, he balances his love for coding with hobbies like motorcycles, sailing, and cooking. 🚀🍳🏍️</TeamProfileCardCol>
      <TeamProfileCardCol name="Ketsia Mbaku" githubUrl="https://github.com/ketsiambaku">🌴</TeamProfileCardCol>
      <TeamProfileCardCol name="Kisel Jan" githubUrl="https://github.com/dkrotx">⚙️</TeamProfileCardCol>
      <TeamProfileCardCol name="Nate Mortensen" githubUrl="https://github.com/natemort">Nate originally got into programming by modding Minecraft and has been contributing to open source software ever since. When he's not working on Cadence he's on a mission to try every pizza in Seattle.</TeamProfileCardCol>
      <TeamProfileCardCol name="Neil Xie" githubUrl="https://github.com/neil-xie">⚙️</TeamProfileCardCol>
      <TeamProfileCardCol name="Sankari Gopalakrishnan" githubUrl="https://github.com/sankari165">🌴</TeamProfileCardCol>
      <TeamProfileCardCol name="Shaddoll" githubUrl="https://github.com/Shaddoll">⚙️</TeamProfileCardCol>
      <TeamProfileCardCol name="Shijie Sheng" githubUrl="https://github.com/shijiesheng">🔬</TeamProfileCardCol>
      <TeamProfileCardCol name="Steven L" githubUrl="https://github.com/Groxx">⚙️</TeamProfileCardCol>
      <TeamProfileCardCol name="Taylan Isikdemir" githubUrl="https://github.com/taylanisikdemir">Taylan majored in CS and his software engineering journey includes working at Microsoft Azure, Google Cloud, and helping build an observability startup from ground up. Taylan is tech lead of Cadence team at Uber, based in Seattle. When he is not working, you'll probably find him playing basketball or kickboxing.</TeamProfileCardCol>
      <TeamProfileCardCol name="Tim Li" githubUrl="https://github.com/timl3136">🌴</TeamProfileCardCol>
      <TeamProfileCardCol name="tubignat" githubUrl="https://github.com/tubignat">⚙️</TeamProfileCardCol>
      <TeamProfileCardCol name="Vinay Kumar Yadav" githubUrl="https://github.com/vinay116">⚙️</TeamProfileCardCol>
      <TeamProfileCardCol name="Vsevolod Kaloshin" githubUrl="https://github.com/arzonus">🔬</TeamProfileCardCol>
    </div>
  );
}

/* HonoraryContributors */
export function HonoraryContributorsRow(): JSX.Element {
  return (
    <div className="row">
    </div>
  );
}
