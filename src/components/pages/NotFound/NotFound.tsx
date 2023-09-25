import styles from './NotFound.module.scss';

const NotFound: React.FC = () => {
  return (
    <div className="content">
      <div className="container">
        <div className={styles.root}>
          <h1>Oops!</h1>
          <p>Sorry, an unexpected error has occurred.</p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
