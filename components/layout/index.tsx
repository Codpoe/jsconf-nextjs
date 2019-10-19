import { Button } from 'zent';
import 'zent/css/index.css';
import './style.css';

export default props => (
  <div className="layout">
    <header className="layout-header">
      <h1 className="layout-title">JSConf</h1>
      <div>
        <Button href="/" bordered={false}>HOME</Button>
        <Button href="/pk" bordered={false}>PK</Button>
        <Button href="/about" bordered={false}>ABOUT</Button>
      </div>
    </header>

    <div className="layout-content">
      {props.children}
    </div>

    <footer className="layout-footer">
        Powered by <a className="layout-footer__link" href="https://github.com/zeit/next.js" >next.js</a> ❤️
      </footer>
  </div>
);
