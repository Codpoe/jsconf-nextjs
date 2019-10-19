import Link from 'next/link';
import { Button } from 'zent';
import './style.scss';

export default props => (
  <div className="layout">
    <header className="layout-header">
      <h1 className="layout-title">JSConf</h1>
      <div>
        <Link href="/">HOME</Link>
        <Link href="/pk">PK</Link>
        <Link href="/about">ABOUT</Link>
      </div>
    </header>

    <div className="layout-content">
      {props.children}
    </div>

    <footer className="layout-footer">Powered by <Button href="https://github.com/youzan/zent">youzan/zent</Button></footer>
  </div>
);
