import React from 'react';
import fetch from 'isomorphic-unfetch';
import Layout from '../../components/layout/index';
import './style.css';

interface Repo {
  name: string;
  html_url: string;
  stargazers_count: number;
}

export interface Props {
  repos: Repo[];
}

export default class Index extends React.Component<Props> {
  static async getInitialProps({ query }) {
    let repos = await fetch('https://api.github.com/users/youzan/repos?page=1&per_page=100').then(data => data.json());
    repos = (repos || []).sort((a, b) => {
      return b.stargazers_count - a.stargazers_count;
    });

    return {
      repos,
    };
  }

  render() {
    const { repos } = this.props;

    return (
      <Layout>
        <div className="index-page">
          <ul className="index-page__repos">
            {repos.map(repo => (
              <a key={repo.name} className="index-page__repo" href={repo.html_url}>
                <h1 className="index-page__repo-name">{repo.name}</h1>
                {repo.stargazers_count} ⭐
              </a>
            ))}
          </ul>
        </div>
      </Layout>
    );
  }
}
