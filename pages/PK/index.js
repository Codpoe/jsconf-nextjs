
import React from 'react';
import Link from 'next/link';
import fetch from 'isomorphic-unfetch';

export default class Index extends React.Component {
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
      <div className="index-page">
        <ul className="index-page__repos">
          {repos.map(repo => (
            <a key={repo.name} className="index-page__repo" href={repo.url}>
              <h1 className="index-page__repo-name">{repo.name}</h1>
              {repo.stargazers_count} ⭐
            </a>
          ))}
        </ul>
      </div>
    );
  }
}
