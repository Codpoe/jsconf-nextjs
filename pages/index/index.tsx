import React from 'react';
import fetch from 'isomorphic-unfetch';
import { Button, Pop, InfiniteScroller } from 'zent';
import Layout from '../../components/layout/index';
import './style.css';

interface Repo {
  name: string;
  description: string;
  html_url: string;
  language: string;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
}

export interface Props {
  url: {
    query: Record<string, any>;
  };
  repos: Repo[];
}

const RANGE = ['🥇', '🥈', '🥉'];
const PREVIEW_QRCODES = {
  vant: 'https://camo.githubusercontent.com/ee61c20ae49a9439ab33737336d2457fcdb44698/68747470733a2f2f696d672e797a63646e2e636e2f76616e742f707265766965775f7172636f64655f32303138303532382e706e67',
  'vant-weapp': 'https://camo.githubusercontent.com/8259251e8b3b41536eb90545f0f7f1c366e60909/68747470733a2f2f696d672e797a63646e2e636e2f76616e742d77656170702f7172636f64652d3230313830383130313131342e6a7067',
};
const PAGE_SIZE = 100;

export default class Index extends React.Component<Props> {
  static async getInitialProps({ query }) {
    const user = query.user || 'youzan';
    const url = `https://api.github.com/users/${user}/repos?page=1&per_page=${PAGE_SIZE}`;
    const repos = await fetch(url).then(data => data.json());

    return {
      repos: (repos || []).sort((a, b) => {
        return b.stargazers_count - a.stargazers_count;
      }),
    };
  }

  renderFrontThree(index: number) {
    return RANGE[index] || '';
  }

  renderPreview(name: string) {
    const qrcode = PREVIEW_QRCODES[name];

    if (!qrcode) {
      return null;
    }

    return (
      <Pop
        trigger="click"
        position="right-center"
        content={<img className="index-page__repo-qrcode" src={qrcode} />}
      >
        <Button className="index-page__repo-preview" bordered={false}>preview</Button>
      </Pop>
    );
  }

  render() {
    const { repos } = this.props;

    return (
      <Layout>
        <div className="index-page">
          {repos.map((repo, index) => (
            <div className="index-page__repo" key={repo.name}>
              <div className="index-page__repo-header">
                <a className="index-page__repo-name" href={repo.html_url} target="_blank">
                  {this.renderFrontThree(index)}{repo.name}
                </a>
                {this.renderPreview(repo.name)}
              </div>
              {repo.description && (
                <p className="index-page__repo-desc">{repo.description}</p>
              )}
              <ul className="index-page__repo-footer">
                <li className="index-page__repo-lang">
                  🗣{repo.language}
                </li>
                <li className="index-page__repo-star">
                  ⭐️{repo.stargazers_count}
                </li>
                <li className="index-page__repo-fork">
                  👉{repo.forks_count}
                </li>
              </ul>
            </div>
          ))}
        </div>
      </Layout>
    );
  }
}
